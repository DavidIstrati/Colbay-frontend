import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { postVerificationCode } from "../api";
import {
  InputPage,
} from "../components";
import { useAuth } from "../helpers";

const VerifyEmail: NextPage = () => {
  const { user, login, logout } = useAuth();

  const [verificationCode, setVerificationCode] = useState<string>("");

  const submitVerificationCode = async () => {
    await postVerificationCode(verificationCode, user as string).then(
      (resp) => {
        Router.push("/search")
      }
    ).catch(e=>console.log(e));
  };

  const titles = {
    verificationCode: (
      <>
        <TitlePage>
          <span>We sent you a</span>
        </TitlePage>
        <TitlePage>
          <span>Verification Code!</span>
        </TitlePage>
      </>
    ),
  };
  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 relative">
      <InputPage
        onClick={async () => {
          await submitVerificationCode();
        }}
        setValueFromRoot={(value: string) => setVerificationCode(value)}
        initialValue={verificationCode}
        reactHookFormBI={{
          valueAsNumber: true,
          pattern: {
            value: /^(0|[1-9]\d*)(\.\d+)?$/,
            message: "Please enter a number",
          },
        }}
        type="text"
        title={titles["verificationCode"]}
        placeholder={"Code"}
        label={"Verification Code"}
      />
    </div>
  );
};

const TitlePage = ({ children }: { children: React.ReactNode }) => {
  return <span className="xl:text-5xl 2xl:text-7xl font-bold">{children}</span>;
};

export default VerifyEmail;
