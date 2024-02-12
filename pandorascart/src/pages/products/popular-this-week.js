import Head from "next/head";
import Links from "@/pages/components/MenuLinks";

export default function All() {
  const all = `/api/popular`;
  return (
    <>
      <Head>
        <title>Popular this week | ArtistryNest</title>
      </Head>
      <Links pageHeader={"Popular this week"} apiEndpoint={all} />
    </>
  );
}
