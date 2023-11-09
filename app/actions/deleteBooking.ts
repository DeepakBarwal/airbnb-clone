"use server";
import { prisma } from "../../db/prisma";
import { redirect } from "next/navigation";

export default async function deleteBooking(bookingId: number) {
  try {
    await prisma.booking.delete({
      where: { id: bookingId },
    });
    redirect("/search");
  } catch (error) {
    console.error(error);
  }
}
