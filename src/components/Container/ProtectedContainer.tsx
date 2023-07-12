import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
import Container from ".";
import ToastBeforeRedirect from "./ToastBeforeRedirect";

export default function ProtectedContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();
  if (currentUser?._id) {
    return <Container className={className}>{children}</Container>;
  }
  return <ToastBeforeRedirect />;
}
