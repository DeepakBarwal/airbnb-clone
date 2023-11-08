import { prisma } from "../../../db/prisma";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import BookingCalendar from "./components/BookingCalendar";

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(params.listingId) },
    include: {
      availabilities: true,
      bookings: true,
    },
  });

  const userId = auth().userId;

  if (!userId || !listing) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold my-2">{listing.name}</h1>
      <div className="flex flex-col gap-4 md:flex-row items-stretch">
        <div className="flex-1">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : null}
          <p>{listing.description}</p>
          <p>{listing.price}</p>
          {listing.rating ? (
            <div className="flex flex-row items-center">
              <StarIcon className="h-5 w-5 text-gray-800 mr-1" />
              <span className="text-gray-800">{listing.rating}</span>
            </div>
          ) : null}
          <div className="flex flex-row items-center">
            <MapPinIcon className="h-5 w-5 text-gray-800 mr-1" />
            <span className="text-gray-800">{listing.location}</span>
          </div>
        </div>
        <div className="flex-1 border p-3 rounded-md">
          <BookingCalendar listing={listing} userId={userId} />
        </div>
      </div>
    </div>
  );
}
