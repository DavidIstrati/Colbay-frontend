import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { useEffect, DependencyList } from "react";

import "react-image-crop/dist/ReactCrop.css";
import { AiOutlineArrowLeft, AiOutlineEnter } from "react-icons/ai";
import NextButton from "../onboarding/button";

interface SingleImageInputProps {
  placeholder: string;
  label: string;
  setValueFromRoot: (value: any) => void;
  onBack?: () => void;
  onSubmit: (value: any) => void;
  initialValue: string;
}

interface MultipleImageInputProps {
  placeholder: string;
  label: string;
  onBack?: () => void;
  onSubmit: (value: any) => void;
  onUpload: (value: Blob) => void;
  initialValue: string;
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const SingleImageInput = ({
  placeholder,
  initialValue,
  label,
  setValueFromRoot,
  onBack,
  onSubmit,
}: SingleImageInputProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number>(3 / 2);
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        let tempImgPreview = await imgPreview(
          previewImg,
          imgRef.current,
          completedCrop,
          scale,
          rotate
        );

        setValueFromRoot(tempImgPreview);
        setPreviewImg(tempImgPreview);
      }
    },
    1000,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="flex flex-col">
      <span
        className={`text-lg whitespace-nowrap overflow-ellipsis  transition duration-500 ease-in-out
          opacity-100 text-slate-900`}
      ></span>
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className={`inline bg-slate-100  border rounded-lg shadow-md hover:shadow-lg
        border-slate-400
        outline-none px-5 py-3 shadow-solid-2 hover:shadow-solid-4  transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-3xl`}
        placeholder={placeholder}
      />
      <div className="flex flex-row mt-5 ">
        <div className="w-96 h-96 overflow-scroll">
          {Boolean(imgSrc) ? (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="rounded-lg"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                className="
                rounded-lg  border border-slate-200 shadow-md"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          ) : (
            <div className="w-full h-full rounded-lg bg-slate-200"></div>
          )}
          {Boolean(completedCrop) && (
            <canvas
              ref={previewCanvasRef}
              className="hidden absolute -z-50"
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop?.width,
                height: completedCrop?.height,
              }}
            />
          )}
        </div>
        <div className="flex flex-col ml-5">
          <div className="flex flex-row">
            <label
              htmlFor="scale-input"
              className="px-7 py-2 text-lg text-white bg-black font-bold rounded-l-lg"
            >
              Scale:{" "}
            </label>
            <input
              id="scale-input"
              type="number"
              className="px-7 py-2 text-lg text-black bg-slate-200 rounded-r-lg"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row mt-5">
            <label
              htmlFor="rotate-input"
              className="px-7 py-2 text-lg text-white bg-black font-bold rounded-l-lg"
            >
              Rotate:{" "}
            </label>
            <input
              id="rotate-input"
              type="number"
              className="px-7 py-2 text-lg text-black bg-slate-200 rounded-r-lg"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
          <div className="flex flex-col mt-10 items-stretch">
            <span
              className="px-10 py-2 select-none bg-black text-white text-xl rounded-lg flex justify-center items-center transtition duration-500 ease-in-out hover:shadow-lg cursor-pointer"
              onClick={() => onBack && onBack()}
            >
              <AiOutlineArrowLeft />
              <span>Back</span>
            </span>
            <div className="mt-5">
              <NextButton
                onClick={async () => {
                  let tempImgBlob = await getCropBlob(
                    imgRef.current,
                    completedCrop,
                    scale,
                    rotate
                  );
                  onSubmit(tempImgBlob);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultipleImageInput = ({
  placeholder,
  initialValue,
  label,
  onUpload,
  onBack,
  onSubmit,
}: MultipleImageInputProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number>(3 / 2);
  const [previewSrc, setPreviewSrc] = useState<string>();

  const [uploadedImages, setUploadedImages] = useState<Object>({});
  const [imageInputValue, setImageInputValue] = useState<string | null>();
  const [imageName, setImageName] = useState<string>("");

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImageInputValue(e.target.value);
      setImageName(e.target.files[0].name);
    }
  }

  function beautifyString(value: string): string {
    return value.length > 16
      ? `${value.substring(0, 5)}...${value.substring(
          value.length - 7,
          value.length
        )}`
      : value;
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="flex flex-col">
      <span
        className={`text-lg whitespace-nowrap overflow-ellipsis  transition duration-500 ease-in-out
          opacity-100 text-slate-900`}
      ></span>
      <input
        type="file"
        accept="image/*"
        value={imageInputValue}
        onChange={onSelectFile}
        className={`inline bg-slate-100  border rounded-lg shadow-md hover:shadow-lg
        border-slate-400
        outline-none px-5 py-3 shadow-solid-2 hover:shadow-solid-4  transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-3xl`}
        placeholder={placeholder}
      />
      <div className="flex flex-row mt-5 ">
        <div className="w-96 h-96 overflow-scroll">
          {Boolean(imgSrc) ? (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="rounded-lg"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                className="
                rounded-lg  border border-slate-200 shadow-md"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          ) : (
            <div className="w-full h-full rounded-lg bg-slate-200"></div>
          )}
          {Boolean(completedCrop) && (
            <canvas
              ref={previewCanvasRef}
              className="hidden absolute -z-50"
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop?.width,
                height: completedCrop?.height,
              }}
            />
          )}
        </div>
        <div className="flex flex-col ml-5">
          <div className="flex flex-row">
            <label
              htmlFor="scale-input"
              className="px-7 py-2 text-lg text-white bg-black font-bold rounded-l-lg"
            >
              Scale:{" "}
            </label>
            <input
              id="scale-input"
              type="number"
              className="px-7 py-2 text-lg text-black bg-slate-200 rounded-r-lg"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-row mt-5">
            <label
              htmlFor="rotate-input"
              className="px-7 py-2 text-lg text-white bg-black font-bold rounded-l-lg"
            >
              Rotate:{" "}
            </label>
            <input
              id="rotate-input"
              type="number"
              className="px-7 py-2 text-lg text-black bg-slate-200 rounded-r-lg"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>

          <span
            className="px-10 py-2 mt-5 select-none bg-black text-white text-xl rounded-lg flex justify-center items-center transtition duration-500 ease-in-out hover:shadow-lg cursor-pointer"
            onClick={async () => {
              setUploadedImages({
                ...uploadedImages,
                ...{
                  [beautifyString(imageName)]: "",
                },
              });
              let tempImgBlob = await getCropBlob(
                imgRef.current,
                completedCrop,
                scale,
                rotate
              );
              onUpload(tempImgBlob);
              setImgSrc("");
              setImageInputValue("");
            }}
          >
            <AiOutlineArrowLeft />
            <span>Upload</span>
          </span>
          <div className="flex flex-col mt-10 items-stretch">
            <span
              className="px-10 py-2 select-none bg-black text-white text-xl rounded-lg flex justify-center items-center transtition duration-500 ease-in-out hover:shadow-lg cursor-pointer"
              onClick={() => onBack && onBack()}
            >
              <AiOutlineArrowLeft />
              <span>Back</span>
            </span>
            <div className="mt-5">
              <NextButton onClick={() => onSubmit(uploadedImages)} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap">
        {Object.keys(uploadedImages).map((name) => (
          <span className="px-7 py-2 bg-orange-100 text-orange-500 border border-orange-500 rounded-md mr-2">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as []);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}

let previewUrl = "";

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve as BlobCallback);
  });
}

async function getCropBlob(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);
  return blob;
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
  previewImg: string | undefined,
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);
  if (previewImg) {
    URL.revokeObjectURL(previewImg);
  }
  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}

async function blobToBase64(blob: Blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

export { SingleImageInput, MultipleImageInput };
