import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "../helpers";

const IndexHome: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(()=>{
    if(user){
      Router.push("/search")

    }else{
      Router.push("/login")
    }
  }, [])
  return (
    <div className="w-screen h-screen absolute flex flex-row items-center justify-center bg-slate-100">
      <svg className="animate-spin h-10 w-10 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
};

export default IndexHome;
