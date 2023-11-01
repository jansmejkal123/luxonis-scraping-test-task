import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";

export const catRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input, ctx }) => {
      return {
        greeting: `Hello ${input.text}`,
          cat: await ctx.db.cat.findFirst({
              orderBy: { id: "desc" },
          })
      };
    }),

});
