import { getChannelByUsername } from "@/actions/getChannelByUsername";
import ChannelDetails from "@/components/Channeldetails";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/serverCookies";
import TabHeader from "./TabHeader";
import Link from "next/link";
import { SettingIcon } from "@/components/MversePlayer/icons";
import { notFound } from "next/navigation";
type Props = {
  children: React.ReactNode;
  params: { username: string };
};
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
          {currentUser?.username === username ? (
            <Link href="/settings" className="flex items-center gap-2">
              <SettingIcon width={20} />
              settings
            </Link>
          ) : null}
        </div>
      </Container>
      <hr className="bg-gray-600 h-[1px] border-none" />
      {children}
    </main>
  );
}
