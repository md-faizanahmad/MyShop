// src/hooks/useSearch.ts
import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import type { ProductSearchResult } from "../types/search";

export interface UseSearchOptions {
  apiUrl: string;
  debounceMs?: number;
  maxResults?: number;
}

export interface UseSearchReturn {
  query: string;
  setQuery: (v: string) => void;
  results: ProductSearchResult[];
  loading: boolean;
  error: string | null;
  clear: () => void;
  abortCurrent: () => void;
}

export function useSearch({
  apiUrl,
  debounceMs = 320,
  maxResults = 8,
}: UseSearchOptions): UseSearchReturn {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, ProductSearchResult[]>>(new Map());
  const reqIdRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const abortCurrent = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  const clear = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
    abortCurrent();
  }, [abortCurrent]);

  const doFetch = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) {
        setResults([]);
        setError(null);
        setLoading(false);
        return;
      }

      // cache hit
      const cached = cacheRef.current.get(trimmed);
      if (cached) {
        setResults(cached.slice(0, maxResults));
        setError(null);
        setLoading(false);
        return;
      }

      // cancel previous & new controller
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      const thisReqId = ++reqIdRef.current;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<{ products: ProductSearchResult[] }>(
          `${apiUrl}/v1/products`,
          {
            params: { q: trimmed, limit: maxResults },
            signal: controllerRef.current.signal,
          }
        );

        // stale response guard
        if (thisReqId !== reqIdRef.current) return;

        const products = response.data.products ?? [];
        cacheRef.current.set(trimmed, products);
        setResults(products.slice(0, maxResults));
      } catch (err) {
        const axiosErr = err as AxiosError;
        if (
          axiosErr?.name === "CanceledError" ||
          axiosErr?.name === "AbortError"
        ) {
          // aborted -> silent
        } else {
          setError("Search failed. Try again.");
          setResults([]);
        }
      } finally {
        if (thisReqId === reqIdRef.current) setLoading(false);
      }
    },
    [apiUrl, maxResults]
  );

  useEffect(() => {
    // clear any previous timer
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!query.trim()) {
      // cancel inflight and clear
      abortCurrent();
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    timerRef.current = window.setTimeout(() => {
      void doFetch(query);
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [query, debounceMs, doFetch, abortCurrent]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clear,
    abortCurrent,
  };
}
