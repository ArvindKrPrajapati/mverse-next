"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mversePost } from "@/lib/apiCalls";
import useModal from "@/hooks/useModal";
import toast from "react-hot-toast";

export default function Verify() {
  const email = localStorage.getItem("rawemail");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggleDisabled } = useModal();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleClick = (q: string) => {
    localStorage.removeItem("rawemail");
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    const value = q;
    current.set("auth", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const _otp = otp || 0;
    if (_otp.toString().length !== 6) {
      toast.error("Otp should be 6 digit");
      return;
    }
    try {
      setLoading(true);
      toggleDisabled();
      const res = await mversePost("/api/auth/verifyotp", {
        email,
        otp,
      });
      if (res.success) {
        toast.success("Account created successfully");
        localStorage.clear();
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.replace("/profile/" + res.data.id);
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
        <p className="text-green-900 text-sm mb-3 font-semibold">
          OTP sent to {email}
        </p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            OTP
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          className="disabled:opacity-40 bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading....." : "verify OTP"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        wrong email ?{" "}
        <button
          onClick={() => handleClick("signup")}
          className="text-indigo-500 hover:text-indigo-700"
          disabled={loading}
        >
          Signup Again
        </button>
      </p>
    </>
  );
}
