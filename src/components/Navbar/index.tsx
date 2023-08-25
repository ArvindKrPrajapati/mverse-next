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
import { useTheme } from "next-themes";
import { ChevronLeft, SearchIcon } from "../_icons";
import Search from "../Search";
import toast from "react-hot-toast";
import { mverseGet } from "@/lib/apiCalls";
import HeaderMenu from "./HeaderMenu";

export default function Navbar({ currentUser }: any) {
  const { isOpen, onClose, onOpen, disabled, toggleDisabled } = useModal();
  const [auth, setAuth] = useState<string | null>();
  const { theme } = useTheme();
  const [myTheme, setMyTheme] = useState<string | undefined>("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useState(
    pathname.startsWith("/search/") ? true : false
  );
  const [searchQuery, setSearchQuery] = useState(
    pathname.split("/search/")[1] || ""
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname.startsWith("/search/")) {
      const text = pathname.split("/search/")[1];
      setSearchQuery(text.replaceAll("-", " ").trim());
      setIsSearch(true);
    } else {
      setIsSearch(false);
      setSearchQuery("");
    }
  }, [pathname]);

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

  const setQuery = (value: string, type: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set(type, value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const openModal = (value: string) => {
    setQuery(value, "user");
    onOpen();
  };

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("user");
    current.delete("v");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    const a: string | null = searchParams.get("user");
    const b: string | null = searchParams.get("v");
    if (!a) {
      if (b) {
        openSearch();
        return;
      }
      onClose();
    } else {
      decideRoute();
    }
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    setMyTheme(theme);
  }, [theme]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    router.replace("/search/" + searchQuery.trim().replaceAll(" ", "-"));
  };

  const openSearch = () => {
    setQuery("search", "v");
    setAuth("search");
    onOpen();
  };

  const handleChange = async (text: string) => {
    setSearchQuery(text);
    if (text.length < 1) setSearchResult([]);
    if (text.length < 3) return;
    try {
      setSearchResult([]);
      setSearching(true);
      const res = await mverseGet("/api/search?name=" + text.trim());
      if (res.success) {
        setSearchResult(res.data);
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(error.message || "something went wrong");
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      <main
        className={`${pathname.startsWith("/play/") ? "hidden md:block" : ""}`}
      >
        <div
          className="dark:bg-neutral-900/80 backdrop-blur-xl  dark:text-slate-50 h-[50px] flex items-center justify-between px-5 pl-2 shadow sm:shadow-none py-2 fixed w-full  top-0 bg-white z-20"
          style={{ zIndex: "60" }}
        >
          {/* left */}
          <div
            className={`flex items-center md:ml-14 ${
              isSearch ? "w-full md:w-auto" : ""
            }`}
          >
            <button
              onClick={() => router.back()}
              className={`transition focus:outline-none rounded-full p-2 dark:active:bg-neutral-800 active:bg-gray-300 ${
                isSearch ? "md:hidden block" : "hidden"
              }`}
            >
              <ChevronLeft />
            </button>
            {searchQuery ? (
              <input
                type="text"
                value={searchQuery}
                readOnly={true}
                className="text-sm h-full w-full p-[6px] px-3 pl-5 focus:outline-none text-gray-800 dark:text-gray-100 focus:shadow-outline rounded-full md:hidden"
                onClick={openSearch}
              />
            ) : null}
            <Link href="/" className={`${isSearch ? "hidden md:block" : ""}`}>
              <Image
                src={
                  myTheme === "dark"
                    ? "/images/light-logo.png"
                    : "/images/logo.png"
                }
                width={1000}
                height={600}
                className="w-[100px]"
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <form
              className="hidden md:flex items-center rounded-full border-2 p-0 overflow-hidden min-w-[400px] dark:border-neutral-600"
              onSubmit={handleSubmit}
            >
              <input
                type="search"
                className="text-sm h-full w-full p-[6px] px-3 pl-5 focus:outline-none text-gray-800 dark:text-gray-100 focus:shadow-outline"
                placeholder="search"
                onChange={(e) => handleChange(e.target.value)}
                onClick={openSearch}
                value={searchQuery}
              />
              <button
                type="submit"
                className="flex items-center justify-center px-3 h-full"
              >
                <SearchIcon width={20} />
              </button>
            </form>
          </div>
          {/* end */}
          <div
            className={`flex items-center gap-2 ${
              isSearch ? "hidden md:flex" : ""
            }`}
          >
            <button
              onClick={openSearch}
              className="transition focus:outline-none rounded-full p-2 h-full md:hidden dark:active:bg-neutral-800 active:bg-gray-300"
            >
              <SearchIcon />
            </button>
            <div onClick={decideRoute} className="cursor-pointer">
              <MyPic user={currentUser} />
            </div>
            {currentUser?._id ? (
              <div className="-mr-4">
                <HeaderMenu />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        disabled={disabled}
        showSettings={auth == "channel" ? true : false}
        showHeader={auth == "search" ? false : true}
        backdropClose={auth == "search" ? true : false}
        isSearch={auth == "search" ? true : false}
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
          ) : auth == "search" ? (
            <Search
              closeModal={closeModal}
              handleChange={handleChange}
              searchQuery={searchQuery}
              searchResult={searchResult}
              searching={searching}
              handleSubmit={handleSubmit}
            />
          ) : (
            <main>loading</main>
          )
        }
      />
    </>
  );
}
