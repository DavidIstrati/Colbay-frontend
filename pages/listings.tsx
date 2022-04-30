import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import type { NextPage } from "next";
import { Card, Navbar, PageSearch } from "../components";
import GridLayout from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { useState, useEffect } from "react";

import { onPageLoad, useAuth } from "../helpers";

const Lisitngs: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [layout, setLayout] = useState([
    {
      i: "add_new_listing",
      x: 0,
      y: 0,
      w: 3,
      h: 4,
      static: true,
    },
  ]);

  const [layoutData, setLayoutData] = useState([]);
  //   const { isLoading, error, data } = useQuery("listings", () =>
  //     getLikes(user?.userId).then((res) => {
  //       console.log(res)
  //       setLayout(
  //         res.data.map(({ Listings }, index) => ({
  //           i: Listings.listingId,
  //           x: 3 * (index % 5),
  //           y: 7 * ~~(index / 4),
  //           w: 3,
  //           h: 7,
  //           static: true,
  //         }))
  //       );
  //       console.log(res);
  //       return res.data;
  //     })
  //   );

  return (
    <div className="w-screen inline bg-slate-100 flex justify-center items-center -z-40 absolute font-spaceGrotesk bg-white">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="listings" />
        <div className="w-full p-40 pt-20 flex flex-col">
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
            <span className="bg-gradient px-4 py-2 text-white rounded-md cursor-pointer">
              + New Listing
            </span>
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
                margin={[40, 40]}
              >
                {layoutData &&
                  layoutData.map(
                    (
                      { listingId, title, price, description, likes, image },
                      index
                    ) => (
                      <div key={listingId}>
                        <Card
                          id={listingId}
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
              </GridLayout>
            )}
          </SizeMe>
        </div>
      </div>
    </div>
  );
};

export default Lisitngs;
