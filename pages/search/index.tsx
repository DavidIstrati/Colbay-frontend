import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";

import {
  CardProps,
  Card,
  IntegrationGridLayout,
  Navbar,
} from "../../components";

import { searchListings } from "../../api";

import { useQuery } from "react-query";

import { useRouter } from "next/router";

import { useAuth, useLocalStorage } from "../../helpers";

import AOS from "aos";

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
    `searchListings_term_${q}`,
    () =>
      searchListings(undefined, "furniture").then((res) => {
        setLayout(
          res.data.map(
            ({ listingId }: { listingId: string }, index: number) => ({
              i: listingId,
              x: 3 * (index % 4),
              y: 4 * ~~(index / 4),
              w: 3,
              h: 4,
              static: true,
            })
          )
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
    <div className="w-screen inline-flex bg-slate-100 justify-center items-center -z-40 absolute font-spaceGrotesk">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="home" />
        <div className="w-screen flex flex-row items-stretch lg:px-10 xl:px-20 2xl:px-60 py-4 bg-white z-1 shadow">
          <div className="w-1/2 h-14 flex flex-row justify-start items-center rounded-l-md border border-slate-200 bg-indigo-500 rounded-lg">
            <div
              className="w-14 h-14  text-xl flex justify-center items-center rounded-l-lg text-white "
              onClick={() => router.push(`/search?q=${search}`)}
            >
              <AiOutlineSearch />
            </div>
            <input
              className="w-full h-full text-lg outline-none shadow-inner bg-slate-50 rounded-r-md placeholder-slate-300 px-4"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-1/2 flex flex-row">
            <div className="px-2 pl-4 h-full flex flex-col">
              <select className=" px-5 w-60 py-2 h-full bg-slate-50 appearance-none border border-slate-200 text-slate-500">
                <option value="" disabled selected>
                  Category
                </option>
                <option>Books</option>
              </select>
            </div>
            <div className="px-2 h-14 flex flex-col">
              <select className="px-5 w-60 py-2 h-full bg-slate-50 appearance-none border border-slate-200 text-slate-500">
                <option>Price Range</option>
                <option>{"<$200"}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full inline-flex flex-row lg:px-10 xl:px-20 2xl:px-60 mt-20">
          <div className="w-full inline-flex  pl-2 flex-col">
            <span className="font-spaceGrotesk font-bold text-lg">Results</span>
            <div className="w-full flex flex-row flex-wrap">
              <IntegrationGridLayout layout={layout} isLoading={isLoading}>
                {layout.length !== 0 &&
                  data &&
                  data.map(
                    ({
                      listingId,
                      title,
                      price,
                      description,
                      likes,
                      image,
                    }: CardProps) => (
                      <div key={listingId} className="w-full h-full">
                        <Card
                          listingId={listingId}
                          title={title}
                          price={price}
                          description={description}
                          likes={likes}
                          image={image}
                          userId={user?.userId}
                        />
                      </div>
                    )
                  )}
              </IntegrationGridLayout>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
