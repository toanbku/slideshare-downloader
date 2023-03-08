import { createTRPCRouter } from "~/server/api/trpc";
import { slideShareRouter } from "~/server/api/routers/slideShare";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  slideShare: slideShareRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
