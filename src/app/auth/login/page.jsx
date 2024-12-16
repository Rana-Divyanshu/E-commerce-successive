import Link from "next/link";
// import { useContext } from "react";
// import { AppContext } from "../../../context/AppContext";

function Login() {
  const { dispatch } = useContext(AppContext);

  // const loginUser = () => {
  //   const userData = {
  //     id: 1,
  //     name: "Divyanshu Rana",
  //     email: "divyanshu.rana@successive.tech",
  //   };
  //   dispatch({ type: "user", payload: userData });
  //   setShowProfilePopover(false);
  // };

  return (
    <div>
      <p>Login Page</p>
      <button
        className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
        // onClick={() => {
        // loginUser();
        // }}
      >
        Login
      </button>
      <Link href="/auth/signup">Signup</Link>
    </div>
  );
}

export default Login;
