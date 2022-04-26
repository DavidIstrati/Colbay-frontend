import { AiOutlineHome, AiOutlineHeart, AiOutlineTag } from "react-icons/ai";
import Link from "next/link";

export default function Navbar({ active }: { active: string }): JSX.Element {
  return (
    <div className="w-screen h-20 bg-white py-4 px-40 border-b-2 border-gray-900 flex flex-row">
      <img src="/LogoText.svg" className="h-full" />
      <div className="flex flex-row h-full ml-20">
        <Link href="/search">
          <div
            className={`rounded-sm border hover:bg-black hover:text-white shadow-solid-2 text-md flex justify-center items-center px-4 py-1 cursor-pointer ${
              active == "home"
                ? "bg-black text-white border-white"
                : "bg-white text-gray-900 border-gray-900"
            } `}
          >
            <AiOutlineHome />
            <span className="ml-2">Home</span>
          </div>
        </Link>
        <Link href="/likes">
          <div
            className={`rounded-sm border  hover:bg-black hover:text-white shadow-solid-2 text-md flex justify-center items-center px-4 py-1 ml-5 cursor-pointer ${
              active == "likes"
                ? "bg-black text-white"
                : "bg-white text-gray-900 border-gray-900"
            } `}
          >
            <AiOutlineHeart />
            <span className="ml-2">Likes</span>
          </div>
        </Link>
        <Link href="/listings">
          <div
            className={`rounded-sm border hover:bg-black hover:text-white shadow-solid-2 text-md flex justify-center items-center px-4 py-1 ml-5 cursor-pointer ${
              active == "listings"
                ? "bg-black text-white"
                : "bg-white text-gray-900 border-gray-900 "
            }`}
          >
            <AiOutlineTag />
            <span className="ml-2 font-spaceGrotesk">Listings</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
