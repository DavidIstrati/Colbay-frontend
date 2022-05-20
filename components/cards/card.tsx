import Link from "next/link";
import React, { useRef } from "react";
import { Suspense, useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";

import { BsArrowUpRight } from "react-icons/bs";

import { useSpring, easings, animated, to } from "react-spring";
import { PulseFill, SuspenseImage } from "..";
import { postLike } from "../../api";

const INITIAL_DELAY: number = 100;
const CARDS_DELAY: number = 100;
const ANIMATION_DURATION: number = 500;

const getProps = (index: number) => {
  return useSpring({
    to: {
      opacity: 1,
      transform: `translate(0px, 0px)`,
    },
    from: {
      opacity: 0,
      transform: `translate(0px, 100px)`,
    },
    delay: INITIAL_DELAY + index * CARDS_DELAY,
    config: { duration: ANIMATION_DURATION, easing: easings.easeInOutBack },
  });
};

export interface CardProps {
  listingId: string;
  userId?: string;
  image: string;
  title: string;
  price: string;
  description: string;
  isLiked?: boolean;
  likes: number;
  index?: number;
  loading?: boolean;
}

export const Card = ({
  listingId,
  userId,
  image,
  title,
  price,
  description,
  isLiked = false,
  likes,
  index = 0,
  loading = false,
}: CardProps): JSX.Element => {
  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(isLiked);

  return (
    <animated.div style={getProps(index)} className="w-full h-full">
      <div
        key={listingId}
        className="w-full h-full rounded-lg relative overflow-hidden transition duration-500 ease-in-out hover:scale-105"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="h-3/5 w-full flex justify-center relative">
          <Suspense fallback={<PulseFill />}>
            {image != "" && (
              <SuspenseImage
                alt={description}
                imageSrc={`${image}`}
                className={`w-full h-full rounded-md transition duration-200 ease-in-out ${hover ? "shadow-md" : "shadow"}`}
              />
            )}
          </Suspense>
          <div
            className={`absolute -bottom-5 right-2 border border-slate-200 shadow rounded-full w-10 h-10 flex justify-center items-center   transition  duration-500 ease-in-out ${
              like ? "bg-pink-50 shadow-pink-400/30" : "bg-slate-50"
            } ${hover || like ? "opcaity-100" : "opacity-0"} `}
          >
            <div
              className={`w-full h-full text-md transition  duration-700 ease-in-out border-pink-50 text-pink-500 rounded-full flex justify-center items-center cursor-pointer ${
                like ? "scale-150 rotate-720" : ""
              }`}
              onClick={() => {
                postLike({
                  listingId: listingId,
                  userId: userId ? userId : "",
                }).then(() => setLike(!like));
              }}
            >
              <span>{likes}</span>
              {like ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          </div>
        </div>
        <div className="h-2/5 w-full flex flex-col pb-2">
          <div className="w-full h-1 bg-slate-100 mt-2"></div>
          <span className="text-xl text-slate-900 font-bold">
            ${parseInt(price).toFixed(2)}
          </span>
          <span className="text-md text-slate-900 mt-1">{title}</span>
          <Link href={`/listing/${listingId}`}>
            <BsArrowUpRight className="text-sm" />
          </Link>
          {/* <div className="w-full h-full mt-1">
            <span className="text-xs text-slate-300 text-ellipsis ">
              {description}
            </span>
          </div> */}
        </div>
      </div>
    </animated.div>
  );
};

export const PreviewCard = (props: CardProps) => {
  return (
    <div className="w-[288px] h-[320px]">
      <Card {...props} />
    </div>
  );
};

export const LoadingCard = ({ index = 0 }: { index?: number }) => {
  return (
    <animated.div style={getProps(index)} className="w-full h-full">
      <div className="w-full h-full rounded-lg relative">
        <div className="h-3/5 w-full flex justify-center">
          <div className="bg-slate-200 animate-pulse w-full h-full rounded-t-md" />
        </div>
        <div className="h-2/5 w-full flex flex-col pb-2">
          <div className="text-md bg-slate-200  font-bold mt-4  w-10 h-4 animate-pulse rounded-lg"></div>
          <div className="text-sm bg-slate-200 w-4 h-2 animate-pulse mt-4 rounded-lg"></div>
          <div className="w-full h-full mt-4">
            <div className="text-xs bg-slate-200 w-full h-2 animate-pulse"></div>
            <div className="text-xs bg-slate-200 w-full h-2 animate-pulse mt-2"></div>
            <div className="text-xs bg-slate-200 w-1/2 h-2 animate-pulse mt-2"></div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};
