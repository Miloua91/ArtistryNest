import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Ceramics() {
  const { searchQuery } = useSearch();
  const ceramics = `/api/category?category=ceramics&search=${searchQuery}`;
  return (
    <>
      <Head>
        <title>Ceramics | ArtistryNest</title>
      </Head>
      <AllProducts apiEndpoint={ceramics} />
    </>
  );
}
