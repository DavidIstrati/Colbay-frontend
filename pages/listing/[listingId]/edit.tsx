import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { onPageLoad, NextPageWithLayout } from "../../../helpers";
import { useQuery } from "react-query";
import { getListing } from "../../../api";
import { SimpleTextInput } from "../../../components";

const EditListingPage: NextPageWithLayout = () => {
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

  useEffect(() => {
    setImgSrc(data?.image);
  }, [data]);

  const [imgSrc, setImgSrc] = useState(data?.image);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="py-10 lg:px-10 xl:px-20 2xl:px-60 flex flex-row justify-center w-full h-screen">
        <div className="p-10 w-2/3 min-h-full bg-slate-50 rounded-lg shadow inline-flex flex-col items-start">
          <div className="">
            <span className="text-3xl font-bold">Edit Listing</span>
            <div className="w-8 h-1 bg-slate-900"></div>
          </div>
          <div className="w-full inline-flex flex-row justify-center items-start">
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
                      <div
                        className="w-24 h-16 mb-4 rounded-lg bg-white"
                        onClick={() => setImgSrc(img)}
                      >
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
          <div className="mt-10">
            <SimpleTextInput value={data?.title} label={"Title"} />
            <SimpleTextInput
              value={data?.price}
              label={"Price"}
              type={"number"}
            />
            <SimpleTextInput
              value={data?.description}
              label={"Description"}
              type={"textarea"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

EditListingPage.Layout = "listings";

export default EditListingPage;
