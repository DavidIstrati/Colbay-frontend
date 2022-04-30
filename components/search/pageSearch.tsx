import { Router } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { postLike } from "../../api";

interface pageSearch {
  initialSearch: string;
  onSubmit: (v: string) => void;
  placeholder: string;
}

const PageSearch = ({ initialSearch, onSubmit, placeholder }: pageSearch): JSX.Element => {
  const [search, setSearch] = useState("");
  const onSubmitFunction = (value: string) => onSubmit(value);

  return (
    <div className="w-full h-full flex flex-row justify-start items-center border border-gray-900 transition duration-300 ease-in-out shadow-md hover:shadow-lg rounded-md ">
      <div
        className="w-14 h-14 text-xl flex justify-center items-center text-black rounded-l-md  rounded-l-md"
        onClick={() => onSubmitFunction(search)}
      >
        <AiOutlineSearch />
      </div>
      <input
        className="w-full h-full text-lg outline-none rounded-md placeholder-slate-300 px-4"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default PageSearch;
