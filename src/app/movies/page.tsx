import CardList from "@/components/CardList";

export default function MoviesPage() {
  return (
    <CardList url="https://mytodo-api.cyclic.app/v1/mverse/all?type=movie" />
  );
}
