"use client";

import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/helpers/utils/auth";
import { useAppContext } from "@/helpers/store";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/button";

export default function Page() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const context = useAppContext();
  const router = useRouter();

  const { setuser } = context;

  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = u.uid;
      setuser(u);
      router.push("/roaming/admin");
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const handleSignIn = () => {
    setLoading(true);
    if (!loginInfo.email || !loginInfo.password)
      return alert("Incomplete Login");
    const { email, password } = loginInfo;
    signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const [hidden, sethidden] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-3xl font-bold mb-20">RUKS Á LA MODE</p>
      <p className="text-lg font-semibold mb-12">LOGIN TO CONTINUE</p>
      <input
        placeholder="Email"
        className="px-3 py-1.5 text-[#0e0e0e] lg:w-72 w-72 bg-transparent border border-dark outline-none"
        value={loginInfo.email}
        onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        type="email"
      />
      <div className="flex mt-8 lg:px-3 px-1.5 py-1 lg:py-1.5 text-[#0e0e0e] mb-12 items-center justify-center space-x-2 lg:w-72 w-72 bg-transparent border border-dark">
        <input
          className="bg-transparent outline-none lg:text-xs text-[10px]"
          placeholder="Password"
          value={loginInfo.password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          type={hidden ? "password" : "text"}
        />
        <p
          onClick={() => sethidden(!hidden)}
          className="lg:text-xs text-[10px]"
        >
          {hidden ? "SHOW" : "HIDE"}
        </p>
      </div>
      <Button
        loading={loading}
        label="LOGIN"
        onClick={() => {
          setLoading(true);
          handleSignIn();
          setLoading(false);
        }}
      />
    </div>
  );
}
