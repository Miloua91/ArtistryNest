import Head from "next/head";
import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function All() {
  const { searchQuery } = useSearch();
  const all = `/api/products?search=${searchQuery}`;
  return (
    <>
      <Head>
        <title>All products | ArtistryNest</title>
      </Head>
      <AllProducts pageHeader={"All products"} apiEndpoint={all} />
    </>
  );
}
