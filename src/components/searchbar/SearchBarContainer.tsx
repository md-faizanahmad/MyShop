// src/components/search/SearchBarContainer.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductSearchResult } from "../../types/search";
import { useSearch } from "../../hooks/useSearch";
import SearchBarView from "./SearchBarView";

interface Props {
  onClose: () => void;
  openerRef?: React.RefObject<HTMLElement | null>;
}

export default function SearchBarContainer({ onClose, openerRef }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL ?? "";
  const { query, setQuery, results, loading, error, clear, abortCurrent } =
    useSearch({ apiUrl, debounceMs: 320, maxResults: 8 });

  const navigate = useNavigate();
  const localOpenerRef = useRef<HTMLElement | null>(null);

  const handleSubmit = (q?: string) => {
    const finalQ = (q ?? query).trim();
    if (!finalQ) return;
    navigate(`/search?q=${encodeURIComponent(finalQ)}`);
    onClose();
  };

  const handleSelect = (item: ProductSearchResult) => {
    const categorySlug = item.category?.slug;
    const productSlug = item.slug;

    if (!categorySlug || !productSlug) {
      console.error("Search result missing slugs:", item);
      return; // fail loudly → fix API
    }

    navigate(`/category/${categorySlug}/product/${productSlug}`);
    onClose();
  };

  return (
    <SearchBarView
      query={query}
      setQuery={setQuery}
      results={results}
      loading={loading}
      error={error}
      onClear={() => {
        clear();
      }}
      onSubmit={() => handleSubmit()}
      onSelect={(item: ProductSearchResult) => handleSelect(item)}
      onClose={() => {
        abortCurrent();
        onClose();
      }}
      openerRef={openerRef ?? localOpenerRef}
    />
  );
}
