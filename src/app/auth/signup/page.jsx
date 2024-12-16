import Link from "next/link";

const SignUp = () => {
  return (
    <div>
      Sign Up
      <Link href="/auth/login">Already have an account? Login</Link>
    </div>
  );
};

export default SignUp;
