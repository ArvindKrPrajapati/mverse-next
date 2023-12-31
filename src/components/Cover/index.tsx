import Image from "next/image";
import React from "react";

type props = {
  user: any;
};

export default function Cover({ user }: props) {
  return (
    <main className="flex justify-center items-center w-full aspect-[5/1] sm:aspect-[6/1] md:aspect-[7/1] xl:aspect-[8/1] dark:bg-neutral-700 bg-gray-300">
      {user?.cover ? (
        <Image
          src={user.cover}
          height={100}
          width={1000}
          alt="cover"
          className="h-full w-full"
        />
      ) : (
        <p>no cover found</p>
      )}
    </main>
  );
}
