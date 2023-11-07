import { PrismaClient } from "@prisma/client";
import { data } from "./listingsData";

type Listing = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  published: boolean;
  ownerId: number;
};

const prisma = new PrismaClient();

async function main() {
  console.log("Starting to seed the DB...");

  const upsertPromises = data.map((listing: Listing) => {
    return prisma.listing.upsert({
      where: { id: listing.id },
      update: {},
      create: listing,
    });
  });

  await Promise.all(upsertPromises);

  console.log("Seeded Successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
