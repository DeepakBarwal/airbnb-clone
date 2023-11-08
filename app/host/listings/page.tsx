import Link from "next/link";
import { prisma } from "../../../db/prisma";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export default async function Page() {
  const userId = auth().userId;
  const listings = await prisma.listing.findMany({
    where: {
      ownerId: userId,
    },
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-4xl font-bold">Your Listings</h1>
      <div className="flex flex-col gap-3">
        {listings.map((listing: Prisma.ListingGetPayload<{}>) => (
          <Link href={`/host/${listing.id}`}>
            <div className="card shadow-xl p-4">
              <h2 className="text-2xl font-bold">{listing.name}</h2>
              <p className="text-gray-500">{listing.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
