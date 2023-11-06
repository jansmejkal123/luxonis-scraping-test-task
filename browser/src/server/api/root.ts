import {catRouter} from "~/server/api/routers/cat";
import {createTRPCRouter} from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cat: catRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
