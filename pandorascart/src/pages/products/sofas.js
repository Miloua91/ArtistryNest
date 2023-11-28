import AllProducts from "@/pages/components/AllProducts";
import { useSearch } from "@/context/SearchContext";

export default function Sofas() {
  const { searchQuery } = useSearch();
  const sofas = `/api/category?category=sofas&search=${searchQuery}`;
  return (
    <>
      <AllProducts apiEndpoint={sofas} />
    </>
  );
}
