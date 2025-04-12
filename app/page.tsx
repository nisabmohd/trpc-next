import { HydrateClient, trpc } from "@/trpc/server";
import ClientGreetings from "./client-greetings";

export default async function Home() {
  const res = await trpc.hello({ text: "Nisab" });
  console.log(res);

  return (
    <HydrateClient>
      <div>...</div>
      <ClientGreetings />
    </HydrateClient>
  );
}
