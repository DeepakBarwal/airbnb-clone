import { prisma } from "../db/prisma";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserButton afterSignOutUrl="/" />
      {users.map((user, index) => (
        <p className="text-slate-900" key={index}>
          {user.name}
        </p>
      ))}
    </main>
  );
}
