import React from "react";
import Cover from "../Cover";
import GenerateUserPicture from "../GenerateUserPicture";
import { handleViews } from "@/lib/common";
import SubscribeButton from "../SubscribeButton";
import { getCurrentUser } from "@/lib/serverCookies";
import Container from "../Container";
type Props = {
  data: any;
};
export default function ChannelDetails({ data }: Props) {
  const currentUser = getCurrentUser();

  return (
    <main>
      <Cover user={data} />
      <Container>
        <div className="mx-auto p-7 md:flex justify-between">
          <main className="md:flex items-center">
            <div className="flex justify-center md:block">
              <div className="w-1/6 min-w-[80px] aspect-square md:w-[120px]">
                <GenerateUserPicture user={data} className="text-[50px]" />
              </div>
            </div>
            <div className="md:ml-5">
              <div className="text-center md:text-left my-3 md:m-0">
                <p className="text-3xl font-bold">{data.channelName}</p>
                <p className="text-xs font-semibold  dark:text-gray-300">
                  {data.username} &nbsp; <br className="block md:hidden " />
                  {handleViews(data.subscribers)} subscribers
                </p>
                <p className="text-xs mt-2 font-semibold  dark:text-gray-300">
                  {data.description}
                </p>
              </div>
            </div>
          </main>
          <div className="w-[120px] mx-auto md:mx-0">
            <SubscribeButton
              isSubscribed={data.isSubscribed}
              username={data.username}
              currentUser={currentUser}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
