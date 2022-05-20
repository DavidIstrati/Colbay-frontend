import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getUser, postUser } from "../api";
import {
  LandingPage,
  InputPage,
  AnimatedProgressBar,
  ANIMATION_DURATION,
} from "../components";
import { useAuth } from "../helpers";

const Login: NextPage = () => {
  const [page, setPage] = useState<number>(1);

  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (user) {
      Router.push("/search");
    }
  }, []);

  const changePage = async (page: number) => {
    await new Promise((r) => setTimeout(r, ANIMATION_DURATION));
    setPage(page);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const titles = {
    landingPage: (
      <>
        <TitlePage>
          <span>Welcome Back!</span>
        </TitlePage>
        <TitlePage>
          <span></span>
        </TitlePage>
      </>
    ),
    email: (
      <>
        <TitlePage>
          <span>Your Email</span>
        </TitlePage>
      </>
    ),
    password: (
      <>
        <TitlePage>
          <span>Your Password</span>
        </TitlePage>
      </>
    ),
  };
  interface FormInputs {
    email: string;
    password: string;
  }

  const onSubmit = () => {
    console.log(password);
    getUser(undefined, email, password).then((resp) => {
      login(resp.data);
      Router.push("/search");
      console.log(resp);
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 relative">
      <div className="absolute top-0 w-screen bg-slate-200 h-2 flex">
        <AnimatedProgressBar
          animationDuration={ANIMATION_DURATION}
          widthStart={((page - 2) / 2) * 100}
          widthEnd={((page - 1) / 2) * 100}
        />
      </div>
      {page === 3 && (
        <InputPage
          onClick={async () => onSubmit()}
          pageBack={async () => changePage(2)}
          setValueFromRoot={(value) => setPassword(value)}
          initialValue={password}
          reactHookFormBI={{
            required: "This is required.",
            minLength: {
              value: 2,
              message: "This input is too small.",
            },
            maxLength: {
              value: 100,
              message: "This input exceed maxLength.",
            },
          }}
          type="password"
          title={titles["password"]}
          placeholder={"Password"}
          label={"Password"}
        />
      )}
      {page === 2 && (
        <InputPage
          onClick={async () => changePage(3)}
          pageBack={async () => changePage(1)}
          initialValue={email}
          reactHookFormBI={{
            required: "This is required.",
            minLength: {
              value: 2,
              message: "This input is too small.",
            },
            maxLength: {
              value: 100,
              message: "This input exceed maxLength.",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email is not valid",
            },
          }}
          setValueFromRoot={(value) => setEmail(value)}
          title={titles["email"]}
          placeholder={"Email"}
          label={"Email"}
        />
      )}

      {page === 1 && (
        <LandingPage
          onClick={async () => changePage(2)}
          title={titles["landingPage"]}
          content={
            <>
              <span className="text-sm">
                {"Don't have an account? "}
                <Link href="/signup">
                  <span className="text-blue-500 cursor-pointer">Signup</span>
                </Link>
              </span>
            </>
          }
        />
      )}
    </div>
  );
};

const TitlePage = ({ children }: { children: React.ReactNode }) => {
  return <span className="xl:text-5xl 2xl:text-7xl font-bold">{children}</span>;
};

export default Login;
