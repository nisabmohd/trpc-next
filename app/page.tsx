export const dynamic = "force-dynamic";

import { HydrateClient, trpc } from "@/trpc/server";
import AddTodos from "../components/add-todos";
import Todos from "../components/todos";
import { Suspense } from "react";

export default async function Home() {
  void trpc.todos.getTodos.prefetch();
  return (
    <HydrateClient>
      <div className="max-w-[500px] mx-auto py-8 flex flex-col gap-4">
        <AddTodos />
        <Suspense fallback="loading...">
          <Todos />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
