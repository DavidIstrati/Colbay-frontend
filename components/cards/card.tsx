import Link from "next/link";
import React, { useRef } from "react";
import { Suspense, useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
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
        className="w-full h-full bg-white border border-slate-200 rounded-lg relative overflow-hidden transition duration-500 ease-in-out shadow hover:shadow-lg hover:scale-105"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="h-3/5 w-full flex justify-center">
          <Suspense fallback={<PulseFill />}>
            {image != "" && (
              <SuspenseImage
                alt={description}
                imageSrc={`${image}`}
                className="w-full h-full rounded-t-md"
              />
            )}
          </Suspense>
          {!loading && (
            <div
              className={`w-full h-2/5 transition duration-500 ease-in-out ${
                hover ? "translate-0 opacity-100" : "translate-y-full opacity-0"
              } absolute bottom-0 right-0 rounded-lg`}
            >
              <div className="w-full h-full p-4 flex flex-row justify-center items-center bg-white border-t border-slate-400 rounded-b-lg">
                <Link href={`/listing/${listingId}`}>
                  <div className="w-28 h-10 font-bold text-sm text-slate-900 transition duration-300 ease-in-out border border-slate-300 rounded-lg hover:text-emerald-500 hover:border-emerald-300   flex justify-center items-center cursor-pointer">
                    <span className="mr-1">Buy Now</span>
                    <AiOutlineShoppingCart />
                  </div>
                </Link>
                <div
                  className={`w-10 h-10 text-md transition  duration-700 ease-in-out border-pink-50 text-pink-500 rounded-lg  ml-2  flex justify-center items-center cursor-pointer ${
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
          )}
        </div>
        <div className="h-2/5 w-full flex flex-col px-4 pb-2">
          <div className="w-full h-1 bg-slate-100 mt-2"></div>
          <span className="text-md text-gray-900 font-bold mt-1">{title}</span>
          <span className="text-sm text-emerald-500">${price}</span>
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
      <div className="w-full h-full bg-white border border-slate-200 rounded-lg relative shadow">
        <div className="h-3/5 w-full flex justify-center">
          <div className="bg-slate-200 animate-pulse w-full h-full rounded-t-md" />
        </div>
        <div className="h-2/5 w-full flex flex-col px-4 pb-2">
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
