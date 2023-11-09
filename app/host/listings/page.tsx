import Link from "next/link";
import { prisma } from "../../../db/prisma";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const listingSelect = {
  id: true,
  image: true,
  name: true,
  description: true,
  bookings: true,
} satisfies Prisma.ListingSelect;

export default async function Page() {
  const userId = auth().userId;
  const listings = await prisma.listing.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      bookings: true,
    },
  });

  const maxBookings = Math.max(
    ...listings.map((listing) => listing.bookings.length)
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-4xl font-bold">Your Listings</h1>
      <div className="flex flex-col gap-3">
        {listings.map(
          (
            listing: Prisma.ListingGetPayload<{ select: typeof listingSelect }>
          ) => (
            <Link href={`/host/${listing.id}`}>
              <div className="card shadow-md hover:shadow-xl p-4 flex flex-row gap-4">
                <img src={listing.image} className="w-36 h-36 rounded-md" />
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold">{listing.name}</h2>
                  <p className="text-gray-500">{listing.description}</p>
                  {listing.bookings?.length > 0 ? (
                    <p>
                      {listing.bookings.length === maxBookings ? (
                        <span>
                          <ArrowTrendingUpIcon className="w-5 h-5 mr-1 inline text-gray-500" />{" "}
                          Booked {listing.bookings.length}x times
                        </span>
                      ) : null}
                    </p>
                  ) : (
                    <p className="text-gray-500">No bookings yet.</p>
                  )}
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
