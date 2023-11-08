import { auth } from "@clerk/nextjs";
import { prisma } from "../../../db/prisma";
import { redirect } from "next/navigation";

export default function Page() {
  async function submitListing(formData: FormData) {
    "use server";
    const userId = auth().userId;
    const name = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;

    const createListing = await prisma.listing.create({
      data: {
        name,
        description,
        location,
        price: parseInt(price),
        image,
        ownerId: userId,
      },
    });

    if (createListing) {
      redirect("/host/create-listing/success");
    }
  }

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Create Booking</h1>
      <form action={submitListing} method="POST">
        <div className="mb-6">
          <label
            className="mb-2 text-gray text-sm font-medium block w-full"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
            type="text"
            name="title"
            id="title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 text-gray text-sm font-medium block w-full"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
            name="description"
            id="description"
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 text-gray text-sm font-medium block w-full"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
            type="text"
            name="location"
            id="location"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 text-gray text-sm font-medium block w-full"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
            type="number"
            name="price"
            id="price"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 text-gray text-sm font-medium block w-full"
            htmlFor="image"
          >
            Image URL
          </label>
          <input
            className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
            type="text"
            name="image"
            id="image"
          />
        </div>
        <button
          className="px-4 text-white rounded-lg bg-primary p-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
