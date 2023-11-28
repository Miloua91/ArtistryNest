import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Crockery() {
  const { searchQuery } = useSearch();
  const crockery = `/api/category?category=crockery&search=${searchQuery}`;
  return (
    <>
      <AllProducts apiEndpoint={crockery} />
    </>
  );
}
