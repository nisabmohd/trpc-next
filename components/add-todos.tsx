"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";

export default function AddTodos() {
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = trpc.todos.createTodo.useMutation({
    onSuccess: () => {
      queryClient.refetchQueries();
      setInput("");
    },
  });

  function addTodo(e: FormEvent) {
    e.preventDefault();
    mutate({
      title: input,
    });
  }

  return (
    <form className="grid grid-cols-4 gap-3" onSubmit={addTodo}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="col-span-3"
        placeholder="Title"
      />
      <Button disabled={isPending || !input} onClick={addTodo}>
        Create
      </Button>
    </form>
  );
}
