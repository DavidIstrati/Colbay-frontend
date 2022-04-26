import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {

  return (
   <div className="w-screen h-screen absolute flex flex-col">
     <Link href="/signup" >signup</Link>
     <Link href="/login" >login</Link>
     <Link href="/search" >home</Link>
   </div>
  );
};

export default Home;
