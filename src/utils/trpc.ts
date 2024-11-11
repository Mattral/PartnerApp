import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * 1. CONTEXT (Mocked)
 * We are going to mock the context and replace the actual session logic and database logic.
 */

// Mocked session object
const mockSession = {
  user: {
    id: "mock-user-id",
    name: "Mock User",
    role: "doctor", // Could be "doctor", "patient", etc.
  },
  expires: "mock-expiry",
};

// Mocked DB object (just a placeholder, replace with real DB if needed)
const mockDb = {
  user: {
    findUnique: async ({ where }: { where: { id: string } }) => {
      return { id: where.id, name: "Mock User", role: "doctor" }; // Simulated mock data
    },
    findMany: async ({ where }: { where: any }) => {
      return [
        { id: "1", name: "Doctor A", role: "doctor" },
        { id: "2", name: "Patient B", role: "patient" },
      ]; // Mock multiple users
    },
  },
  // Add more mock DB calls here as necessary
};

// Mocked context creation function
const createInnerTRPCContext = (opts: { session: any }) => {
  return {
    session: opts.session,
    db: mockDb, // Mocked DB connection
  };
};

// Mocked context function (no actual session management)
export const createTRPCContext = async () => {
  return createInnerTRPCContext({
    session: mockSession, // Returning the mocked session
  });
};

/**
 * 2. INITIALIZATION (Mocked)
 *
 * We initialize tRPC with a transformer and error handling.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (The Important Bit)
 *
 * These are the pieces you use to build your tRPC API.
 */

// Mocked createTRPCRouter
export const createTRPCRouter = t.router;

// Mocked publicProcedure (no authentication)
export const publicProcedure = t.procedure;

// Mocked protectedProcedure (dummy logic, always assumes user is authenticated)
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }, // Mock user session
    },
  });
});

// Mocked doctorProcedure (always returns success if role is 'doctor')
export const doctorProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (ctx.session.user.role !== "doctor") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
