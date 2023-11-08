import React from "react";
import BasicHeader from "./components/BasicHeader";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BasicHeader />
      <main className="relative top-[7.5rem] pt-4 container mx-auto">
        {children}
      </main>
    </>
  );
}
