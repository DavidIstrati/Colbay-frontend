import type { NextPage } from "next";
import { useState, useEffect } from "react";

import { PageSearch } from "../../components";

import { useRouter } from "next/router";

import { Navbar } from "../../components";

import { onPageLoad, useAuth } from "../../helpers";
import Link from "next/link";
import { useQuery } from "react-query";
import { getListing } from "../../api";

const ListingPage: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, false);
  }, []);

  type queryParameter = string | null;

  const router = useRouter();

  const { listingId }: { listingId: queryParameter } = router.query as {
    listingId: queryParameter;
  };

  const { isLoading, isError, data } = useQuery(
    `listing_${listingId}`,
    async () =>
      await getListing(listingId)
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

  console.log(data);

  return (
    <div className="w-screen h-screen  flex flex-col justify-center items-center -z-40 absolute font-spaceGrotesk bg-slate-100">
      <div className="w-full h-full flex flex-col">
        <Navbar active="listings" user={user} />
        <div className="py-10 lg:px-10 xl:px-20 2xl:px-60 flex flex-row w-full h-full">
          <div className="w-2/3 inline-flex flex-row justify-center items-start">
            <div className="w-28 py-5 flex flex-col">
              <div className="w-28 h-28 bg-black mb-4 rounded-lg"></div>
              <div className="w-28 h-28 bg-black mb-4 rounded-lg"></div>
              <div className="w-28 h-28 bg-black mb-4 rounded-lg"></div>
              <div className="w-28 h-28 bg-black mb-4 rounded-lg"></div>

            </div>
            <div className="w-full p-5 pr-10 flex justfy-center items-center">
              {data && <img src={data.image} className="w-full rounded-lg" />}
            </div>
          </div>
          <div className="w-1/3 flex flex-col justify-start items-start">
            <div className=" rounded-lg w-full h-full p-5 flex flex-col">
            {data && <span className="text-5xl font-bold">{data.title}</span>}
            {data && <span className="text-xl font-bold text-emerald-500 mt-5">${data.price}</span>}
            {data && <span className="text-md mt-10">{data.description}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
