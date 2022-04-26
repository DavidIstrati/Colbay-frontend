import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import type { NextPage } from "next";
import { Navbar } from "../components";
import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiOutlineArrowRight } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";

import Router from "next/router";

import { useAuth } from "../storage";

import { getLikes } from "../api";

const Likes: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [layout, setLayout] = useState();

  const [search, setSearch] = useState("");

  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push("/signup");
    }
  }, []);


  const { isLoading, error, data } = useQuery("likes", () =>
    getLikes(user?.userId).then((res) => {
      console.log(res)
      setLayout(
        res.data.map(({ Listings }, index) => ({
          i: Listings.listingId,
          x: 3 * (index % 5),
          y: 7 * ~~(index / 4),
          w: 3,
          h: 7,
          static: true,
        }))
      );
      console.log(res);
      return res.data;
    })
  );

  return (
    <div className="w-screen inline bg-slate-100 flex justify-center items-center -z-40 absolute font-spaceGrotesk background-stars-opacity-50">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="likes" />
        <div className="w-full p-40 pt-20 flex flex-col">
          <div className="w-full flex justify-center items-center">
            <span
              className="text-5xl font-bold"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="0"
            >
              Liked Posts
            </span>
          </div>
          <div className="flex flex-col mt-10 justify-center items-center">
            <div
              className="w-1/3 h-14 flex flex-row justify-start items-center border-2 border-gray-900 shadow-solid-4 rounded-l-md"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="w-14 h-14  bg-gradient-to-r from-blue-300 to-emerald-300 rounded-l-md">
                <img
                  src="LogoColbayTransparent.svg"
                  className="w-full h-full border-2 border-gray-900 rounded-l-md"
                />
              </div>
              <input
                className="w-full h-full text-lg outline-none placeholder-slate-300 px-4"
                placeholder="Search in likes"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
          <SizeMe>
            {({ size }) => (
              <GridLayout
                className="layout mt-10"
                useCSSTransforms={true}
                layout={layout}
                cols={15}
                rowHeight={50}
                width={size.width}
                containerPadding={[0, 0]}
                margin={[15, 15]}
              >
                {data &&
                  data.map(
                    (
                      { Listings },
                      index
                    ) => (
                      <div
                        key={Listings.listingId}
                        className="bg-white border-2 border-gray-900 p-4"
                        data-aos="fade-up"
                        data-aos-delay={500 + 300 * Math.min(2, ~~(index / 5))}
                        data-aos-duration="800"
                      >
                        <div className="h-1/2 w-full flex justify-start ">
                          <img
                            src={Listings.image}
                            className="max-w-full max-h-full border-2 border-gray-900"
                          />
                        </div>
                        <div className="h-1/2 w-full flex flex-col">
                          <div className="w-full h-1 bg-gray-300 mt-2"></div>
                          <span className="text-lg text-gray-900 font-bold mt-1">
                            {Listings.title}
                          </span>
                          <span className="text-sm text-emerald-600 mt-2">
                            $360
                          </span>
                          <div className="w-full h-full mt-4">
                            <span className="text-sm text-gray-600 text-ellipsis ">
                              {Listings.description}
                            </span>
                          </div>
                          <div className="w-full flex flex-row mt-2">
                            <div className="w-40 h-10 font-bold text-md text-gray-900 transition duration-300 ease-in-out hover:bg-emerald-500 shadow-solid-2 border border-gray-900 flex justify-center items-center cursor-pointer hover:shadow-solid-4">
                              <span className="mr-1">Buy Now</span>
                              <AiOutlineArrowRight />
                            </div>
                            <div className="w-20 h-10 text-md text-gray-900  transition duration-300 ease-in-out hover:bg-pink-500 shadow-solid-2 border border-gray-900 ml-2  flex justify-center items-center cursor-pointer hover:shadow-solid-4">
                              <span>{Listings.likes}</span>
                              <AiOutlineHeart />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </GridLayout>
            )}
          </SizeMe>
        </div>
      </div>
    </div>
  );
};

export default Likes;
