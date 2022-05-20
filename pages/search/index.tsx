import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

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

import { useAuth } from "../../helpers";

import AOS from "aos";

type queryParameter = string | undefined;

const Search: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { user, login, logout } = useAuth();

  const router = useRouter();

  const { q, category }: { q: queryParameter; category: queryParameter } =
    router.query as { q: queryParameter; category: queryParameter };

  const [search, setSearch] = useState<queryParameter>(q);

  const [searchQuery, setSearchQuery] = useState<queryParameter>(q);

  const [categoryQuery, setCategoryQuery] = useState<queryParameter>(category);

  useEffect(() => {
    setCategoryQuery(category);
  }, [category]);

  useEffect(() => {
    setSearchQuery(q);
    setSearch(q);
  }, [q]);

  const shallowQueryChange = (q: queryParameter, category: queryParameter) => {
    let url = `/search/?`;
    if (q) url += `q=${q}`;
    if (category) url += `&category=${category}`;
    router.push(
      {
        pathname: `/search`,
        query: {
          q,
          category,
        },
      },
      url,
      { shallow: true }
    );
  };

  const [layout, setLayout] = useState([]);

  const { isLoading, isError, data } = useQuery(
    `searchListings?q=${searchQuery}&category=${categoryQuery}`,
    async () =>
      await searchListings(searchQuery, categoryQuery)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        }),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => {
    data &&
      setLayout(
        data.map(({ listingId }: { listingId: string }, index: number) => ({
          i: listingId,
          x: 3 * (index % 4),
          y: 4 * ~~(index / 4),
          w: 3,
          h: 4,
          static: true,
        }))
      );
  }, [data]);

  return (
    <div className="w-screen inline-flex bg-slate-100 justify-center items-center -z-40 absolute font-spaceGrotesk">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="home" user={user} />
        <div className="w-screen flex flex-row items-stretch lg:px-10 xl:px-20 2xl:px-60 py-4 bg-white z-1 shadow">
          <div className="w-1/2 h-14 flex flex-row justify-start items-center rounded-l-md border border-slate-200 bg-indigo-500 rounded-lg">
            <div
              className="w-14 h-14  text-xl flex justify-center items-center rounded-l-lg text-white "
              onClick={() => {
                setSearchQuery(search);
                shallowQueryChange(search, category);
              }}
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
              <select
                className=" px-5 w-60 py-2 h-full bg-slate-50 appearance-none border border-slate-200 text-slate-500"
                value={categoryQuery}
                onChange={(e) => {
                  setSearchQuery(search);
                  setCategoryQuery(e.target.value);
                  shallowQueryChange(searchQuery, e.target.value);
                }}
              >
                <option value={undefined} disabled selected>
                  Category
                </option>
                <option value={"books"}>Books</option>
                <option value={"monitors"}>Monitors</option>
                <option value={"furniture"}>Furniture</option>
                <option value={"electronics"}>Electronics</option>
                <option value={"lights"}>Lights</option>
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
        <div className="w-full inline-flex flex-row lg:px-10 xl:px-20 2xl:px-60 mt-20"></div>

        <IntegrationGridLayout
          layout={layout}
          isLoading={isLoading}
          isError={isError}
        >
          {layout.length !== 0 &&
            data?.map(
              (
                {
                  listingId,
                  title,
                  price,
                  description,
                  likes,
                  image,
                }: CardProps,
                index: number
              ) => (
                <div key={listingId} className="w-full h-full">
                  <Card
                    listingId={listingId}
                    title={title}
                    price={price}
                    description={description}
                    likes={likes}
                    image={image}
                    index={index}
                    userId={user?.userId}
                  />
                </div>
              )
            )}
        </IntegrationGridLayout>
      </div>
    </div>
  );
};

export default Search;
