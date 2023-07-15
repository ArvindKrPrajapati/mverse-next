import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
import Container from ".";
import ToastBeforeRedirect from "./ToastBeforeRedirect";

export default function ProtectedContainer({
  children,
  byId = false,
}: {
  children: React.ReactNode;
  byId?: boolean;
}) {
  const currentUser = getCurrentUser();
  if (byId && currentUser?._id) {
    return <>{children}</>;
  }
  if (currentUser?.username) {
    return <>{children}</>;
  }
  return <ToastBeforeRedirect />;
}
