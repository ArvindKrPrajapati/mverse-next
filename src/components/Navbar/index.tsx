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
import CreateChannel from "../CreateChannel";

export default function Navbar({ currentUser }: any) {
  const { isOpen, onClose, onOpen, disabled, toggleDisabled } = useModal();
  const [auth, setAuth] = useState<string | null>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const decideRoute = () => {
    const rawemail = localStorage.getItem("rawemail");
    if (rawemail) {
      setAuth("verify");
      openModal("verify");
      return;
    }
    if (currentUser?.username) {
      router.push("/profile/" + currentUser.username);
      return;
    }

    if (currentUser?._id) {
      setAuth("channel");
      openModal("channel");
      return;
    }
    if (!currentUser?._id) {
      const a: string | null = searchParams.get("user");
      if (a === "signup") {
        setAuth("signup");
        openModal("signup");
        return;
      }
      setAuth("login");
      openModal("login");
      return;
    }
  };

  const openModal = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set("user", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    onOpen();
  };

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("user");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    const a: string | null = searchParams.get("user");
    if (!a) {
      onClose();
    } else {
      decideRoute();
    }
    // eslint-disable-next-line
  }, [searchParams]);

  return (
    <>
      <div className="dark:bg-neutral-950 dark:text-slate-50 h-[50px] flex items-center justify-between px-5 pl-2 shadow sm:shadow-none py-2 h-55 sticky top-0 bg-white z-20">
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
        showSettings={auth == "channel" ? true : false}
        title={
          auth == "signup"
            ? "Create new account"
            : auth == "verify"
            ? "Enter OTP to verify"
            : auth == "login"
            ? "Welcome back | Login"
            : auth == "channel"
            ? "Create Channel"
            : "loading title"
        }
        body={
          auth === "signup" ? (
            <Signup toggleDisabled={toggleDisabled} />
          ) : auth === "verify" ? (
            <Verify toggleDisabled={toggleDisabled} />
          ) : auth == "login" ? (
            <Login toggleDisabled={toggleDisabled} />
          ) : auth == "channel" ? (
            <CreateChannel user={currentUser} toggleDisabled={toggleDisabled} />
          ) : (
            <main>loading</main>
          )
        }
      />
    </>
  );
}
