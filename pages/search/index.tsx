import type { NextPage } from "next";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";

import { AiOutlineHeart, AiOutlineArrowRight } from "react-icons/ai";

import { Navbar } from "../../components";

import { searchListings, postLike } from "../../api";

import { useQuery } from "react-query";

import { useRouter } from "next/router";

import { useAuth } from "../../storage";

import useLocalStorage from "../../storage/useLocalStorage";

import AOS from "aos";
import "aos/dist/aos.css";

const Search: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { user, login, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, []);

  const { q } = router.query;

  const [search, setSearch] = useLocalStorage<string | string[]>(
    "query",
    q ? q : ""
  );

  useEffect(() => {
    setSearch(q ? q : "");
  }, [q]);

  const [layout, setLayout] = useState([]);

  const { isLoading, error, data } = useQuery(
    `searchListings_term_${"furniture"}`,
    () =>
      searchListings(undefined, "furniture").then((res) => {
        setLayout(
          res.data.map(({ listingId }, index) => ({
            i: listingId,
            x: 4 * (index % 3),
            y: 7 * ~~(index / 3),
            w: 4,
            h: 7,
            static: true,
          }))
        );
        console.log(res);
        return res.data;
      }),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return (
    <div className="w-screen inline bg-slate-100 flex justify-center items-center -z-40 absolute font-spaceGrotesk background-stars-opacity-50">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="home" />
        <div className="w-full inline-flex justify-center items-center px-40 mt-20">
          <div className="w-1/3 h-14 flex flex-row justify-start items-center border-2 border-gray-900 shadow-solid-4 rounded-l-md">
            <div
              className="w-14 h-14  bg-gradient-to-r from-blue-300 to-emerald-300 rounded-l-md"
              onClick={() => router.push(`/search?q=${search}`)}
            >
              <img
                src="LogoColbayTransparent.svg"
                className="w-full h-full border-2 border-gray-900 rounded-l-md"
              />
            </div>
            <input
              className="w-full h-full text-lg outline-none placeholder-slate-300 px-4"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full inline-flex flex-row px-40 mt-20">
          <div className="w-80 h-96 pr-2 flex flex-col sticky top-10">
            <span className="font-spaceGrotesk font-bold text-lg">Details</span>
            <div className="w-full h-full bg-white border-2 border-gray-900 shadow-solid-6 p-2 flex flex-col">
              <div className="w-full flex flex-col">
                <span className="text-sm font-bold">Category</span>
                <select className="px-2 py-1 w-2/3 mt-1 appearance-none rounded-none border border-gray-900 bg-white text-slate-400 outline-none text-xs">
                  <option value={"books"}>Choose Category</option>
                  <option value={"books"}>Books</option>
                  <option value={"books"}>Monitors</option>
                  <option value={"books"}>Lights</option>
                  <option value={"books"}>Furniture</option>
                  <option value={"books"}>Electronics</option>
                </select>
              </div>
              <div className="w-full flex flex-col mt-4">
                <span className="text-sm font-bold">Pirce</span>
                <select className="px-2 py-1 w-2/3 mt-1 appearance-none rounded-none border border-gray-900 bg-white text-slate-400 outline-none text-xs">
                  <option value={"books"}>{"<$200"}</option>
                  <option value={"books"}>Books</option>
                  <option value={"books"}>Monitors</option>
                  <option value={"books"}>Lights</option>
                  <option value={"books"}>Furniture</option>
                  <option value={"books"}>Electronics</option>
                </select>
              </div>
              <div className="w-full flex flex-col mt-4">
                <span className="text-sm font-bold">Date</span>
                <select className="px-2 py-1 w-2/3 mt-1 appearance-none rounded-none border border-gray-900 bg-white text-slate-400 outline-none text-xs">
                  <option value={"books"}>{"recent post"}</option>
                  <option value={"books"}>Books</option>
                  <option value={"books"}>Monitors</option>
                  <option value={"books"}>Lights</option>
                  <option value={"books"}>Furniture</option>
                  <option value={"books"}>Electronics</option>
                </select>
              </div>
              <div className="w-full flex flex-col mt-4">
                <span className="text-sm font-bold">Size</span>
                <select className="px-2 py-1 w-2/3 mt-1 appearance-none rounded-none border border-gray-900 bg-white text-slate-400 outline-none text-xs">
                  <option value={"books"}>{"<2m"}</option>
                  <option value={"books"}>Books</option>
                  <option value={"books"}>Monitors</option>
                  <option value={"books"}>Lights</option>
                  <option value={"books"}>Furniture</option>
                  <option value={"books"}>Electronics</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full inline-flex  pl-2 flex-col">
            <span className="font-spaceGrotesk font-bold text-lg">Results</span>
            <div className="w-full flex flex-row flex-wrap">
              <SizeMe>
                {({ size }) => (
                  <GridLayout
                    className="layout"
                    useCSSTransforms={true}
                    layout={layout}
                    cols={12}
                    rowHeight={50}
                    width={size.width}
                    containerPadding={[0, 0]}
                    margin={[15, 15]}
                  >
                    {data &&
                      data.map(
                        (
                          { listingId, title, price, description, likes, image },
                          index
                        ) => (
                          <div
                            key={listingId}
                            className="bg-white border-2 border-gray-900 p-4"
                          >
                            <div className="h-1/2 w-full flex justify-center ">
                              <img
                                src={`images/${image}`}
                                className="max-w-full max-h-full border-2 border-gray-900"
                              />
                            </div>
                            <div className="h-1/2 w-full flex flex-col">
                              <div className="w-full h-1 bg-gray-300 mt-2"></div>
                              <span className="text-lg text-gray-900 font-bold mt-1">
                                {title}
                              </span>
                              <span className="text-sm text-emerald-600 mt-2">
                                ${price}
                              </span>
                              <div className="w-full h-full mt-4">
                                <span className="text-sm text-gray-600 text-ellipsis ">
                                  {description}
                                </span>
                              </div>
                              <div className="w-full flex flex-row mt-2">
                                <div className="w-40 h-10 font-bold text-md text-gray-900 transition duration-300 ease-in-out hover:bg-emerald-500 shadow-solid-2 border border-gray-900 flex justify-center items-center cursor-pointer hover:shadow-solid-4">
                                  <span className="mr-1">Buy Now</span>
                                  <AiOutlineArrowRight />
                                </div>
                                <div
                                  className="w-20 h-10 text-md text-gray-900  transition duration-300 ease-in-out hover:bg-pink-500 shadow-solid-2 border border-gray-900 ml-2  flex justify-center items-center cursor-pointer hover:shadow-solid-4"
                                  onClick={() =>
                                    postLike({
                                      listingId: listingId,
                                      userId: user?.userId,
                                    }).then(() => alert("LIKED!"))
                                  }
                                >
                                  <span>{likes}</span>
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
      </div>
    </div>
  );
};

export default Search;
