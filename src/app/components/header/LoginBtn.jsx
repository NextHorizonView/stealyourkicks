"use client";

import { useAuth } from "@/app/lib/contexts/AuthContext";
import Link from "next/link";
import React from "react";

export default function LoginBtn() {
  const { user, isLoading, handleSignInWithGoogle, handleLogout } =
    useAuth();
  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  // if (user)
  // {
  //   return <div className="flex gap-4 items-center">
  //         <button
  //       className="bg-white text-black flex items-center gap-1 px-4 py-2 rounded-full"
  //       onClick={() => {
  //         handleLogout();
  //       }}
  //     >Logout</button>
  //     <Link  href='/admin'>
  //     <div className=" flex text-white gap-4 rounded-xl bg-slate-700 px-3 py-3 " >
  //       <img className="object-cover h-12 rounded-full w-12" src={user?.photoURL} alt="" />
  //       <div>
  //       <h1 className="font-bold">{user?.displayName}</h1>
  //       <h1 className="" >{user?.email}</h1>
  //       </div>
  //     </div>
  //     </Link>
  //     </div>
  // }

  return <section>
      <button
        className="bg-white text-black flex items-center gap-1 px-4 py-2 rounded-full"
        onClick={() => {
          handleSignInWithGoogle();
        }}
      >
        <img className="h-7" src="/google.png"></img>
        Login With Google
      </button>
    </section>
}
