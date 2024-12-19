"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../../utils/firebaseAuth";
import { AppContext } from "../../../context/AppContext";
import LoginSignupLoader from "../../../components/LoginSignupLoader";
import toast from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
// getUserData
// import { auth } from "../../../utils/firebase";
// import { HiArrowNarrowRight } from "react-icons/hi";
// const handleSignup = async (e) => {
//   e.preventDefault();
//   dispatch({ type: "loginSignUpLoading", payload: true });
//   try {
//     const response = await registerUser(email, password);
//     // userName, userImg
//     console.log(response, "registration response in ffunciton");
//     if (response) {
//       dispatch({ type: "loginSignUpLoading", payload: false });
//       localStorage.setItem("userName", userName);
//       toast.dismiss();
//       toast.success("User Registered Successfully");
//       router.push("/auth/login");
//     }
//   } catch (err) {
//     dispatch({ type: "loginSignUpLoading", payload: false });
//     toast.dismiss();
//     toast.error(err.message);
//   }
// };

const SignUp = () => {
  const { appData, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation();
  const signUpT = t("signUp");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation logic
    const nameRegex = /^[A-Za-z]+$/; // Name contains only alphabets
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/; // Password criteria

    const missingFields = [];
    if (!userName) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");

    // Show toast for missing fields
    if (missingFields.length > 0) {
      toast.dismiss();
      toast.error(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    if (!nameRegex.test(userName) || userName.length < 3) {
      toast.dismiss();
      toast.error(
        "Name must contain only alphabets and be at least 3 characters long"
      );
      return;
    }
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.dismiss();
      toast.error("Password doesn't match the criteria");
      return;
    }

    // Proceed with signup only if validation passes
    dispatch({ type: "loginSignUpLoading", payload: true });
    try {
      const response = await registerUser(email, password);
      console.log(response, "registration response in function");
      if (response) {
        dispatch({ type: "loginSignUpLoading", payload: false });
        localStorage.setItem("userName", userName);
        toast.dismiss();
        toast.success("User Registered Successfully");
        router.push("/auth/login");
      }
    } catch (err) {
      dispatch({ type: "loginSignUpLoading", payload: false });
      toast.dismiss();
      toast.error(err.message);
    }
  };

  // const fetchUserData = async () => {
  //   console.log("useEff");
  //   const data = await getUserData(auth.currentUser.uid);
  //   console.log(data, "auth.currentUser");
  //   setUserData(data);
  // };
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     fetchUserData();
  //   }
  // }, [auth.currentUser]);

  return (
    <section className="login-signup-section min-h-[calc(100vh_-_150px)] flex items-center justify-center">
      {appData?.loginSignUpLoading ? (
        <LoginSignupLoader text={`User Regestration in progress`} />
      ) : (
        <div className="login-signup-card h-fit w-[400px] flex flex-col items-center justify-center gap-[1rem] py-20 px-8 shadow-md shadow-slate-400">
          <div className="card-title text-center text-themeBlue text-[1.75rem] font-medium">
            {signUpT.title}
          </div>
          <div className="card-sub-title self-center text-gray text-[14px] w-fit">
            {signUpT.subText}
          </div>
          <div className="sign-up-shift-div w-full flex flex-col justify-center items-center">
            <div className="login-signup-inputs w-full flex flex-col gap-[1rem] mt-[2rem]">
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="text"
                placeholder={signUpT.namePlaceholder}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="email"
                placeholder={signUpT.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  className="login-signup-input w-full outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px] transition-all duration-400 placeholder:text-gray"
                  type="password"
                  placeholder={signUpT.passwordPlaceholder}
                  value={password}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordFocus && (
                  <ul className="absolute bg-yellow-50 p-4 mt-2 text-sm rounded-lg shadow-md outline outline-1 outline-secondary">
                    {password.length >= 6 &&
                    /[A-Z]/.test(password) &&
                    /[a-z]/.test(password) &&
                    /[0-9]/.test(password) &&
                    /[!@#$%^&*]/.test(password) ? (
                      <FaCheck className="text-green text-xl absolute top-2 right-2" />
                    ) : (
                      <IoIosWarning className="text-yellow-500 text-xl absolute top-2 right-2" />
                    )}
                    <li
                      className={`${
                        password.length >= 6
                          ? "text-green"
                          : password.length > 0
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      Must contain at least 6 characters
                    </li>
                    <li
                      className={`${
                        /[A-Z]/.test(password)
                          ? "text-green"
                          : password.length > 0
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      Must contain at least 1 uppercase letter
                    </li>
                    <li
                      className={`${
                        /[a-z]/.test(password)
                          ? "text-green"
                          : password.length > 0
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      Must contain at least 1 lowercase letter
                    </li>
                    <li
                      className={`${
                        /[0-9]/.test(password)
                          ? "text-green"
                          : password.length > 0
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      At least 1 number
                    </li>
                    <li
                      className={`${
                        /[!@#$%^&*]/.test(password)
                          ? "text-green"
                          : password.length > 0
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      At least 1 special character (!@#$%^&*)
                    </li>
                  </ul>
                )}
              </div>
              {/* <input
                className="login-signup-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                type="password"
                placeholder={signUpT.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> */}
            </div>
            <button
              className="mt-6 cursor-pointer bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
              onClick={(e) => handleSignup(e)}
            >
              {signUpT.register}
            </button>
          </div>
          <Link href="/auth/login">
            <button className="create-account self-center text-gray text-[14px] w-fit cursor-pointer">
              {signUpT.alreadyHave}
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default SignUp;
