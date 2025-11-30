// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom/extend-expect";
// fetch polyfill for node environment
import "whatwg-fetch";
// start MSW server for tests
import { server } from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
// Reset any request handlers that are declared as a part of our tests
// (so they don't affect other tests).
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
