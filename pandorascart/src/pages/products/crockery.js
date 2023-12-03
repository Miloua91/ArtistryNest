import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Crockery() {
  const { searchQuery } = useSearch();
  const crockery = `/api/category?category=crockery&search=${searchQuery}`;
  return (
    <>
      <Head>
        <title>Crockery | ArtistryNest</title>
      </Head>
      <AllProducts apiEndpoint={crockery} />
    </>
  );
}
