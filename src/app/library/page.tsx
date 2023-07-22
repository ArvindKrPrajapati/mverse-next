import { getHistory } from "@/actions/getHistory";
import Card from "@/components/Card";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import { ChevronRight } from "@/components/_icons";
import { getCurrentUser } from "@/lib/serverCookies";
import Link from "next/link";
import React from "react";

export default async function LibraryPage() {
  const currentUser = getCurrentUser();
  let data: any = [];
  if (currentUser?._id) {
    data = await getHistory(currentUser?._id);
  }

  return (
    <ProtectedContainer byId={true}>
      <Container>
        <main className="p-3">
          <Link href="/history" className="flex justify-between items-center">
            <p className="text-base font-bold">History</p>
            <ChevronRight />
          </Link>
        </main>
        <div className="px-3 flex md:flex-wrap gap-3 md:gap-0 overflow-auto">
          {data.map((item: any, index: number) => (
            <div className="md:p-2 sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 min-w-[200px]">
              <Card key={index} item={item} history={true} />
            </div>
          ))}
        </div>
      </Container>
    </ProtectedContainer>
  );
}
