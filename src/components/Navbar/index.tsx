"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useModal from "@/hooks/useModal";
import Modal from "../Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "../Login";
import Signup from "../Signup";
import Verify from "../Verify";
import MyPic from "./MyPic";

export default function Navbar({ currentUser }: any) {
  const { isOpen, onClose, onOpen, disabled, toggleDisabled } = useModal();
  const [auth, setAuth] = useState<string | null>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const decideRoute = () => {
    const rawemail = localStorage.getItem("rawemail");
    if (rawemail) {
      openModal("verify");
      return;
    }
    if (currentUser?._id) {
      // push to profile
      router.push("/profile/" + currentUser?._id);
      return;
    }
    openModal("login");
  };

  const openModal = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set("auth", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    onOpen();
  };

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("auth");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    onClose();
  };

  useEffect(() => {
    const a: string | null = searchParams.get("auth");
    setAuth(a);
    if (!a) {
      onClose();
    } else {
      if (currentUser?._id) {
        router.replace("/profile/" + currentUser._id);
      } else {
        onOpen();
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-slate-50 h-[50px] flex items-center justify-between px-5 pl-2 shadow sm:shadow-none py-2 h-55 sticky top-0 bg-white z-20">
        {/* left */}
        <div className="flex items-center md:ml-14">
          <Link href="/">
            <Image
              src="/images/light-logo.png"
              width={100}
              height={10}
              alt="logo"
            />
          </Link>
        </div>
        {/* end */}
        <div onClick={decideRoute}>
          <MyPic user={currentUser} />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        disabled={disabled}
        title={
          auth == "signup"
            ? "Create new account"
            : auth == "verify"
            ? "Enter OTP to verify"
            : "Welcome back | Login"
        }
        body={
          auth === "signup" ? (
            <Signup toggleDisabled={toggleDisabled} />
          ) : auth === "verify" ? (
            <Verify toggleDisabled={toggleDisabled} />
          ) : (
            <Login toggleDisabled={toggleDisabled} />
          )
        }
      />
    </>
  );
}
