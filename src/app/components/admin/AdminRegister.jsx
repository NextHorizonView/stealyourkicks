"use client";
import React, { useState } from "react";
import { Label } from "@/app/components/Register/label";
import { Input } from "@/app/components/Register/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/lib/contexts/AuthContext";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import Navbar from "../header/Navbar";

export function AdminRegister() {
    const { handleSignUpWithEmail, error } = useAuth() || {};
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        handleSignUpWithEmail(email, password);
    };

    return (
        <>
           
            <div className="max-w-md w-full mx-auto m-44 mb-20 mt-auto pt-10 rounded-3xl p-6 shadow-xl bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700">
                <h2 className="font-extrabold text-2xl text-gray-800 dark:text-white text-center">
                   Sign Up for Admin Credentials 
                </h2>
                <p className="text-gray-600 text-sm max-w-sm mt-2 dark:text-gray-400 text-center">
                    Create an account to bid on exclusive sneaker deals.
                </p>
                <form className="my-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-5">
                        <LabelInputContainer className="flex-1">
                            <Label htmlFor="firstname">First Name</Label>
                            <Input id="firstname" placeholder="Michael" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer className="flex-1">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" placeholder="Jordan" type="text" />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-5">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" onChange={(e) => {
                            setEmail(e.target.value);
                        }
                        } placeholder="mj23@example.com" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" onChange={(e) => {
                            setPassword(e.target.value);
                        }
                        } placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-blue-600 to-indigo-500 block w-full text-white rounded-lg h-12 font-bold shadow-lg transition duration-300 hover:shadow-xl"
                        type="submit"
                    >
                        Sign Up &rarr;
                        <BottomGradient />
                    </button>

                    <div className="bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        {/* <button
            className="relative group/btn flex space-x-3 items-center justify-start px-4 w-full text-black rounded-lg h-12 font-medium shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button"
          >
            <IconBrandGithub className="h-5 w-5 text-gray-800 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Sign up with GitHub
            </span>
            <BottomGradient />
          </button> */}
                        <button
                            className="relative group/btn flex space-x-3 items-center justify-start px-4 w-full text-black rounded-lg h-12 font-medium shadow-md bg-gray-100 dark:bg-gray-800 dark:text-white transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            type="button"
                        >
                            <IconBrandGoogle className="h-5 w-5 text-gray-800 dark:text-gray-300" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                Sign up with Google
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-1 w-full", className)}>
            {children}
        </div>
    );
};
