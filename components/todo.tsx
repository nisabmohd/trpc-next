"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { trpc } from "@/trpc/react";
import { useQueryClient } from "@tanstack/react-query";

export default function Todo({
  done,
  title,
  id,
}: {
  title: string;
  done: boolean;
  id: number;
}) {
  const queryClient = useQueryClient();

  const refetch = () => queryClient.refetchQueries();

  const { mutate: remove, isPending: isDeleting } =
    trpc.todos.deleteTodo.useMutation({ onSuccess: refetch });
  const { mutate: edit, isPending: isEditing } =
    trpc.todos.editTodo.useMutation({ onSuccess: refetch });

  function deleteTodo() {
    remove(id);
  }

  function changeStatus(val: boolean) {
    edit({
      id,
      data: {
        done: val,
      },
    });
  }

  return (
    <div className="grid grid-cols-8 items-center gap-2">
      <Checkbox
        disabled={isEditing || isDeleting}
        onCheckedChange={changeStatus}
        checked={done}
      />
      <p className="col-span-6">{title}</p>
      <Button
        disabled={isDeleting || isEditing}
        onClick={deleteTodo}
        size="icon"
        variant="ghost"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
}
