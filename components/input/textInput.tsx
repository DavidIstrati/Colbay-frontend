import { useEffect, useRef, useState } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";

interface textInput {
  reactFormProps: any;
  placeholder: string;
  label: string;
  type: string;
  setValueFromRoot?: (value: string) => void;
}

const TextInput = ({
  reactFormProps,
  placeholder,
  label,
  type,
  setValueFromRoot,
}: textInput): JSX.Element => {
  const [value, setValue] = useState("");

  const className =
    "inline bg-slate-100 border rounded-sm border-gray-900 outline-none p-2 shadow-solid-2 hover:shadow-solid-4  transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-sm";

  return (
    <div className="flex flex-col">
      <span
        className={`text-xs whitespace-nowrap overflow-ellipsis  transition duration-500 ease-in-out ${
          value.length == 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          className={className + " h-40"}
          {...reactFormProps}
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            setValueFromRoot && setValueFromRoot(e.target.value);
          }}
          placeholder={placeholder}
          type={type}
        ></textarea>
      ) : (
        <input
          className={className}
          {...reactFormProps}
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
            setValueFromRoot && setValueFromRoot(e.target.value);
          }}
          placeholder={placeholder}
          type={type}
        ></input>
      )}
    </div>
  );
};

interface OnboardingTextInput extends textInput {
  errors: string | undefined;
  initialValue: string;
  onEnter: (data: string) => void;
}

const OnboardingTextInput = ({
  reactFormProps,
  placeholder,
  initialValue,
  label,
  type,
  setValueFromRoot,
  onEnter,
  errors,
}: OnboardingTextInput): JSX.Element => {
  const [value, setValue] = useState(initialValue);
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      const data = event.target.value
      onEnter(data);
    }
  };
  
  return (
    <div className="flex flex-col">
      <span
        className={`text-lg whitespace-nowrap overflow-ellipsis  transition duration-500 ease-in-out ${
          value.length == 0 ? "opacity-0" : "opacity-100"
        } ${errors ? "text-red-500 opacity-100" : "tet-slate-900"}`}
      >
        {errors ? errors : label}
      </span>

      <input
        className={`inline bg-slate-100  border rounded-lg shadow-md hover:shadow-lg ${
          errors ? "border-red-500 shadow-red-500/20" : "border-slate-400"
        } outline-none px-5 py-3 shadow-solid-2 hover:shadow-solid-4  transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-3xl`}
        {...reactFormProps}
        value={value}
        onKeyDown={(event) => handleKeyDown(event)}
        onChange={(e: any) => {
          setValue(e.target.value);
          setValueFromRoot && setValueFromRoot(e.target.value);
        }}
        placeholder={placeholder}
        type={type}
      ></input>
    </div>
  );
};

export { TextInput, OnboardingTextInput };
