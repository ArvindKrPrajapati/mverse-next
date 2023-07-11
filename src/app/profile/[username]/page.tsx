import { getChannelByUsername } from "@/actions/getChannelByUsername";
import Button from "@/components/Button";
import Cover from "@/components/Cover";
import GenerateUserPicture from "@/components/GenerateUserPicture";
import Logout from "@/components/Logout";
import { handleViews } from "@/lib/common";
import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
type props = {
  params: {
    username: string;
  };
};
export default async function Profile({ params }: props) {
  const currentUser = getCurrentUser();
  const data = await getChannelByUsername(params.username, currentUser?._id);

  return (
    <main>
      <Cover user={data} />
      <div className="p-5 px-10 md:flex justify-between">
        <main className="md:flex">
          <div className="flex justify-center md:block">
            <div className="w-1/6 max-w-[120px] min-w-[80px] aspect-square">
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
          <Button
            label={data.isSubscribed ? "unsubscribe" : "subscribe"}
            className="w-[120px] rounded-full"
          />
        </div>
      </div>
    </main>
  );
}
