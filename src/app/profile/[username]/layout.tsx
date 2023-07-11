import { getChannelByUsername } from "@/actions/getChannelByUsername";
import ChannelDetails from "@/components/Channeldetails";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/serverCookies";
import TabHeader from "./TabHeader";
type Props = {
  children: React.ReactNode;
  params: { username: string };
};
export default async function ProfileLayout({ children, params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getChannelByUsername(params.username, currentUser?._id);
  const options = [
    {
      name: "home",
      route: "/profile/" + decodeURIComponent(params.username),
    },
    {
      name: "videos",
      route: "/profile/" + decodeURIComponent(params.username) + "/videos",
    },
    {
      name: "playlist",
      route: "/profile/" + decodeURIComponent(params.username) + "/playlist",
    },
    {
      name: "about",
      route: "/profile/" + decodeURIComponent(params.username) + "/about",
    },
  ];
  return (
    <main>
      <ChannelDetails data={data} />
      <Container>
        <div className="flex overflow-auto">
          {options.map((item, index) => (
            <TabHeader key={index} route={item.route} name={item.name} />
          ))}
        </div>
      </Container>
      <hr className="bg-gray-600 h-[1px] border-none" />
      <Container>{children}</Container>
    </main>
  );
}
