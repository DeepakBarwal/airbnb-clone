import { prisma } from "../../../db/prisma";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Calendar from "./components/Calendar";

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

  if (listing.ownerId !== userId) {
    notFound();
  }

  return (
    <div>
      <h1>{listing.name}</h1>
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
      <Calendar listing={listing} />
    </div>
  );
}
