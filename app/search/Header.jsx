"use client";
import { useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useClickAway } from "react-use";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSearchStore, initialState } from "../../store/store";
import MobileNav from "./components/MobileNav";
import { AuthButton } from "../auth/index";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const searchStore = useSearchStore((state) => state);

  const toggleExpanded = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  useClickAway(ref, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  const headerContainerClasses = clsx(
    "container",
    "mx-auto",
    "flex",
    "justify-between",
    "bg-white",
    "py-8",
    "z-50",
    {
      "h-[7.5rem]": !isExpanded,
      "h-[13rem]": isExpanded,
    }
  );

  const searchContainerClasses = clsx(
    "search-container",
    "flex",
    "flex-row",
    "rounded-full",
    "p-4",
    "justify-center",
    "items-center",
    "border",
    "drop-shadow-md",
    "bg-white",
    "w-auto",
    "self-center",
    {
      "border-b-0": !isExpanded,
      "border-b-8": isExpanded,
    }
  );

  const modalClasses = clsx(
    "absolute",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "z-40",
    "bg-black",
    "bg-opacity-50",
    "transition-opacity duration-300 ease-in-out",
    {
      hidden: !isExpanded,
      block: isExpanded,
      "opacity-0": !isExpanded,
      "opacity-100": isExpanded,
    }
  );

  const userIconClasses = clsx("text-slate-600", "md:flex", "hidden", {
    "items-center": !isExpanded,
    "items-start": isExpanded,
  });

  // framer motion
  const searchContainerVariants = {
    initial: {
      opacity: 1,
      height: "auto",
      y: 0,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      y: 100,
      scale: 2,
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const tabVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -100,
      scale: 0,
    },
    enter: {
      opacity: 1,
      height: "auto",
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -100,
      scale: 0,
    },
  };

  return (
    <>
      <header className="flex border-b bg-white z-50 fixed w-full" ref={ref}>
        <div className={headerContainerClasses}>
          <div className="text-red-500 hidden md:flex">
            <Image src="/images/logo.png" height={50} width={172} alt="Logo" />
          </div>
          <div className="hidden md:flex flex-col grow">
            <motion.div
              className="flex flex-col justify-center"
              variants={tabVariants}
              initial="hidden"
              animate={isExpanded ? "enter" : "initial"}
              transition={{ type: "linear" }}
            >
              <SearchBar toggleExpanded={toggleExpanded} />
            </motion.div>

            <motion.button
              initial="initial"
              animate={isExpanded ? "hidden" : "initial"}
              transition={{ type: "linear" }}
              variants={searchContainerVariants}
              onClick={toggleExpanded}
              className={searchContainerClasses}
            >
              <div className="input flex border-none items-center px-4">
                <p>
                  {searchStore.location !== ""
                    ? searchStore.location
                    : "Anywhere"}
                </p>
              </div>
              <div className="input flex border-none items-center px-4">
                <p>
                  {searchStore.dates[0] !== initialState.dates[0] &&
                  searchStore.dates[1] !== initialState.dates[1]
                    ? `${searchStore.dates[0].toDateString()} - ${searchStore.dates[1].toDateString()}`
                    : "Any Date"}
                </p>
              </div>
              <div className="input flex border-none items-center px-4">
                <p>
                  {searchStore.guests > 0 ? searchStore.guests : "Add Guests"}
                </p>
              </div>
              <div className="search-btn px-4 rounded-full bg-primary h-10 w-10 relative">
                <MagnifyingGlassIcon className="w-5 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </motion.button>
          </div>
          {/* Mobile Nav */}
          <div className="md:hidden flex-grow">
            <MobileNav />
          </div>
          <button className="text-slate-800 p-4 flex items-center m-2 hover:bg-slate-200 rounded-full">
            Airbnb - Your Home
          </button>
          <div className={userIconClasses}>
            {/* <Image src="/images/user.svg" height={30} width={30} alt="User" /> */}
            <AuthButton />
          </div>
        </div>
      </header>
      <div className={modalClasses}></div>
    </>
  );
}
