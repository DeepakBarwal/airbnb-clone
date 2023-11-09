"use server";
import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const submitBookingTimes = async (
  listingId: number,
  dateranges: Prisma.ListingUpdateInput["availabilities"]["create"]
) => {
  const result = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      availabilities: {
        deleteMany: {},
        create: dateranges,
      },
    },
    include: {
      availabilities: true,
    },
  });
  if (result) {
    revalidatePath("/host");
  }
  console.log(result);
};

export default submitBookingTimes;
