import Link from "next/link";
import ResultsList from "./results/components/ResultsList";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/search");
  const data = await res.json();

  return (
    <>
      <div className="flex items-center justify-center w-screen bg-cover bg-center h-48 bg-[url('/images/booking-website-hero.png')]">
        <Link
          href="/search/results"
          className="rounded-full text-white bg-[#673979] hover:bg-[#7B3C7D] px-4 py-2"
        >
          Browse Stays
        </Link>
      </div>
      <ResultsList data={data} />
    </>
  );
}
