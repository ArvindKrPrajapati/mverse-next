import { getAllVideos } from "@/actions/getAllVideos";
import CardList from "@/components/CardList";
import SafeAreaView from "@/components/SafeAreaView";

export default async function Home() {
  const res = await getAllVideos();
  return (
    <SafeAreaView>
      <div className="-mt-2 md:mt-0">
        <CardList data={res} loadMoreFromUrl="/api/video" />
      </div>
    </SafeAreaView>
  );
}
