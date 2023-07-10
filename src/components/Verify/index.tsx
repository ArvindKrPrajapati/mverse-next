"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mversePost } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import Button from "../Button";
type props = {
  toggleDisabled: () => void;
};
export default function Verify({ toggleDisabled }: props) {
  const email = localStorage.getItem("rawemail");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

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
    current.set("user", value);
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
        <p className="text-green-600 text-sm mb-3 font-semibold">
          OTP sent to {email}
        </p>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="otp">
            OTP
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="number"
            value={otp}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <Button
          label={loading ? "proccessing....." : "verify OTP"}
          type="submit"
          disabled={loading}
        />
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
