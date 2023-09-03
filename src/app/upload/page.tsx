import AddBlogForm from "@/components/AddBlogForm";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import UploadForm from "@/components/UploadForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mverse | Upload",
  description: "Upload your videos for the world to see it through mverse",
};

export default function UploadPage() {
  return (
    <ProtectedContainer>
      <UploadForm />
      <p className="text-center mb-3">or</p>
      <AddBlogForm />
    </ProtectedContainer>
  );
}
