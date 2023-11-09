"use client";
import { useRef } from "react";
import DeleteConfirmationPopup from "../../common/DeleteConfirmationPopup";
import deleteBooking from "../../actions/deleteBooking";
import { useRouter } from "next/navigation";

const TripCancel = ({ bookingId }: { bookingId: number }) => {
  const ref = useRef(null);
  const router = useRouter();

  const openConfirm = async () => {
    ref.current.showConfirm();
  };

  return (
    <>
      <button onClick={openConfirm} className="text-gray-500 underline">
        Cancel Reservation
      </button>
      <DeleteConfirmationPopup
        ref={ref}
        onConfirm={async () => {
          await deleteBooking(bookingId);
          router.push("/trips");
        }}
      />
    </>
  );
};

export default TripCancel;
