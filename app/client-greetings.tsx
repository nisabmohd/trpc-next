"use client";

import { trpc } from "@/trpc/react";

export default function ClientGreetings() {
  const greeting = trpc.hello.useQuery({ text: "Nisab" });

  if (!greeting.data) return <div>Loading...</div>;
  return <div>{greeting.data.greeting}</div>;
}
