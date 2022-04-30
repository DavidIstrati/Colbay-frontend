import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { postLike } from "../../api";

interface card {
  id: string;
  userId?: string;
  image: string;
  title: string;
  price: string;
  description: string;
  likes: number;
}

const Card = ({
  id,
  userId,
  image,
  title,
  price,
  description,
  likes,
}: card): JSX.Element => {
  const [hover, setHover] = useState("");

  return (
    <div
      key={id}
      className="w-full h-full bg-slate-50 border border-slate-200 rounded-lg relative"
    >
      <div className="h-3/5 w-full flex justify-center">
        <img
          src={`${image}`}
          className="max-w-full max-h-full rounded-t-md"
        />
        <div className="w-full h-2/5 transition duration-500 ease-in-out opacity-0 hover:opacity-100 absolute bottom-0 right-0 rounded-lg">
          <div className="w-full h-full p-4 flex flex-row justify-center items-center bg-slate-100 border-t border-slate-300">
            <div className="w-28 h-10 font-bold text-sm text-white transition duration-300 ease-in-out bg-emerald-500 rounded-lg hover:bg-emerald-400 hover:text-white  flex justify-center items-center cursor-pointer">
              <span className="mr-1">Buy Now</span>
              <AiOutlineArrowRight />
            </div>
            <div
              className="w-16 h-10 text-sm text-pink-500  transition duration-300 ease-in-out bg-pink-100 hover:bg-pink-400 hover:text-white rounded-lg  ml-2  flex justify-center items-center cursor-pointer"
              onClick={() =>
                postLike({
                  listingId: id,
                  userId: userId,
                }).then(() => alert("LIKED!"))
              }
            >
              <span>{likes}</span>
              <AiOutlineHeart />
            </div>
          </div>
        </div>
      </div>
      <div className="h-2/5 w-full flex flex-col px-4 pb-2">
        <div className="w-full h-1 bg-slate-100 mt-2"></div>
        <span className="text-md text-gray-900 font-bold mt-1">{title}</span>
        <span className="text-sm text-emerald-500">${price}</span>
        <div className="w-full h-full mt-1">
          <span className="text-xs text-slate-300 text-ellipsis ">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Card };
