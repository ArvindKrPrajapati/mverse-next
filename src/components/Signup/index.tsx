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
export default function Signup({ toggleDisabled }: props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      case "name":
        setName(e.target.value);
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
    if (!name) {
      toast.error("Full name is required");
      return false;
    }
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
      const res = await mversePost("/api/auth/signup", {
        email,
        name,
        password,
      });
      if (res.success) {
        localStorage.setItem("rawemail", res.data.email);
        toast.success(res.data.message);
        handleClick("verify");
      } else {
        toast.error(res.error);
      }
      toggleDisabled();
      setLoading(false);
    } catch (error) {
      toast.error("something went error");
      setLoading(false);
      toggleDisabled();
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => handleChange("name", e)}
        />
        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => handleChange("email", e)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => handleChange("password", e)}
          parentClassName="mb-6"
        />

        <Button
          label={loading ? "proccessing....." : "signup"}
          type="submit"
          disabled={loading}
        />
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button
          onClick={() => handleClick("login")}
          className="text-indigo-500 hover:text-indigo-700"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </>
  );
}
