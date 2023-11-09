"use client";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { AuthButton } from "../../auth/index";
import { Bars3Icon } from "@heroicons/react/24/outline";

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
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="flex p-2 border bg-white shadow-sm hover:shadow-md rounded-full mr-3 cursor-pointer"
            >
              <Bars3Icon className="h-6 w-6 text-slate-600 mx-auto" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/trips"}>My Trips</Link>
              </li>
              <li>
                <Link href={"/host/listings"}>My Listings</Link>
              </li>
            </ul>
          </div>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default BasicHeader;
