import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { CustomLink } from "../../components";

import Router from "next/router";

import { Navbar } from "../../components";

import { useAuth } from "../../storage";

import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineTag,
  AiOutlineSearch,
} from "react-icons/ai";

import AOS from "aos";
import "aos/dist/aos.css";

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push("/signup");
    }
  }, []);

  const [search, setSearch] = useState("");

  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center -z-40 absolute font-spaceGrotesk background-stars-opacity-50">
      <div className="w-full h-full flex flex-col">
        <Navbar active="home" />

        <div className="w-full h-full flex flex-col justify-center items-center px-40">
          <div
            className="h-20 inline"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <img src="../LogoColbayText.svg" className="max-h-full" />
          </div>
          <div
            className="w-1/3 h-14 flex flex-row justify-start items-center border-2 border-gray-900 shadow-solid-4 rounded-l-md mt-10"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <div
              className="w-14 h-14 text-xl flex justify-center items-center text-black  border-2 border-gray-900 rounded-l-md  rounded-l-md"
              onClick={() => Router.push(`/search?q=${search}`)}
            >
              <AiOutlineSearch />
            </div>
            <input
              className="w-full h-full text-lg outline-none placeholder-slate-300 px-4"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            className="text-sm mt-5"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="800"
          >
            <span>
              Most popular: <CustomLink href="" content="Books" />,{" "}
              <CustomLink href="" content="Monitors" />,{" "}
              <CustomLink href="" content="Lights" />,{" "}
              <CustomLink href="" content="Furniture" />,{" "}
              <CustomLink href="" content="Coffee Maker" />,{" "}
              <CustomLink href="" content="Electronics" />
            </span>
          </div>
          <div
            className="text-sm mt-5"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="900"
          >
            <span>
              Or you can see <CustomLink href="" content="All Listings" />
            </span>
          </div>
          <div
            className="text-xs mt-5"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="1000"
          >
            <span>345 active listings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
