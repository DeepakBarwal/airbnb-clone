import { prisma } from "@/db/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {users.map((user) => (
        <p>{user.listing[0]}</p>
      ))} */}
    </main>
  );
}
