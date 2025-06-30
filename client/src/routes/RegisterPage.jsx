import { SignUp } from "@clerk/clerk-react";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center mt-[calc(var(--navbar-height)+32px)]">
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default RegisterPage;
