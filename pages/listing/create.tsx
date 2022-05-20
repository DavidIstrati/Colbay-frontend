import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Navbar,
  PreviewCard,
  ImageUpload,
  ListingForm,
  ListingInputs,
} from "../../components";
import { onPageLoad, useAuth } from "../../helpers";

const CreateLisitng: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    onPageLoad(true, true, user);
  }, []);

  const [page, setPage] = useState<string>("details");

  const defaultTitle = "Your Title";
  const defaultDescription =
    "This the description of the product. Mention the size, color, age, etc";
  const defaultPrice = "50";

  const [title, setTitle] = useState(defaultTitle);
  const [description, setDesctiption] = useState(defaultDescription);
  const [price, setPrice] = useState(defaultPrice);
  const [image, setImage] = useState("");

  const onSubmit = (data: ListingInputs) => {
    setPage("main image");
  };

  return (
    <div className="w-screen flex justify-center items-center -z-40 absolute font-spaceGrotesk bg-slate-100">
      <div className="w-full min-h-screen flex flex-col">
        <Navbar active="listings" user={user} />
        <div className="w-screen h-screen flex lg:px-10 xl:px-20 2xl:px-60 py-10">
          <div className="w-full h-full bg-white shadow flex p-10">
            <div className="w-full h-full flex flex-row">
              <div className="w-1/2 h-full p-2 overflow-hidden">
                <div>
                  <span className="text-2xl font-bold">Add Listing</span>
                </div>
                <div className="flex w-full mt-4">
                  {["Details", "Main Image", "Other Images"].map(
                    (pageTitle, index) => (
                      <div
                        key={index}
                        className={`px-10 py-2 ${
                          pageTitle.toLocaleLowerCase() === page
                            ? "bg-gradient text-white rounded-md cursor-pointer"
                            : "bg-slate-200 text-slate-400"
                        } rounded-md mr-2 flex justify-center items-center`}
                      >
                        <span className="text-xs">{pageTitle}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="w-full h-1 bg-slate-100 mt-4"></div>
                {page === "details" && (
                  <ListingForm
                    {...{
                      defaultPrice,
                      defaultDescription,
                      defaultTitle,
                      setPrice,
                      setTitle,
                      setDesctiption,
                      onSubmit,
                    }}
                  />
                )}
                {page === "main image" && (
                  <div className="mt-10 h-full overflow-scroll">
                    <ImageUpload setImageFromRoot={setImage} />
                  </div>
                )}
              </div>
              <div className="w-1/2 h-full flex flex-col justify-center items-center border border-slate-300 bg-slate-100">
                <span className="text-xl fotn-bold">Preview</span>
                <div className="mt-10">
                  <PreviewCard
                    listingId={"preview"}
                    image={image}
                    title={title}
                    price={price}
                    description={description}
                    likes={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLisitng;
