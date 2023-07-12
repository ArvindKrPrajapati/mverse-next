"use client";
import React, { useState } from "react";
import { EyeIcon } from "../_icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mversePost } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";

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

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("user");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
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
        // router.replace("/");
        closeModal();
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
        <Input
          type="eamil"
          label="Email"
          onChange={(e) => handleChange("email", e)}
          value={email}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => handleChange("password", e)}
          parentClassName="mb-6"
        />
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
