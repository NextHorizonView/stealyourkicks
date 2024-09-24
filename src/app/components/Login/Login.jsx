"use client";
import React from "react";
import { Label } from "@/app/components/Login/label";
import { Input } from "@/app/components/Login/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import AuthContextProvider from "@/app/lib/contexts/AuthContext";
import LoginBtn from "../header/LoginBtn";

export function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="max-w-md w-full mb-20 mx-auto px-6 py-8 md:px-10 md:py-12 bg-white dark:bg-gray-900 shadow-xl rounded-3xl border border-gray-300 dark:border-gray-700">
      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white text-center">
        Step Into the Auction
      </h2>
      <p className="text-gray-600 text-sm text-center mt-2 dark:text-gray-400">
        Log in to your account to bid on exclusive sneaker deals.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-5">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="mj23@example.com" type="email" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-blue-600 to-indigo-500 block w-full text-white rounded-lg h-12 font-bold shadow-lg transition duration-300 hover:shadow-xl"
          type="submit"
        >
          Sign Up &rarr;
          {/* Temporarily comment BottomGradient for debugging */}
          {/* <BottomGradient /> */}
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-3 items-center justify-center px-4 w-full text-black rounded-lg h-12 font-medium shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button"
          >
            <IconBrandGithub className="h-5 w-5 text-gray-800 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Sign up with GitHub
            </span>
            {/* Temporarily comment BottomGradient for debugging */}
            {/* <BottomGradient /> */}
          </button>
          {/* Uncomment the Google button if needed */}
          {/* <button
            className="relative group/btn flex space-x-3 items-center justify-center px-4 w-full text-black rounded-lg h-12 font-medium shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button">
            <IconBrandGoogle className="h-5 w-5 text-gray-800 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Sign up with Google
            </span>
            <BottomGradient />
          </button> */}
          <AuthContextProvider>
            <LoginBtn />
          </AuthContextProvider>
        </div>
      </form>
    </div>
  );
}

// Temporarily comment BottomGradient for debugging
// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
