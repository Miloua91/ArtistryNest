import AllProducts from "@/pages/components/AllProducts";

export default function Pots() {
  const pots = "/api/category?category=pots";
  return (
    <>
      <AllProducts apiEndpoint={pots} />
    </>
  );
}
