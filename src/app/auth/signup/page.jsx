"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiArrowNarrowRight } from "react-icons/hi";

const SignUp = () => {
  const { t } = useTranslation();
  const signUpT = t("signUp");

  const [next, setNext] = useState(false);
  const movetopass = () => {
    setNext(true);
  };

  return (
    <section className="login-signup-section min-h-[calc(100vh_-_150px)] flex items-center justify-center">
      <div className="login-signup-card h-fit w-[400px] flex flex-col items-center justify-center gap-[1rem] py-20 px-8 shadow-md shadow-slate-400">
        <div className="card-title text-center text-themeBlue text-[1.75rem] font-medium">
          {signUpT.title}
        </div>
        <div className="card-sub-title self-center text-gray text-[14px] w-fit">
          {signUpT.subText}
        </div>
        {!next ? (
          <div className="sign-up-shift-div w-full flex flex-col justify-center items-center">
            <div className="login-signup-inputs w-full flex flex-col gap-[1rem] mt-[2rem]">
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="text"
                placeholder={signUpT.namePlaceholder}
                required
              />
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="email"
                placeholder={signUpT.emailPlaceholder}
                required
              />
              <p className="forgot-pass pointer">&nbsp;</p>
            </div>
            <button
              className="cursor-pointer bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
              onClick={() => movetopass()}
            >
              {signUpT.next} <HiArrowNarrowRight className="next-arrow" />
            </button>
          </div>
        ) : (
          <div className="sign-up-shift-div w-full flex flex-col justify-center items-center">
            <div className="login-signup-inputs w-full flex flex-col gap-[1rem] mt-[2rem]">
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="password"
                placeholder={signUpT.passwordPlaceholder}
                required
              />
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="password"
                placeholder={signUpT.rePasswordPlaceholder}
                required
              />
              <p className="forgot-pass pointer">&nbsp;</p>
            </div>
            <button className="cursor-pointer bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
              {signUpT.register}
            </button>
          </div>
        )}
        <Link href="/auth/login">
          <button className="create-account mt-[2rem] self-center text-gray text-[14px] w-fit cursor-pointer">
            {signUpT.alreadyHave}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
