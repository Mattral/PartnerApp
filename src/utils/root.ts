import { createTRPCRouter } from "./trpc";
import { sessionRouter } from "./sessions";
import { userRouter } from "./user";
import { S3Router } from "./S3";
import { zoomRouter } from "./zoom";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  room: sessionRouter,
  S3: S3Router,
  zoom: zoomRouter,
});

export type AppRouter = typeof appRouter;
