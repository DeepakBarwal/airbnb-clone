"use server";
import { prisma } from "../../db/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteListing(listingId: number) {
  try {
    await prisma.listing.delete({
      where: { id: listingId },
    });
    revalidatePath("/host");
  } catch (error) {
    console.error(error);
  }
}
