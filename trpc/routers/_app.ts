import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { delay } from "@/lib/util";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      await delay(2000);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
