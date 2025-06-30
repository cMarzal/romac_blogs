import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center mt-[calc(var(--navbar-height)+32px)]">
      <SignIn signUpUrl="/register"/>
    </div>
  );
};

export default LoginPage;
