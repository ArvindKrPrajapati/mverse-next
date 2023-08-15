import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
import ToastBeforeRedirect from "./ToastBeforeRedirect";

export default function ProtectedContainer({
  children,
  byId = false,
  redirect = true,
}: {
  children: React.ReactNode;
  byId?: boolean;
  redirect?: boolean;
}) {
  const currentUser = getCurrentUser();
  if (byId && currentUser?._id) {
    return <>{children}</>;
  }
  if (currentUser?.username) {
    return <>{children}</>;
  }
  if (!redirect) {
    return null;
  }
  return <ToastBeforeRedirect />;
}
