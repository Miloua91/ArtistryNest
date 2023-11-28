import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Tables() {
  const { searchQuery } = useSearch();
  const lamps = `/api/category?category=lamps&search=${searchQuery}`;
  return (
    <>
      <AllProducts apiEndpoint={lamps} />
    </>
  );
}
