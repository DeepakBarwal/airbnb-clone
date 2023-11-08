"use server";
import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function createUserBooking(
  bookingInfo: Prisma.BookingUncheckedCreateInput
) {
  const createBooking = await prisma.booking.create({
    data: {
      ...bookingInfo,
    },
  });

  revalidatePath("/search");
  console.log(createBooking);
}
