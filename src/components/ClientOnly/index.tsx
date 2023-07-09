"use client";
import React, { useState, useEffect } from "react";

export default function ClientOnly({ children }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return <>{children}</>;
  }
  return null;
}
