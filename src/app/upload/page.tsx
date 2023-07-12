import ProtectedContainer from "@/components/Container/ProtectedContainer";
import UploadForm from "@/components/UploadForm";
import React from "react";

export default function UploadPage() {
  return (
    <ProtectedContainer>
      <UploadForm />
    </ProtectedContainer>
  );
}
