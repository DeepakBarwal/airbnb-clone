"use client";
import clsx from "clsx";
import Image from "next/image";
import { AuthButton } from "../../auth/index";

const BasicHeader = () => {
  const headerContainerClasses = clsx(
    "container",
    "mx-auto",
    "flex",
    "justify-between",
    "bg-white",
    "py-8",
    "z-50",
    "h-[7.5rem]"
  );

  const userIconClasses = clsx(
    "text-slate-600",
    "md:flex",
    "hidden",
    "items-center"
  );

  return (
    <header className="flex border-b bg-white z-50 fixed w-full">
      <div className={headerContainerClasses}>
        <div className="text-red-500 hidden md:flex">
          <Image src="/images/logo.png" height={50} width={172} alt="Logo" />
        </div>
        <div className={userIconClasses}>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default BasicHeader;
