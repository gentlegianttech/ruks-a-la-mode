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
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl font-semibold mb-12">LOGIN TO CONTINUE</p>
      <input
        placeholder="Email"
        className="px-3 py-1.5 text-[#0e0e0e]"
        value={loginInfo.email}
        onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        type="email"
      />
      <input
        className="mt-8 px-3 py-1.5 text-[#0e0e0e] mb-12"
        placeholder="Password"
        value={loginInfo.password}
        onChange={(e) =>
          setLoginInfo({ ...loginInfo, password: e.target.value })
        }
        type="password"
      />
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
