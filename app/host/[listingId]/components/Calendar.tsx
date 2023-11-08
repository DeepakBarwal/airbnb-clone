"use client";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import submitBookingTimes from "../../../actions/submitBookingTimes";
import clsx from "clsx";

const listingSelect = {
  id: true,
  availabilities: true,
  bookings: true,
} satisfies Prisma.ListingSelect;

type ListingPayload = Prisma.ListingGetPayload<{
  select: typeof listingSelect;
}>;

type DateRangeSelection = {
  selection1: Range;
  selection2: Range;
  selection3: Range;
};

export default function Calendar({ listing }: { listing: ListingPayload }) {
  const defaultDateRange = {
    selection1: {
      startDate: addDays(new Date(), 1),
      endDate: null,
      key: "selection1",
    },
    selection2: {
      startDate: addDays(new Date(), 4),
      endDate: addDays(new Date(), 8),
      key: "selection2",
    },
    selection3: {
      startDate: addDays(new Date(), 8),
      endDate: addDays(new Date(), 10),
      key: "selection3",
      autoFocus: false,
    },
  };

  const initialDateRange =
    listing.availabilities && listing.availabilities.length > 0
      ? {
          ...defaultDateRange,
          selection1: {
            ...defaultDateRange.selection1,
            startDate:
              listing.availabilities[0].startDate ||
              defaultDateRange.selection1.startDate,
            endDate:
              listing.availabilities[0].endDate ||
              defaultDateRange.selection1.endDate,
          },
        }
      : defaultDateRange;

  const [state, setState] = useState<DateRangeSelection>(initialDateRange);
  const [showModal, setShowModal] = useState(false);

  const isBooked = (day: Date) => {
    return listing.bookings.some((booking) => {
      return day >= booking.startDate && day <= booking.endDate;
    });
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

  const handleSubmitChanges = () => {
    const dateRanges = Object.values(state).map((range) => {
      return {
        startDate: range.startDate,
        endDate: range.endDate,
      };
    });

    submitBookingTimes(listing.id, dateRanges);
    setShowModal(false);
  };

  return (
    <div>
      <h1>Available Dates</h1>
      {!listing.availabilities || listing.availabilities.length === 0 ? (
        <>
          <p>No Available Dates</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn bg-primary text-white hover:text-black"
          >
            Add Availability
          </button>
          <input
            type="checkbox"
            id="calendar-modal"
            className="modal-toggle"
            checked={showModal}
            onChange={() => setShowModal((prevShow) => !prevShow)}
          />
        </>
      ) : (
        <>
          <ul>
            {listing.availabilities.map((availability) => (
              <li key={availability.id}>
                <span>{availability.startDate.toDateString()}</span>
                <span> - </span>
                <span>{availability.endDate.toDateString()}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowModal(true)}
            className="btn bg-primary text-white hover:text-black"
          >
            Edit Availability
          </button>
          <input
            type="checkbox"
            id="calendar-modal"
            className="modal-toggle"
            checked={showModal}
            onChange={() => setShowModal((prevShow) => !prevShow)}
          />
        </>
      )}
      <div className="modal">
        <div className="modal-box flex flex-col">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            x
          </button>
          <h3 className="font-bold text-lg">Please select the dates</h3>
          <p className="text-gray-500 py-2">
            Please note you can select up to 3 ranges.
          </p>
          <DateRangePicker
            minDate={new Date()}
            onChange={(item) => setState({ ...state, ...item })}
            ranges={[state.selection1, state.selection2, state.selection3]}
            rangeColors={["#FF385C", "#F7B267", "#3E92CC"]}
            dayContentRenderer={(day) => customDayContent(day, isBooked)}
            disabledDay={isBooked}
          />
          <div className="modal-action">
            <button
              className="btn bg-primary text-white hover:text-black"
              onClick={handleSubmitChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
