import { getChannelByUsername } from "@/actions/getChannelByUsername";
import ChannelDetails from "@/components/Channeldetails";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/serverCookies";
import TabHeader from "./TabHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SettingsIcon } from "@/components/_icons";
import { Metadata } from "next";
type Props = {
  children: React.ReactNode;
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = decodeURIComponent(params.username);
  const currentUser = getCurrentUser();
  const data = await getChannelByUsername(params.username, currentUser?._id);
  if (!data) {
    return {
      title: "Not found",
    };
  }

  return {
    title: data.channelName || "Profile |" + data.name,
    description: data.description || "",
  };
}

export default async function ProfileLayout({ children, params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getChannelByUsername(params.username, currentUser?._id);
  if (!data) {
    notFound();
  }
  const username = decodeURIComponent(params.username);
  const options = [
    {
      name: "home",
      route: "/profile/" + username,
    },
    {
      name: "videos",
      route: "/profile/" + username + "/videos",
    },
    {
      name: "playlist",
      route: "/profile/" + username + "/playlist",
    },
    {
      name: "about",
      route: "/profile/" + username + "/about",
    },
  ];
  return (
    <main>
      <ChannelDetails data={data} />
      <Container>
        <div className="flex overflow-auto items-center">
          {options.map((item, index) => (
            <TabHeader key={index} route={item.route} name={item.name} />
          ))}
        </div>
      </Container>
      <hr className="dark:bg-gray-600 h-[1px] border-none bg-gray-200" />
      {children}
    </main>
  );
}
