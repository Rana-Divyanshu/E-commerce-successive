"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../../utils/firebaseAuth";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoginSignupLoader from "../../../components/LoginSignupLoader";

function Login() {
  const { data: session } = useSession();
  const { appData, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation();
  const loginT = t("logIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: "loginSignUpLoading", payload: true });
  //   try {
  //     const response = await loginUser(email, password);
  //     console.log(response, "response of function");
  //     if (response) {
  //       localStorage.setItem("email", response.email);
  //       toast.dismiss();
  //       toast.success("User logged In");
  //       dispatch({ type: "loginSignUpLoading", payload: false });
  //       router.push("/");
  //     }
  //   } catch (err) {
  //     dispatch({ type: "loginSignUpLoading", payload: false });
  //     toast.dismiss();
  //     toast.error(err.message);
  //     console.log(err);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.dismiss();
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Proceed with login only if validation passes
    dispatch({ type: "loginSignUpLoading", payload: true });
    try {
      const response = await loginUser(email, password);
      console.log(response, "response of function");
      if (response) {
        localStorage.setItem("email", response.email);
        toast.dismiss();
        toast.success("User logged In");
        dispatch({ type: "loginSignUpLoading", payload: false });
        router.push("/");
      }
    } catch (err) {
      dispatch({ type: "loginSignUpLoading", payload: false });
      toast.dismiss();
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleSigninWithGoogle = () => {
    dispatch({ type: "loginSignUpLoading", payload: true });
    signIn("google");
  };

  useEffect(() => {
    if (session?.user && Object.entries(session?.user).length > 0) {
      dispatch({ type: "loginSignUpLoading", payload: false });
      router.push("/");
    }
  }, [session]);

  return (
    <section className="login-signup-section min-h-[calc(100vh_-_150px)] flex items-center justify-center">
      {appData?.loginSignUpLoading ? (
        <LoginSignupLoader text={`Verifying Credentials`} />
      ) : (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
              type="password"
              placeholder={loginT.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="mt-6 cursor-pointer bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            {loginT.signIn}
          </button>
          <Link href="/auth/signup">
            <p className="create-account mt-[2rem] self-center text-gray text-sm w-fit cursor-pointer">
              {loginT.createOne}
            </p>
          </Link>
          <div className="w-full flex items-center gap-2">
            <div className="w-full h-[1.5px] bg-bordercommon"></div>
            <div className="text-md text-gray">or</div>
            <div className="w-full h-[1.5px] bg-bordercommon"></div>
          </div>
          <button
            onClick={() => handleSigninWithGoogle()}
            className="flex items-center justify-center gap-2 w-full border border-bordercommon py-3 rounded-full hover:bg-slate-50"
          >
            <span>
              <FcGoogle className="text-3xl" />
            </span>
            Sign in with Google
          </button>
        </div>
      )}
    </section>
  );
}

export default Login;
