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
    <div className="w-full h-full flex flex-row justify-start items-center transition duration-300 ease-in-out shadow-sm hover:shadow-md rounded-md ">
      <div
        className="w-14 h-14 text-xl flex justify-center items-center bg-white border border-r-0 border-slate-300 text-slate-300 rounded-l-md"
        onClick={() => onSubmitFunction(search)}
      >
        <AiOutlineSearch />
      </div>
      <input
        className="w-full h-full text-lg outline-none rounded-r-md bg-white placeholder-slate-300 px-4  border border-l-0 border-slate-300"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default PageSearch;
