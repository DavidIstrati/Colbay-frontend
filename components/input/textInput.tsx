import { useEffect, useState } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";

interface textInput {
  reactFormProps: any,
  placeholder: string,
  label: string,
  type: string
}

const TextInput = ({
  reactFormProps,
  placeholder,
  label,
  type
}: textInput): JSX.Element => {

  const [value, setValue] = useState("")

  return (
    <>
      <span
        className={`text-xs whitespace-nowrap overflow-ellipsis  transition duration-500 ease-in-out ${
          value.length == 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      <input
        className="w-full h-full bg-slate-100 border rounded-sm border-gray-900 outline-none p-2 shadow-solid-2 hover:shadow-solid-4  transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-sm"
        value={value}
        {...reactFormProps}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        type={type}
      ></input>
    </>
  );
};

const EmailInput = ({
  value,
  setValue,
  label,
  placeholder = "",
  required = false,
  length = [0, 100000],
  regex,
  rootError = "",
  setIsError = (value: boolean) => value,
}: textInput): JSX.Element => {
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setIsError(false)
    if (required && value.trim().length == 0) {
      setError("field is required");
      setIsError(true);
    }
    if (value.trim().length < length[0]) {
      setError(`min ${length[0]} characters`);
      setIsError(true);
    }
    if (value.trim().length > length[1]) {
      setError(`max ${length[1]} characters`);
      setIsError(true);
    }
  }, [value]);
  return (
    <>
      <span
        className={`text-xs transition duration-500 ease-in-out ${
          value.length == 0 ? "opacity-0" : "opacity-100"
        } ${error != "" && !focus ? "text-red-400" : "text-gray-300"}`}
      >
        {error != "" && !focus ? error : label}
      </span>
      <div className="w-full h-full bg-slate-100 border rounded-sm border-gray-900 shadow-solid-2 hover:shadow-solid-4  flex flex-row">
        <input
          className="w-full h-full  orounded-sm utline-none p-2 transition duration-500 ease-in-out placeholder-gray-900 placeholder-opacity-50 text-sm outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="email"
        ></input>
        <div className="w-10 h-full bg-orange-200 rounded-r-sm flex justify-center items-center">
          <AiOutlineInfoCircle />
        </div>
      </div>
    </>
  );
};

export { TextInput, EmailInput };
