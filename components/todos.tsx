"use client";

import { trpc } from "@/trpc/react";
import Todo from "./todo";

export default function Todos() {
  const [todos] = trpc.todos.getTodos.useSuspenseQuery();

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          done={todo.done ?? false}
          id={todo.id}
        />
      ))}
    </div>
  );
}
