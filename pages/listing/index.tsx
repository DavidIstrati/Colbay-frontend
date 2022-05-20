import { useQuery } from "react-query";
import type { NextPage } from "next";
import {
  Card,
  CardProps,
  IntegrationGridLayout,
  Navbar,
  PageSearch,
} from "../../components";
import { useState, useEffect } from "react";

import { onPageLoad, useAuth } from "../../helpers";
import Link from "next/link";
import { getListings } from "../../api";

const Lisitngs: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [layout, setLayout] = useState([]);

  const { isLoading, isError, data } = useQuery(
    "listings",
    async () =>
      user &&
      (await getListings(user?.userId)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        })),
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
        <Navbar active="listings"  user={user}/>
        <div className="w-full px-40 pt-20 flex flex-col">
          <div className="w-full flex justify-center items-center">
            <span
              className="text-5xl font-bold"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="0"
            >
              Your Listings
            </span>
          </div>
          <div className="flex flex-col mt-10 justify-center items-center">
            <div
              className="w-1/3 h-14"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <PageSearch
                initialSearch={""}
                placeholder={"Search in listings"}
                onSubmit={(search: string) => ""}
              />
            </div>
          </div>
          <div className="my-10 w-full flex justify-center items-center">
            <Link href="/listing/create">
              <span
                className="bg-gradient px-4 py-2 text-white rounded-md cursor-pointer"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="800"
              >
                + New Listing
              </span>
            </Link>
          </div>
        </div>
        <IntegrationGridLayout
          layout={layout}
          isLoading={isLoading}
          isError={isError}
        >
          {layout.length !== 0 &&
            data &&
            data.map(
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

export default Lisitngs;
