"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AccountCircle from "../_icons/AccountCircle";
import Image from "next/image";
import LineMenuIcon from "../_icons/LineMenu";
import useModal from "@/hooks/useModal";
import Modal from "../Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Login from "../Login";
import Signup from "../Signup";
import Verify from "../Verify";

export default function Navbar() {
  const { isOpen, onClose, onOpen, disabled, toggleDisabled } = useModal();
  const [auth, setAuth] = useState<string | null>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getLoginUser = () => {
    let user: any = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  };

  const decideRoute = () => {
    const rawemail = localStorage.getItem("rawemail");
    const token = localStorage.getItem("token");
    if (rawemail) {
      openModal("verify");
      return;
    }
    if (token) {
      // push to profile
      const userObj = getLoginUser();
      router.push("/profile/" + userObj?.id);
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
      if (getLoginUser()?.id) {
        router.replace("/profile/" + getLoginUser().id);
      } else {
        onOpen();
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className=" flex items-center justify-between px-5 shadow sm:shadow-none py-2 h-55 sticky top-0 bg-white">
        {/* left */}
        <div>
          <Image src="/images/logo.png" width={100} height={10} alt="logo" />
        </div>
        {/* end */}
        <div onClick={decideRoute}>
          <AccountCircle width={28} />
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
            <Signup />
          ) : auth === "verify" ? (
            <Verify />
          ) : (
            <Login />
          )
        }
      />
    </>
  );
}
