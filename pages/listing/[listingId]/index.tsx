import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { onPageLoad, NextPageWithLayout } from "../../../helpers";
import { useQuery } from "react-query";
import { getListing } from "../../../api";

const ListingPage: NextPageWithLayout = () => {

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
      await getListing(listingId as string)
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

  useEffect(()=>{
    setImgSrc(data?.image)
  }, [data])

  const [imgSrc, setImgSrc] = useState(data?.image);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-10 lg:px-10 xl:px-20 2xl:px-60 flex flex-row w-full h-full">
        <div className="w-2/3 inline-flex flex-row justify-center items-start">
          <div className="w-28 py-5 flex flex-col">
            {data && (
              <>
                <div
                  className="w-24 h-16 mb-4 rounded-lg bg-white"
                  onClick={() => setImgSrc(data.image)}
                >
                  <img src={data.image} className="w-fullch-full"></img>
                </div>
                {data.images &&
                  data.images.map((img: string) => (
                    <div className="w-24 h-16 mb-4 rounded-lg bg-white" onClick={()=>setImgSrc(img)}>
                      <img src={img} className="w-fullch-full"></img>
                    </div>
                  ))}
              </>
            )}
          </div>
          <div className="w-full p-5 pr-10 flex justfy-center items-center">
            {data && <img src={imgSrc} className="w-full rounded-lg" />}
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-start items-start">
          <div className=" rounded-lg w-full h-full p-5 flex flex-col">
            {data && <span className="text-5xl font-bold">{data.title}</span>}
            {data && (
              <span className="text-xl font-bold text-emerald-500 mt-5">
                ${data.price}
              </span>
            )}
            {data && <span className="text-md mt-10">{data.description}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

ListingPage.Layout = "listings";

export default ListingPage;
