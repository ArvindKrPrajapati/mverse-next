import { getAllVideos } from "@/actions/getAllVideos";
import CardList from "@/components/CardList";

export default async function Home() {
  const res = await getAllVideos();
  return (
    <div className="-mt-2 md:mt-0">
      <CardList data={res} />
    </div>
  );
}
