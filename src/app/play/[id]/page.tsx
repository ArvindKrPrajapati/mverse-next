import { getVideoById } from "@/actions/getVideoById";
import MversePlayer from "@/components/MversePlayer";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
export default async function PlayPage({ params }: Props) {
  const data = await getVideoById(params.id);
  return <MversePlayer url={data.link} title={data.title} />;
}
