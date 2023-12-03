import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function All() {
  const { searchQuery } = useSearch();
  const all = `/api/query?search=${searchQuery}`;
  return (
    <>
      <Head>
        <title>Search | ArtistryNest</title>
      </Head>
      <AllProducts apiEndpoint={all} />
    </>
  );
}
