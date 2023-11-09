"use server";
import { prisma } from "../../db/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteBooking(bookingId: number) {
  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    revalidatePath("/trips");
  } catch (error) {
    console.error(error);
  }
}
