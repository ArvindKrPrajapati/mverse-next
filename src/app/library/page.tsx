import ProtectedContainer from "@/components/Container/ProtectedContainer";
import React from "react";

export default function LibraryPage() {
  return (
    <ProtectedContainer byId={true}>
      <h1>hello</h1>
    </ProtectedContainer>
  );
}
