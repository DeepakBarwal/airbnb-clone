import ResultsList from "./components/ResultsList";
import { prisma } from "../../../db/prisma";

export default async function Page() {
  const res = await prisma.listing.findMany();

  return (
    <>
      <ResultsList data={res} />
    </>
  );
}
