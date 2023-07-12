import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
import Container from ".";
import ToastBeforeRedirect from "./ToastBeforeRedirect";

export default function ProtectedContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();
  if (currentUser?._id) {
    return <>{children}</>;
  }
  return <ToastBeforeRedirect />;
}
