import { db } from "@/drizzle/client";
import { baseProcedure, createTRPCRouter } from "../init";
import { todosTable } from "@/drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const todoCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const todoEditSchema = z.object({
  id: z.number(),
  data: z.object({
    done: z.boolean(),
  }),
});

export const todosRouter = createTRPCRouter({
  getTodos: baseProcedure.query(async () => {
    return await db.select().from(todosTable).orderBy(todosTable.id);
  }),
  createTodo: baseProcedure
    .input(todoCreateSchema)
    .mutation(async ({ input }) => {
      return await db.insert(todosTable).values(input).returning();
    }),
  editTodo: baseProcedure.input(todoEditSchema).mutation(async ({ input }) => {
    const [todo] = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, input.id));
    if (!todo)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Todo not found",
      });

    return await db
      .update(todosTable)
      .set(input.data)
      .where(eq(todosTable.id, input.id))
      .returning();
  }),
  deleteTodo: baseProcedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(todosTable).where(eq(todosTable.id, input));
  }),
});
