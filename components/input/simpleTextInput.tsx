import { useState } from "react";
import { AiOutlineTags } from "react-icons/ai";
import { RiLockLine, RiLockUnlockLine } from "react-icons/ri";

const SimpleTextInput = ({
  value,
  label,
  type = "text",
}: {
  value: string;
  label: string;
  type?: string;
}) => {
  const [locked, setLocked] = useState(true);
  return (
    <div className="mt-5">
      {type != "textarea" ? (
        <div className="flex flex-row justify-start items-stretch">
          <span className="px-4 py-2 bg-slate-200 rounded-l-md flex justify-center items-center border-r border-slate-400">
            {label}
          </span>
          <input
            value={value}
            className={`px-4 py-2 bg-slate-200 ${
              locked ? "text-slate-500" : "text-slate-900"
            }`}
            readOnly={locked}
            type={type}
          ></input>
          <span
            className="px-4 py-2 bg-slate-200  rounded-r-md flex justify-center items-center border-l border-slate-400"
            onClick={() => setLocked(!locked)}
          >
            {locked ? <RiLockLine /> : <RiLockUnlockLine />}
          </span>
        </div>
      ) : (
        <div className="bg-slate-200 flex flex-col items-stretch rounded-md">
          <div className="flex flex-row justify-between items-stretch border border-slate-400 rounded-t-md">
            <span className="px-4 py-2 bg-slate-200 rounded-l-md flex justify-center items-center">
              {label}
            </span>
            <span
              className="px-4 py-2 bg-slate-200  rounded-r-md flex justify-center items-center border-l border-slate-400"
              onClick={() => setLocked(!locked)}
            >
              {locked ? <RiLockLine /> : <RiLockUnlockLine />}
            </span>
          </div>
          <input
            value={value}
            className={`px-4 py-2 bg-slate-200 rounded-md outline-none ${
              locked ? "text-slate-500" : "text-slate-900"
            }`}
            readOnly={locked}
            type={type}
          ></input>
        </div>
      )}
    </div>
  );
};

export default SimpleTextInput;
