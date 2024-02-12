import Head from "next/head";
import Links from "@/pages/components/MenuLinks";


export default function All() {
  const all = `/api/best_sellers`;
  return (
    <>
      <Head>
        <title>Best sellers | ArtistryNest</title>
      </Head>
      <Links pageHeader={"Best sellers"} apiEndpoint={all} />
    </>
  );
}
