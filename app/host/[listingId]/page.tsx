import { prisma } from "../../../db/prisma";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Calendar from "./components/Calendar";
import ListingImage from "./components/ListingImage";
import { revalidatePath } from "next/cache";
import ImageUploader from "../components/ImageUploader";
import ListingDelete from "../components/ListingDelete";

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

  const saveFileUrl = async (fileUrl: string) => {
    "use server";
    await prisma.listing.update({
      where: {
        id: listing.id,
      },
      data: {
        image: fileUrl,
      },
    });
    revalidatePath("/host");
  };

  if (listing.ownerId !== userId) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl my-4 font-semibold text-center">
        Modify Your Listing
      </h1>
      <div className="container md:max-w-xl mx-auto border rounded-md p-4 mt-4">
        <h2 className="text-2xl my-4 font-semibold">{listing.name}</h2>
        {listing.image ? (
          <ListingImage
            imgUrl={listing.image}
            imgAlt={listing.name}
            saveFileUrl={saveFileUrl}
          />
        ) : (
          <ImageUploader saveFileUrl={saveFileUrl} />
        )}
        <p className="text-slate-700 my-2">{listing.description}</p>
        <p className="font-bold my-2">₹{listing.price}/night</p>
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
        <div className="flex justify-between">
          <Calendar listing={listing} />
          <div className="self-end">
            <ListingDelete listingId={listing.id} />
          </div>
        </div>
      </div>
    </>
  );
}
