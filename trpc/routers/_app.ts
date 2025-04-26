import { createTRPCRouter } from "../init";
import { todosRouter } from "./todos";

export const appRouter = createTRPCRouter({
  todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
