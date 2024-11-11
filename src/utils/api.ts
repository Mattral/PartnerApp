// src/utils/api.ts (mocked version for testing)
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

// Mocked `AppRouter` type and procedures
import { AppRouter } from "./root";

// Mock implementation of `createTRPCNext` for testing purposes
const createMockedTRPCNext = () => {
  return {
    // Properly mock the config() function to match expected structure
    config() {
      return {
        transformer: superjson,
        links: [
          {
            // Mock the fetch function to return a mocked response
            async fetch(input: Request) {
              console.log("Mocked API Request:", input);
              return {
                json: async () => {
                  return { data: "mocked response" };
                },
              };
            },
          },
        ],
      };
    },
    ssr: false, // SSR is set to false for the mocked version
  };
};

// Now create the `api` using the mocked version
export const api = createMockedTRPCNext();


/**
 * Mocked Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Mocked Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
