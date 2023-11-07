import Link from "next/link";
import { prisma } from "@/db/prisma";
import ResultsList from "./results/components/ResultsList";

export default async function Page() {
  const res = await prisma.listing.findMany();

  return (
    <>
      <div className="flex container items-center justify-center w-screen h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Link
          href="/search/results"
          className="rounded-full text-white bg-[#BA51DE] hover:bg-[#9D58F6] px-4 py-2"
        >
          Browse Stays
        </Link>
      </div>
      <ResultsList data={res} />
    </>
  );
}
