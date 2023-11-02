import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {type Prisma} from ".prisma/client";

export const catRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({
        perPage: z.number(),
        page: z.number()
    }))
    .query(async ({ input, ctx }) => {
        const query : Prisma.CatFindManyArgs = {
            take: input.perPage,
            skip: input.page * input.perPage,
            orderBy: {id: 'desc'}
        }
        const [cats, count] = await ctx.db.$transaction([
            ctx.db.cat.findMany({...query}),
            ctx.db.cat.count()
        ])
      return {
        cats,
        pagination: {
            totalCount: count
        }
      };
    }),

});
