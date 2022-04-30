import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { PageSearch } from "../../components";

import Router from "next/router";

import { Navbar } from "../../components";

import { onPageLoad, useAuth } from "../../helpers";

const Home: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, false);
  }, []);

  return (
    <div className="w-screen h-screen  flex justify-center items-center -z-40 absolute font-spaceGrotesk bg-white">
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
            className="w-1/3 h-14 mt-10"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <PageSearch
              placeholder="What are you looking for?"
              initialSearch={""}
              onSubmit={(search) => Router.push(`/search?q=${search}`)}
            />
          </div>
          {/* <div
            className="text-xs mt-5"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="1000"
          >
            <span>345 active listings</span>
          </div> */}
        </div>
        <div className="w-full flex justify-start flex-col pb-28 px-20">
          <span className="font-bold pl-2 text-xl">Popular Categories</span>
          <div className="w-full h-1 bg-gray-100 my-2 mx-2"></div>
          <div className="w-full flex flex-row flex-wrap">
            {[
              {
                imgPath: "../illustrations/books.png",
                title: "Books",
                description: "Class textbooks, novels and others",
                color: "bg-orange-100",
              },
              {
                imgPath: "../illustrations/monitor.png",
                title: "Monitors",
                description: "Class textbooks, novels and others",
                color: "bg-indigo-100",
              },
              {
                imgPath: "../illustrations/furniture.png",
                title: "Furniture",
                description: "Class textbooks, novels and others",
                color: "bg-rose-100",
              },
              {
                imgPath: "../illustrations/electronics.png",
                title: "Electronics",
                description: "Class textbooks, novels and others",
                color: "bg-emerald-100",
              },
              {
                imgPath: "../illustrations/light.png",
                title: "Lights",
                description: "Class textbooks, novels and others",
                color: "bg-sky-100",
              },
              {
                imgPath: "../illustrations/other.png",
                title: "Other",
                description: "Class textbooks, novels and others",
                color: "bg-purple-100",
              },
              {
                imgPath: "../illustrations/everything.png",
                title: "All Listings",
                description: "Class textbooks, novels and others",
                color: "bg-pink-100",
              },
            ].map(({ imgPath, title, description, color }) => (
              <CategoryItem
                imgPath={imgPath}
                title={title}
                description={description}
                color={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({
  imgPath,
  title,
  description,
  color,
}: {
  imgPath: string;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="w-1/4 h-28 p-2">
      <div
        className={`w-full h-full rounded-lg  ${color} transition duration-500 ease-in-out hover:shadow-md border border-gray-300 flex flex-row`}
      >
        <div className="w-1/3 h-full p-4 flex justify-center items-center">
          <img src={imgPath} className="max-h-full max-w-full" />
        </div>
        <div className="w-2/3 h-full px-2 py-4 flex flex-col justify-center items-start">
          <span className="text-lg font-bold">{title}</span>
          <span className="text-xs">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
