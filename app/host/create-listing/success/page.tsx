import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <div className="text-center">
      <div className="inline-flex text-center grow-0 flex-col justify-center items-center gap-3 mx-auto p-8 mt-8 border rounded-lg">
        <CheckCircleIcon className="w-12 h-12 text-green-600" />
        <h1 className="mb-4 text-4xl font-extrabold">
          Your Listing Has Been Published
        </h1>
        <div>
          <Link
            href="/host/create-listing"
            className="px-4 text-white rounded-full bg-primary p-4"
          >
            Add Another
          </Link>
          <Link href="/" className="text-primary px-4 p-4 mt-2 underline">
            Browse Your Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
