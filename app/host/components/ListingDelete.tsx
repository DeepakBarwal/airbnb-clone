"use client";
import { useRef } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteConfirmationPopup from "../../common/DeleteConfirmationPopup";
import deleteListing from "../../actions/deleteListing";
import { useRouter } from "next/navigation";

export default function ListingDelete({ listingId }: { listingId: number }) {
  const ref = useRef(null);
  const router = useRouter();

  const openConfirm = async () => {
    ref.current.showConfirm();
  };

  return (
    <>
      <button className="p-4" onClick={openConfirm}>
        <TrashIcon className="h-5 w-5 text-gray-800 mr-1" />
      </button>
      <DeleteConfirmationPopup
        ref={ref}
        onConfirm={async () => {
          await deleteListing(listingId);
          router.push("/host/listings");
        }}
      />
    </>
  );
}
