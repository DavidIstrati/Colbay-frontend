import { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { postUser, postVerificationCode } from "../api";
import {
  LandingPage,
  InputPage,
  AnimatedProgressBar,
  ANIMATION_DURATION,
} from "../components";
import { useAuth } from "../helpers";

const Signup: NextPage = () => {
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [graduationYear, setGradYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const titles = {
    landingPage: (
      <>
        <TitlePage>
          <span>{"Let's create"}</span>
        </TitlePage>
        <TitlePage>
          <span>an account!</span>
        </TitlePage>
      </>
    ),
    firstName: (
      <>
        <TitlePage>
          <span>What is your</span>
        </TitlePage>
        <TitlePage>
          <span>First Name?</span>
        </TitlePage>
      </>
    ),
    lastName: (
      <>
        <TitlePage>
          <span>What about your</span>
        </TitlePage>
        <TitlePage>
          <span>Last Name?</span>
        </TitlePage>
      </>
    ),
    gradYear: (
      <>
        <TitlePage>
          <span>When will you</span>
        </TitlePage>
        <TitlePage>
          <span>Graduate?</span>
        </TitlePage>
      </>
    ),
    email: (
      <>
        <TitlePage>
          <span>We also need</span>
        </TitlePage>
        <TitlePage>
          <span>your Email</span>
        </TitlePage>
      </>
    ),
    password: (
      <>
        <TitlePage>
          <span>{"Let's choose a"}</span>
        </TitlePage>
        <TitlePage>
          <span>Password</span>
        </TitlePage>
      </>
    ),
    confirmPassword: (
      <>
        <TitlePage>
          <span>Confirm your</span>
        </TitlePage>
        <TitlePage>
          <span>Password</span>
        </TitlePage>
      </>
    ),
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
 
  const onSubmit = async () => {
    await postUser({
      firstName,
      lastName,
      graduationYear,
      email,
      password,
    })
      .then((resp: any) => {
        login(resp.data.access_token);
        Router.push("verifyEmail")
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-100 relative">
      <div className="absolute top-0 w-screen bg-slate-200 h-2 flex">
        <AnimatedProgressBar
          animationDuration={ANIMATION_DURATION}
          widthStart={((page - 2) / 7) * 100}
          widthEnd={((page - 1) / 7) * 100}
        />
      </div>
      {page === 7 && (
        <InputPage
          onClick={async () => {
            changePage(8);
            await onSubmit();

          }}
          pageBack={async () => changePage(6)}
          setValueFromRoot={(value) => setConfirmPassword(value)}
          initialValue={confirmPassword}
          reactHookFormBI={{
            validate: (value: string) =>
              value === password || "The passwords do not match",
          }}
          type="password"
          title={titles["confirmPassword"]}
          placeholder={"Confirm Password"}
          label={"Confirm Password"}
        />
      )}
      {page === 6 && (
        <InputPage
          onClick={async () => changePage(7)}
          pageBack={async () => changePage(5)}
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
      {page === 5 && (
        <InputPage
          onClick={async () => changePage(6)}
          pageBack={async () => changePage(4)}
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
      {page === 4 && (
        <InputPage
          onClick={async () => changePage(5)}
          pageBack={async () => changePage(3)}
          initialValue={graduationYear}
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
          selectOptions={[
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
          ].map((year) => Object({ value: year, text: year }))}
          setValueFromRoot={(value) => setGradYear(value)}
          title={titles["gradYear"]}
          placeholder={"Expected Graduation Year"}
          label={"Expected Graduation Year"}
          type={"select"}
        />
      )}
      {page === 3 && (
        <InputPage
          onClick={async () => changePage(4)}
          pageBack={async () => changePage(2)}
          initialValue={lastName}
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
          setValueFromRoot={(value) => setLastName(value)}
          title={titles["lastName"]}
          placeholder={"Last Name"}
          label={"Last Name"}
        />
      )}
      {page === 2 && (
        <InputPage
          onClick={async () => changePage(3)}
          pageBack={async () => changePage(1)}
          initialValue={firstName}
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
          setValueFromRoot={(value) => setFirstName(value)}
          title={titles["firstName"]}
          placeholder={"First Name"}
          label={"First Name"}
        />
      )}
      {page === 1 && (
        <LandingPage
          onClick={async () => changePage(2)}
          title={titles["landingPage"]}
          content={
            <>
              <span className="text-sm">
                Already have an account?{" "}
                <Link href="/login">
                  <span className="text-blue-500 cursor-pointer">Login</span>
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

export default Signup;
