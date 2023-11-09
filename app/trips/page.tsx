import Link from "next/link";
import { prisma } from "../../db/prisma";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import TripCancel from "./components/TripCancel";

const bookingSelect = {
  id: true,
  startDate: true,
  endDate: true,
  listing: true,
} satisfies Prisma.BookingSelect;

export default async function Page() {
  const userId = auth().userId;
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId,
    },
    include: {
      listing: true,
    },
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-4xl font-bold">Your Trips</h1>
      <div className="flex flex-col gap-3">
        {bookings && bookings.length > 0 ? (
          bookings.map(
            (
              booking: Prisma.BookingGetPayload<{
                select: typeof bookingSelect;
              }>
            ) => (
              <div>
                <div className="card shadow-md hover:shadow-xl p-4 flex flex-row gap-4">
                  <img
                    src={booking.listing.image}
                    className="w-36 h-36 rounded-md"
                  />
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold">
                      {booking.listing.name}
                    </h2>
                    <p className="text-gray-500">
                      {booking.listing.description}
                    </p>
                    <p className="text-gray-500">
                      {booking.startDate.toDateString()} {"->"}{" "}
                      {booking.endDate.toDateString()}
                    </p>
                    <TripCancel bookingId={booking.id} />
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-gray-500">You have no upcoming trips</p>
        )}
      </div>
    </div>
  );
}
