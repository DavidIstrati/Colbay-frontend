import { useQuery } from "react-query";
import type { NextPage } from "next";
import {
  Card,
  CardProps,
  FirstPagePagination,
  GeneralPagePagination,
  IntegrationGridLayout,
  LastPagePagination,
  Navbar,
  PageSearch,
} from "../../components";
import { useState, useEffect } from "react";

import { NextPageWithLayout, onPageLoad, useAuth } from "../../helpers";
import Link from "next/link";
import { getListings } from "../../api";
import {
  updateLayout,
  checkFinalPage,
  LayoutEntity,
} from "../../helpers/dataProcessing";

const Lisitngs: NextPageWithLayout = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [layout, setLayout] = useState<LayoutEntity[]>([]);

  const [page, setPage] = useState(1);

  const [isFinalPage, setIsFinalPage] = useState<boolean>(false);

  const { isLoading, isError, data } = useQuery(
    `listings_p${page}`,
    async () =>
      user &&
      ((await getListings(page, user)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        })) as CardProps[]),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (data) {
      setIsFinalPage(checkFinalPage(data));
      setLayout(updateLayout(data.slice(0, 20)));
    }
  }, [data]);

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
        {layout.length !== 0 && data ? (
          data.map(
            (
              { listingId, title, price, description, image }: CardProps,
              index: number
            ) => (
              <div key={listingId} className="w-full h-full">
                <Card
                  listingId={listingId}
                  title={title}
                  price={price}
                  description={description}
                  image={image}
                  index={index}
                  userId={user as string}
                  isAdmin={true}
                />
              </div>
            )
          )
        ) : (
          <></>
        )}
      </IntegrationGridLayout>
      <div className="lg:px-10 xl:px-20 2xl:px-60 py-10 flex flex-row">
        {page === 1 ? (
          <FirstPagePagination isFinalPage={isFinalPage} />
        ) : isFinalPage ? (
          <LastPagePagination page={page} />
        ) : (
          <GeneralPagePagination page={page} />
        )}
      </div>
    </div>
  );
};

Lisitngs.Layout = "listings";

export default Lisitngs;
