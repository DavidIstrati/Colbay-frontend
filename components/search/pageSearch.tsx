import { Router } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineArrowRight,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { postLike } from "../../api";

interface pageSearch {
  initialSearch: string;
  required?: boolean;
  onSubmit: (v: string) => void;
  placeholder: string;
}

const PageSearch = ({
  initialSearch,
  required = false,
  onSubmit,
  placeholder,
}: pageSearch): JSX.Element => {
  const [search, setSearch] = useState("");
  const onSubmitFunction = (value: string) => onSubmit(value);

  interface FormInputs {
    value: string;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const onSubmitForm = (data: FormInputs) => {
    onSubmit(data.value);
  };

  const onEnter = (value: string) => {
    setValue("value", value, { shouldValidate: false });
    handleSubmit((data) => onSubmitForm(data))();
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      const data = event.target.value;
      onEnter(data);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row justify-start items-center transition duration-300 ease-in-out shadow-sm hover:shadow-md rounded-md ">
        <div
          className={`w-14 h-14 text-xl flex justify-center items-center bg-white border border-r-0 border-slate-300 text-slate-300 rounded-l-md transition duration-300 ease-in-out ${
            errors?.value
              ? "border-red-500 shadow-red-500/20"
              : "border-slate-300"
          }`}
          onClick={() => onSubmitFunction(search)}
        >
          <AiOutlineSearch />
        </div>
        <input
          className={`w-full h-full text-lg outline-none rounded-r-md bg-white placeholder-slate-300 px-4  border border-l-0 transition duration-300 ease-in-out
        ${
          errors?.value
            ? "border-red-500 shadow-red-500/20"
            : "border-slate-300"
        }`}
          {...register(
            "value",
            required
              ? {
                  required: "This is required.",
                  maxLength: {
                    value: 100,
                    message: "Woah! your search is too big",
                  },
                }
              : {
                  maxLength: {
                    value: 100,
                    message: "Woah! your search is too big",
                  },
                }
          )}
          onKeyDown={(event) => handleKeyDown(event)}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={placeholder}
          type={"text"}
        ></input>
      </div>
      <span className="text-red-500/30">{errors?.value?.message}</span>
    </div>
  );
};

export default PageSearch;
