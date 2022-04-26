import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import { TextInput, EmailInput } from "../components";
import { getUser } from "../api";

import { useAuth } from "../storage";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import AOS from "aos";
import "aos/dist/aos.css";

const Login: NextPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { user, login, logout } = useAuth();

  const router = useRouter();

    if (user) {
      router.push("/search");
    }

  interface FormInputs {
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    criteriaMode: "all",
  });

  const onSubmit = (data: FormInputs) => {
    getUser(undefined, data.email, data.password).then((resp) => {
      login(resp.data);
      router.push("/signup");
    });
    console.log(data);
  };

  return (
    <div className="h-screen w-screen bg-slate-100 flex justify-center items-center -z-40 absolute background-stars">
      <div
        className="xl:w-1/3 2xl:w-1/4 h-2/3 bg-white p-10 transition duration-500 ease-in-out rounded-md border-2 border-gray-900 flex flex-col justify-center items-center relative
      before:absolute
      before:w-full
      before:h-full
      before:-z-10
      before:bg-gradient-to-br
    before:from-blue-300
    before:to-emerald-200
      before:rounded-md
      before:-left-5
      before:top-5
      before:border-2
      before:border-gray-900
      hover:before:-translate-x-1
      hover:before:translate-y-1
      before:transition
      before:duration-400
      before:ease-in-out"
      >
        <div className="h-1/4 w-full flex justify-start items-center">
          <span
            className="text-6xl font-bold text-black"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="0"
          >
            Welcome Back!
          </span>
        </div>
        <div className="h-3/4  w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-1/6 w-full">
              <div
                className="py-2 w-full h-full flex flex-col"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="1200"
              >
                <TextInput
                  reactFormProps={register("email", {
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
                  })}
                  placeholder="Email"
                  label="Email"
                  type="email"
                ></TextInput>
              </div>
            </div>
            <div className="h-1/6 w-full">
              <div
                className="py-2 w-full h-full flex flex-col"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="1600"
              >
                <TextInput
                  reactFormProps={register("password", {
                    required: "This is required.",
                    minLength: {
                      value: 2,
                      message: "This input is too small.",
                    },
                    maxLength: {
                      value: 100,
                      message: "This input exceed maxLength.",
                    },
                  })}
                  placeholder="Password"
                  label="Password"
                  type="password"
                ></TextInput>
              </div>
            </div>
            <div className="h-1/6 w-full">
              <div
                className="py-2 w-full h-full flex flex-col justify-end"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="2400"
              >
                <input
                  type="submit"
                  onClick={() => console.log(errors)}
                  className="w-3/5 h-2/3 cursor-pointer bg-gradient-to-r from-blue-300 to-emerald-300 flex justify-center items-center rounded-sm border rounded-sm border-gray-900 outline-none p-2 shadow-solid-2 hover:shadow-solid-4  transition duration-200 ease-in-out text-sm font-bold"
                ></input>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`w-60 inline bg-rose-400 absolute right-10 bottom-10 transition duration-500 ease-in-out shadow-solid-10 p-4 flex flex-col ${
          Object.keys(errors).length == 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-2xl font-bold">Error</span>

        <ErrorMessage
          errors={errors}
          name="email"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>
                <b>Email</b>: {message}
              </p>
            ))
          }
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>
                <b>Password</b>: {message}
              </p>
            ))
          }
        />
      </div>
    </div>
  );
};

export default Login;