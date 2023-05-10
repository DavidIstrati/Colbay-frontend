import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { postListing, postUser } from "../../api";
import {
  CreateListing,
  Listing,
  patchListing,
  patchMainImageListing,
  patchSecondaryImageListing,
} from "../../api/listing";
import {
  LandingPage,
  InputPage,
  SingleImagePage,
  AnimatedProgressBar,
  ANIMATION_DURATION,
  PreviewCard,
  ImageUpload,
  MultipleImagePage,
} from "../../components";
import { useAuth } from "../../helpers";

const CreateLisitng: NextPage = () => {
  const [page, setPage] = useState<number>(1);

  const { user, login, logout } = useAuth();

  const changePage = async (page: number) => {
    await new Promise((r) => setTimeout(r, ANIMATION_DURATION));
    setPage(page);
  };

  const [listingObject, setListingObject] = useState<Listing | null>(null);

  const commitImage = async (imgBolb: Blob, main: boolean) => {
    let listingData = new FormData();
    listingData.append("image", imgBolb);
    listingData.append(
      "listingId",
      listingObject ? listingObject.listingId : ""
    );
    try {
      const newListingObject = main
        ? await patchMainImageListing(listingData, user as string)
        : await patchSecondaryImageListing(listingData, user as string);
      setListingObject(newListingObject.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const commitProductInfo = async () => {
    if (user) {
      if (listingObject) {
        let isNotPatchable =
          title === listingObject.title &&
          description === listingObject.description &&
          price === listingObject.price;
        if (!isNotPatchable) {
          const newListingObject = await patchListing(
            {
              listingId: listingObject.listingId,
              title: title === listingObject.title ? null : title,
              description:
                description === listingObject.description ? null : description,
              price: price === listingObject.price ? null : price,
            },
            user
          );
          setListingObject(newListingObject.data);
        }
      } else {
        try {
          let keywords = "";
          let category = "";
          const newListingObject = await postListing(
            {
              title,
              price,
              description,
              keywords,
              category,
            },
            user as string
          );
          setListingObject(newListingObject.data);
        } catch {
          throw Error("200");
        }
      }
    }
  };

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<Blob>();
  const [tempThumbnail, setTempThumbnail] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [showPreview, setShowPreview] = useState<boolean>(false);

  const titles = {
    landingPage: (
      <>
        <TitlePage>
          <span>{"Let's add"}</span>
        </TitlePage>
        <TitlePage>
          <span>a listing!</span>
        </TitlePage>
      </>
    ),
    title: (
      <>
        <TitlePage>
          <span>What are</span>
        </TitlePage>
        <TitlePage>
          <span>you selling?</span>
        </TitlePage>
      </>
    ),
    price: (
      <>
        <TitlePage>
          <span>Choose a price</span>
        </TitlePage>
      </>
    ),
    description: (
      <>
        <TitlePage>
          <span>Describe your</span>
        </TitlePage>
        <TitlePage>
          <span>product</span>
        </TitlePage>
      </>
    ),
    mainImageLanding: (
      <>
        <TitlePage>
          <span>{"Now let's choose"}</span>
        </TitlePage>
        <TitlePage>
          <span>the Main Image</span>
        </TitlePage>
      </>
    ),
    mainImageSelect: <></>,
    otherImagesLanding: (
      <>
        <TitlePage>
          <span>You can add some</span>
        </TitlePage>
        <TitlePage>
          <span>additional images :D</span>
        </TitlePage>
      </>
    ),
    otherImagesSelect: <></>,
    publish: (
      <>
        <TitlePage>
          <span>Good Job!</span>
        </TitlePage>
        <TitlePage>
          <span>Let's publish your Post</span>
        </TitlePage>
      </>
    ),
  };

  const onSubmit = () => {
    // postUser({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // })
    //   .then((resp: any) => {
    //     login({
    //       firstName: resp.data.firstName,
    //       lastName: resp.data.lastName,
    //       email: resp.data.email,
    //       userId: resp.data.userId,
    //       institution: resp.data.institution,
    //       graduationYear: resp.data.graduationYear,
    //       verifiedEmail: resp.data.verifiedEmail,
    //     });
    //     Router.push("/search");
    //   })
    //   .catch((e) => alert(e));
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 relative">
      <div className="absolute top-0 w-screen h-28 flex flex-row">
        <div className="w-1/3 h-full flex justify-center items-center py-10">
          <div
            className="w-2/3 py-4 flex flex-col justify-center items-center bg-slate-100 shadow-md border border-slate-200 rounded-md relative"
            onClick={() => setPage(1)}
          >
            Product Info
            <div className="w-full bg-slate-200 flex h-1 absolute bottom-0 ">
              {page >= 5 ? (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={100}
                  widthEnd={100}
                />
              ) : (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={((page - 2) / 4) * 100}
                  widthEnd={((page - 1) / 4) * 100}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center py-10">
          <div
            className="w-2/3 py-4 flex flex-col justify-center items-center bg-slate-100 shadow-md border border-slate-200 rounded-md relative z-20"
            onClick={() => setPage(5)}
          >
            Main Image
            <div className="w-full bg-slate-200 flex h-1 absolute bottom-0 ">
              {page >= 7 ? (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={100}
                  widthEnd={100}
                />
              ) : page <= 5 ? (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={0}
                  widthEnd={0}
                />
              ) : (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={0}
                  widthEnd={50}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center py-10">
          <div className="w-2/3 py-4 flex flex-col justify-center items-center bg-slate-100 shadow-md border border-slate-200 rounded-md relative">
            Other Images
            <div className="w-full bg-slate-200 flex h-1 absolute bottom-0 ">
              {page >= 9 ? (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={100}
                  widthEnd={100}
                />
              ) : page <= 7 ? (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={0}
                  widthEnd={0}
                />
              ) : (
                <AnimatedProgressBar
                  animationDuration={ANIMATION_DURATION}
                  widthStart={0}
                  widthEnd={50}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {page === 9 && (
        <LandingPage
          onClick={async () =>
            Router.push(`/listing/${listingObject?.listingId}`)
          }
          title={titles["publish"]}
        />
      )}
      {page === 8 && (
        <MultipleImagePage
          onClick={async () => changePage(9)}
          pageBack={async () => changePage(7)}
          title={titles["otherImagesSelect"]}
          onSubmitToRoot={async (value: Blob) => {
            await commitImage(value, false);
          }}
        />
      )}
      {page === 7 && (
        <LandingPage
          onClick={async () => changePage(8)}
          title={titles["otherImagesLanding"]}
        />
      )}
      {page === 6 && (
        <SingleImagePage
          onClick={async () => {
            changePage(7);
          }}
          pageBack={async () => changePage(5)}
          title={titles["mainImageSelect"]}
          setValueFromRoot={(value: string) => setTempThumbnail(value)}
          onSubmitToRoot={async (value: Blob) => {
            setThumbnail(value);
            await commitImage(value, true);
          }}
        />
      )}
      {page === 5 && (
        <LandingPage
          onClick={async () => changePage(6)}
          title={titles["mainImageLanding"]}
        />
      )}
      {page === 4 && (
        <InputPage
          onClick={async () => {
            changePage(5);
            await commitProductInfo();
          }}
          pageBack={async () => changePage(3)}
          initialValue={description}
          reactHookFormBI={{
            required: "This is required.",
            minLength: {
              value: 30,
              message: "This input is too small.",
            },
            maxLength: {
              value: 1000,
              message: "This input exceed maxLength.",
            },
          }}
          setValueFromRoot={(value) => setDescription(value)}
          title={titles["description"]}
          placeholder={"Description"}
          label={"Description"}
        />
      )}
      {page === 3 && (
        <InputPage
          onClick={async () => {
            changePage(4);
          }}
          pageBack={async () => changePage(2)}
          initialValue={price}
          reactHookFormBI={{
            required: "This is required.",
            valueAsNumber: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Please enter a number",
            },
          }}
          setValueFromRoot={(value) => setPrice(value)}
          title={titles["price"]}
          placeholder={"Price"}
          label={"Price"}
          type={"number"}
        />
      )}
      {page === 2 && (
        <InputPage
          onClick={async () => {
            changePage(3);
          }}
          pageBack={async () => changePage(1)}
          initialValue={title}
          reactHookFormBI={{
            required: "This is required.",
            minLength: {
              value: 5,
              message: "This input is too small.",
            },
            maxLength: {
              value: 100,
              message: "This input exceed maxLength.",
            },
          }}
          setValueFromRoot={(value) => {
            setTitle(value);
          }}
          title={titles["title"]}
          placeholder={"Title"}
          label={"Title"}
        />
      )}
      {page === 1 && (
        <LandingPage
          onClick={async () => {
            changePage(2);
          }}
          title={titles["landingPage"]}
        />
      )}
      <div
        className={`w-96 h-96 bg-slate-100 border-8 rounded-lg border-white absolute top-28 right-10 transition duration-500 ease-in-out shadow ${
          showPreview && page != 1
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        } `}
      >
        <div className="w-full h-full relative flex justify-center items-center">
          <PreviewCard
            listingId={"preview"}
            image={tempThumbnail}
            title={title}
            price={price}
            description={description}
            likes={0}
          />
        </div>
      </div>
      <span
        className={`h-10 px-6 flex flex-row items-center justify-center rounded-lg bg-white shadow-lg border border-slate-200 absolute top-24 right-4 z-50   transition duration-500 ease-in-out${
          page != 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
        onClick={() => setShowPreview(!showPreview)}
      >
        <span className="mr-2">Preview</span>
        <AiOutlineArrowLeft
          className={`transition duration-500 ease-in-out ${
            showPreview ? "rotate-180" : "rotate-0"
          }`}
        />
      </span>
    </div>
  );
};

const TitlePage = ({ children }: { children: React.ReactNode }) => {
  return <span className="xl:text-5xl 2xl:text-7xl font-bold">{children}</span>;
};

export default CreateLisitng;
