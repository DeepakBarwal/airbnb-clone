"use client";
import { useState, useTransition } from "react";
import { Prisma } from "@prisma/client";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import createUserBooking from "../../../actions/createUserBooking";
import clsx from "clsx";

const listingSelect = {
  id: true,
  availabilities: true,
  bookings: true,
} satisfies Prisma.ListingSelect;

type ListingPayload = Prisma.ListingGetPayload<{
  select: typeof listingSelect;
}>;

export default function BookingCalendar({
  listing,
  userId,
}: {
  listing: ListingPayload;
  userId: string;
}) {
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 3));
  const [isBookingDisabled, setIsBookingDisabled] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  const handleSelect = (ranges: RangeKeyDict) => {
    if (isBookingDisabled) {
      setIsBookingDisabled(false);
    }
    if (ranges.selection.startDate !== startDate) {
      setstartDate(ranges.selection.startDate);
    }
    if (ranges.selection.endDate !== endDate) {
      setEndDate(ranges.selection.endDate);
    }
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const isBooked = (day: Date) => {
    return listing.bookings.some((booking) => {
      return day >= booking.startDate && day <= booking.endDate;
    });
  };

  const calculateDisabledDay = (day: Date) => {
    // check if the date falls into availabilties list by the host
    const isAvailable = listing.availabilities.some((availabilty) => {
      return day >= availabilty.startDate && day <= availabilty.endDate;
    });

    return !isAvailable || isBooked(day);
  };

  const customDayContent = (day: Date, isBooked: (day: Date) => Boolean) => {
    const dayClass = clsx({
      "line-through": isBooked(day),
    });

    return (
      <div>
        <span className={dayClass}>{format(day, "d")}</span>
      </div>
    );
  };

  const handleBooking = () => {
    startTransition(() =>
      createUserBooking({
        listingId: listing.id,
        startDate: startDate,
        endDate: endDate,
        userId: userId,
      })
    );
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-slate-600">Please select the dates.</h3>
      <DateRangePicker
        minDate={new Date()}
        onChange={handleSelect}
        ranges={[selectionRange]}
        rangeColors={["#FF385C"]}
        disabledDay={calculateDisabledDay}
        dayContentRenderer={(day) => customDayContent(day, isBooked)}
      />
      {isBookingDisabled ? (
        <p className="text-red-500 my-2">
          The date selection is required before proceeding
        </p>
      ) : null}
      <button
        disabled={isBookingDisabled}
        className="btn bg-primary text-white hover:text-black self-start mt-3"
        onClick={handleBooking}
      >
        Reserve
      </button>
    </div>
  );
}
