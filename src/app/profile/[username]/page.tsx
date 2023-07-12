import Logout from "@/components/Logout";
import React from "react";
type props = {
  params: {
    username: string;
  };
};
export default async function Profile({ params }: props) {
  return (
    <main>
      <Logout />
    </main>
  );
}
