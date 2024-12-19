import React from "react";

function LoginSignupLoader({ text }) {
  return (
    <div className="loginSignuploader-container">
      <div class="loginSignuploader"></div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <p className="text-2xl font-medium text-themeBlue">Please Wait !</p>
        <p className="font-medium">{text}</p>
      </div>
    </div>
  );
}

export default LoginSignupLoader;
