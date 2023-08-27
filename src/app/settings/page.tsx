import ProtectedContainer from "@/components/Container/ProtectedContainer";
import Logout from "@/components/Logout";
import React from "react";
import ChangeDp from "./ChangeDp";
import ChangeCover from "./ChangeCover";
import { getCurrentUser } from "@/lib/serverCookies";
import ChangeTheme from "./ChangeTheme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};
export default function SettingsPage() {
  const currentUser = getCurrentUser();
  return (
    <ProtectedContainer byId={true}>
      <main className="p-3">
        <b className="font-semibold text-base block mb-4">Settings</b>
        <ChangeDp user={currentUser} />
        <ChangeCover user={currentUser} />
        <b className="font-semibold text-base block mt-4 mb-3">Themes</b>
        <ChangeTheme />
        <Logout text={true} />
      </main>
    </ProtectedContainer>
  );
}
