import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import type { NextPage } from "next";
import {
  Card,
  CardProps,
  IntegrationGridLayout,
  Navbar,
  PageSearch,
} from "../components";
import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { useState, useEffect } from "react";

import { NextPageWithLayout, onPageLoad, useAuth } from "../helpers";

import { getLikes } from "../api";

const Likes: NextPageWithLayout = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [layout, setLayout] = useState([]);

  interface data {
    data: any;
    status: number;
  }

  const { isLoading, isError, data } = useQuery(
    "likes",
    async () =>
      user &&
      (await getLikes(user)
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
        data.map(({ Listings }: { Listings: CardProps }, index: number) => ({
          i: Listings.listingId,
          x: 3 * (index % 4),
          y: 4 * ~~(index / 4),
          w: 3,
          h: 4,
          static: true,
        }))
      );
  }, [data]);

  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full px-40 pt-20 flex flex-col">
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
            className="w-1/3 h-14"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            <PageSearch
              initialSearch={""}
              placeholder={"Search in likes"}
              onSubmit={(search: string) =>
                setSearch(search.toLocaleLowerCase())
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <IntegrationGridLayout isLoading={isLoading} isError={isError}>
          {layout.length !== 0 &&
            data &&
            data
              .filter(
                ({
                  Listings: {
                    listingId,
                    title,
                    price,
                    description,
                    likes,
                    image,
                  },
                }: {
                  Listings: CardProps;
                }) => title.toLowerCase().startsWith(search)
              )
              .map(
                (
                  {
                    Listings: {
                      listingId,
                      title,
                      price,
                      description,
                      likes,
                      image,
                    },
                  }: {
                    Listings: CardProps;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    data-grid={{
                      x: 3 * (index % 4),
                      y: 4 * ~~(index / 4),
                      w: 3,
                      h: 4,
                      static: true,
                    }}
                  >
                    <Card
                      listingId={listingId}
                      title={title}
                      price={price}
                      description={description}
                      likes={likes}
                      image={image}
                      index={index}
                      userId={user as string}
                    />
                  </div>
                )
              )}
        </IntegrationGridLayout>
      </div>
    </div>
  );
};

Likes.Layout = "likes";

export default Likes;
