import ProtectedContainer from "@/components/Container/ProtectedContainer";
import Logout from "@/components/Logout";
import React from "react";
import ChangeDp from "./ChangeDp";
import ChangeCover from "./ChangeCover";
import { getCurrentUser } from "@/lib/serverCookies";

export default function SettingsPage() {
  const currentUser = getCurrentUser();
  return (
    <ProtectedContainer byId={true}>
      <main className="p-3">
        <ChangeDp user={currentUser} />
        <ChangeCover user={currentUser} />
        <Logout text={true} />
      </main>
    </ProtectedContainer>
  );
}
