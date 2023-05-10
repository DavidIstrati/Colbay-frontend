import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineTag,
} from "react-icons/ai";
import Link from "next/link";
import { Router } from "next/router";

export default function Navbar({
  active,
}: {
  active: string;
}): JSX.Element {
  return (
    <header className="w-screen h-20 z-50 bg-white py-4 lg:px-10 xl:px-20 2xl:px-60 shadow-md flex flex-row justify-between">
      <div className="flex flex-row h-full">
        <Link href="/search"><img src="/LogoText.svg" className="h-full" /></Link>
        <div className="flex flex-row h-full ml-20">
          <NavTab
            icon={<AiOutlineHome />}
            text={"Home"}
            active={active}
            link="/search"
          />
          <NavTab
            icon={<AiOutlineHeart />}
            text={"Likes"}
            active={active}
            link={"/likes"}
          />
          <NavTab
            icon={<AiOutlineTag />}
            text={"Listings"}
            active={active}
            link="/listing"
          />
        </div>
      </div>
      <div className="flex flex-row h-full ml-20">
        <NavTab
          icon={<AiOutlineUser />}
          text={"Account"}
          active={active}
          link="/account"
        />
      </div>
    </header>
  );
}

const NavTab = ({
  icon,
  text,
  active,
  link,
  onClick,
}: {
  icon: JSX.Element;
  text: string;
  active: string;
  link: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={link}>
      <div
        className={`rounded-md transition duration-300 ease-in-out border border-greay-400 text-md flex justify-center items-center px-4 py-1 ml-5 cursor-pointer hover:rounded-lg hover:shadow-md ${
          active == text.toLowerCase()
            ? "text-indigo-50 bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/20"
            : "bg-white text-gray-900 "
        } `}
        onClick={onClick}
      >
        {icon}
        <span className="ml-2">{text}</span>
      </div>
    </Link>
  );
};
