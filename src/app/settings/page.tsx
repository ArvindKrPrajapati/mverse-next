import ProtectedContainer from "@/components/Container/ProtectedContainer";
import Logout from "@/components/Logout";
import React from "react";

export default function SettingsPage() {
  return (
    <ProtectedContainer byId={true}>
      <main>
        <div className="px-3 py-1">
          <Logout text={true} />
        </div>
      </main>
    </ProtectedContainer>
  );
}
