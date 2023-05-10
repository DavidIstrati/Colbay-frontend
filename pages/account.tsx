import { useEffect, useState } from "react";
import { NextPageWithLayout, onPageLoad, useAuth } from "../helpers";
import { TextInput } from "../components";
import { AiOutlineLogout, AiOutlineSave, AiOutlineUserDelete } from "react-icons/ai";
import Router from "next/router";

const Account: NextPageWithLayout = () => {
  const { user, login, logout } = useAuth();
  useEffect(() => {
    onPageLoad(true, false);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col lg:px-10 xl:px-20 2xl:px-60">
      <div className="mt-20">
        <div className="w-full h-1 flex bg-slate-200 mb-5"></div>
        <span className="text-xl font-bold">User Details</span>
        <UserField label={"First Name"} />
        <UserField label={"Last Name"} />
        <UserField label={"Email"} />
        <UserField label={"Password"} />
        <button
          className={`rounded-md transition duration-300 ease-in-out border border-greay-400 text-md inline-flex justify-center items-center px-8 py-4 cursor-pointer hover:rounded-lg hover:shadow-md bg-gradient text-white`}
          disabled
        >
          <AiOutlineSave />
          <span className="ml-2">Save Changes</span>
        </button>
        <div className="w-full h-1 flex bg-slate-200 mb-5 my-5"></div>
        <div
          className={`rounded-md transition duration-300 ease-in-out border border-greay-400 text-md inline-flex justify-center items-center px-8 py-4 cursor-pointer hover:rounded-lg hover:shadow-md bg-white text-slate-900`}
          onClick={() => {
            logout();
            Router.push("/login");
          }}
        >
          <AiOutlineLogout />
          <span className="ml-2">Logout</span>
        </div>
        <div className="w-full h-1 flex bg-slate-200 mb-5 my-5"></div>
        <div
          className={`rounded-md transition duration-300 ease-in-out border border-red-400 text-md inline-flex justify-center items-center px-8 py-4 cursor-pointer hover:rounded-lg hover:shadow-md hover:shadow-red-400/20 bg-red-50 text-red-500`}
        >
          <AiOutlineUserDelete />
          <span className="ml-2">Delete Account</span>
        </div>
      </div>
    </div>
  );
};

const UserField = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-row justify-start items-center my-5">
      <span className="text-md">{label}:</span>
      <div className="ml-2">
        <TextInput
          reactFormProps={undefined}
          placeholder={""}
          label={""}
          type={""}
        />
      </div>
    </div>
  );
};

Account.Layout = "account";

export default Account;
