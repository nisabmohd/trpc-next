import { trpc } from "@/trpc/server";
import AddTodos from "../components/add-todos";
import Todos from "../components/todos";

export default async function Home() {
  void trpc.todos.getTodos.prefetch();
  return (
    <div className="max-w-[500px] mx-auto py-8 flex flex-col gap-4">
      <AddTodos />
      <Todos />
    </div>
  );
}
