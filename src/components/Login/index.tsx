"use client";
import React, { useState } from "react";
import { EyeIcon } from "../_icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mversePost } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import Button from "../Button";

type props = {
  toggleDisabled: () => void;
};

export default function Login({ toggleDisabled }: props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (
    input: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (input) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleClick = (q: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    const value = q;
    current.set("user", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleValidate = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 7) {
      toast.error("Password should be atleast 8 digit");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) {
      return;
    }
    try {
      setLoading(true);
      toggleDisabled();
      const res = await mversePost("/api/auth/login", {
        email,
        password,
      });
      if (res.success) {
        toast.success("login successfully");
        router.refresh();
        router.replace("/");
      } else {
        toast.error(res.error);
      }
      toggleDisabled();
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
      toggleDisabled();
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={email}
            onChange={(e) => handleChange("email", e)}
          />
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => handleChange("password", e)}
              className="w-full border border-gray-300 rounded px-3 py-[6px] focus:outline-none"
            />
            <div
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
              onClick={handlePasswordToggle}
            >
              <EyeIcon active={passwordVisible} color="silver" width={20} />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          label={loading ? "processing....." : "Login"}
        />
      </form>
      <p className="mt-4 text-center text-sm">
        Dont have an account?{" "}
        <button
          onClick={() => handleClick("signup")}
          className="text-indigo-500 hover:text-indigo-700"
          disabled={loading}
        >
          Sign up
        </button>
      </p>
    </>
  );
}
