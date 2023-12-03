import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Pots() {
  const { searchQuery } = useSearch();
  const pots = `/api/category?category=pots&search=${searchQuery}`;
  return (
    <>
      <Head>
        <title>Plant Pots | ArtistryNest</title>
      </Head>
      <AllProducts apiEndpoint={pots} />
    </>
  );
}
