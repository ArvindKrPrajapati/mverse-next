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
import userCurrentUser from "@/hooks/userCurrentUser";

export default function Navbar() {
  const { isOpen, onClose, onOpen, disabled, toggleDisabled } = useModal();
  const [auth, setAuth] = useState<string | null>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { getUser } = userCurrentUser();

  const decideRoute = () => {
    const rawemail = localStorage.getItem("rawemail");
    if (rawemail) {
      openModal("verify");
      return;
    }
    if (getUser()?.id) {
      // push to profile
      const userObj = getUser();
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
      if (getUser()?.id) {
        router.replace("/profile/" + getUser().id);
      } else {
        onOpen();
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-slate-50 h-[50px] flex items-center justify-between px-5 shadow sm:shadow-none py-2 h-55 sticky top-0 bg-white">
        {/* left */}
        <div>
          <Link href="/">
            <Image src="/images/logo.png" width={100} height={10} alt="logo" />
          </Link>
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
