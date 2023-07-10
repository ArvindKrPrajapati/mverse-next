import Logout from "@/components/Logout";
import React from "react";
type props = {
  params: {
    id: string;
  };
};
export default function Profile({ params }: props) {
  return <Logout />;
}
