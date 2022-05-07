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

import { onPageLoad, useAuth } from "../helpers";

import { getLikes } from "../api";

const Likes: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [layout, setLayout] = useState([]);

  const { isLoading, error, data } = useQuery("likes", () =>
    getLikes(user?.userId).then((res) => {
      console.log(res);
      setLayout(
        res.data.map(({ Listings }, index) => ({
          i: Listings.listingId,
          x: 3 * (index % 4),
          y: 4 * ~~(index / 4),
          w: 3,
          h: 4,
          static: true,
        }))
      );
      console.log(res);
      return res.data;
    })
  );

  return (
    <div className="w-screen inline bg-slate-100 flex justify-center items-center -z-40 absolute font-spaceGrotesk bg-white">
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
              className="w-1/3 h-14"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <PageSearch
                initialSearch={""}
                placeholder={"Search in likes"}
                onSubmit={(search: string) => ""}
              />
            </div>
          </div>
          <IntegrationGridLayout layout={layout} isLoading={isLoading}>
            {data &&
              data.map(
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
                }) => (
                  <div key={listingId}>
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
  );
};

export default Likes;
