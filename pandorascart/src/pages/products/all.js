import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function All() {
  const { searchQuery } = useSearch();
  const all = `/api/products?search=${searchQuery}`;
  return (
    <>
      <AllProducts apiEndpoint={all} />
    </>
  );
}
