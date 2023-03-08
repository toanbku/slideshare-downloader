import { createTRPCRouter } from "~/server/api/trpc";
import { embeddedRouter } from "~/server/api/routers/embedded";
import { basicRouter } from "~/server/api/routers/basic";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  embedded: embeddedRouter,
  basic: basicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
