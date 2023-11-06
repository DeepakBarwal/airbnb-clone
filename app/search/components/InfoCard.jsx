"use client";
import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { motion, useAnimate } from "framer-motion";
import { useReward } from "react-rewards";

const rewardConfigs = {
  lifetime: 22,
  angle: 194,
  decay: 0.07,
  spread: 360,
  startVelocity: 41,
  elementCount: 23,
  elementSize: 5,
};

const InfoCard = ({ listing }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [scope, animate] = useAnimate();
  const { reward, isAnimating } = useReward(
    `reward_${listing.id}`,
    "confetti",
    rewardConfigs
  );

  useEffect(() => {
    let timeoutId;
    if (isFavorite) {
      animate(
        "svg",
        {
          scale: [0, 1],
        },
        {
          duration: 0.5,
        },
        {
          type: "spring",
        }
      );
      timeoutId = setTimeout(() => reward(), 500);
    } else {
      animate(
        "svg",
        {
          scale: [1, 0],
        },
        {
          duration: 0.5,
        },
        {
          type: "spring",
        }
      );
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFavorite]);

  const handleFavoriteUpdate = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <div className="md:max-w-md mx-auto shadow-md rounded-lg overflow-hidden relative">
      <img
        src={listing.image}
        alt={listing.name}
        className="object-cover transition-transform duration-300 transform hover:scale-110" // w-full h-48
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold mb-2">{listing.name}</h3>
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-gray-800">{listing.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{listing.description}</p>
        <button
          className="absolute bottom-4 right-4 p-2 z-30"
          onClick={handleFavoriteUpdate}
        >
          <span id={`reward_${listing.id}`}>
            <HeartIcon className="w-5 h-5 text-primary" />
          </span>
        </button>
        <div ref={scope} className="absolute bottom-4 right-4 p-2 -z-30">
          <FilledHeartIcon className="w-5 h-5 text-primary scale-0" />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
