import ProtectedContainer from "@/components/Container/ProtectedContainer";
import UploadForm from "@/components/UploadForm";
import React from "react";

export default function UploadPage() {
  return (
    <ProtectedContainer className="px-0 sm:px-0 md:px-6">
      <UploadForm />
    </ProtectedContainer>
  );
}
