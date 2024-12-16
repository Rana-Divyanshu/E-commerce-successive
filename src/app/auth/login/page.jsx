"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const loginT = t("logIn");

  return (
    <section className="login-signup-section min-h-[calc(100vh_-_150px)] flex items-center justify-center">
      <div className="login-signup-card h-fit w-[400px] flex flex-col items-center justify-center gap-[1rem] py-20 px-8 shadow-md shadow-slate-400">
        <div className="card-title text-center text-themeBlue text-[1.75rem] font-medium">
          {loginT.title}
        </div>
        <div className="card-sub-title self-center text-gray text-[14px] w-fit">
          {loginT.subText}
        </div>
        <div className="login-signup-inputs w-full flex flex-col gap-[1rem] mt-[2rem]">
          <input
            className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
            type="email"
            placeholder={loginT.emailPlaceholder}
            required
          />
          <input
            className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
            type="password"
            placeholder={loginT.passwordPlaceholder}
            required
          />
        </div>
        <button className="mt-6 cursor-pointer bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
          {loginT.signIn}
        </button>
        <Link href="/auth/signup">
          <p className="create-account mt-[2rem] self-center text-gray text-[14px] w-fit cursor-pointer">
            {loginT.createOne}
          </p>
        </Link>
      </div>
    </section>
  );
}

export default Login;
