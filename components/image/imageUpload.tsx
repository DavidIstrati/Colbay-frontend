import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { useEffect, DependencyList } from "react";

import "react-image-crop/dist/ReactCrop.css";

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

export default function ImageUpload({
  setImageFromRoot,
}: {
  setImageFromRoot: (v: string) => void;
}) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number>(3 / 2);
  const [previewSrc, setPreviewSrc] = useState<string>();

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
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
        setImageFromRoot(
          await imgPreview(imgRef.current, completedCrop, scale, rotate)
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div className="w-full h-full">
      <div className="Crop-Controls">
        <div className="flex">
          <div className="mb-3 w-96">
            <label
              htmlFor="formFile"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Please select an image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="
              appearance-none
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-slate-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="inline-flex flex-row border border-gray-300 mr-5">
            <label
              htmlFor="scale-input"
              className="px-2 py-1 text-sm text-black bg-slate-200 border-r border-gray-300 font-bold"
            >
              Scale:{" "}
            </label>
            <input
              id="scale-input"
              type="number"
              className="px-2 py-1 text-sm text-black bg-slate-200"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div className="inline-flex flex-row border border-gray-300">
            <label
              htmlFor="rotate-input"
              className="px-2 py-1 text-sm text-black bg-slate-200 border-r border-gray-300 font-bold"
            >
              Rotate:{" "}
            </label>
            <input
              id="rotate-input"
              type="number"
              className="px-2 py-1 text-sm text-black bg-slate-200"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row bg-slate-100 mt-10">
        <div className="w-full h-full p-10 rounded-lg flex flex-col">
          {Boolean(imgSrc) && (
            <span className="text-xl font-bold">Your Image</span>
          )}
          {Boolean(imgSrc) && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                className="max-w-full
                rounded-lg  border border-slate-200 shadow-md"
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
      </div>
      <div>
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            className="hidden"
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </div>
  );
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
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
    canvas.toBlob(resolve);
  });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
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

//   const base64blob = await blobToBase64(blob);
//   console.log(base64blob)
