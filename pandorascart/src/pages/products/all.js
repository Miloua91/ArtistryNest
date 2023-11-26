import AllProducts from "@/pages/components/AllProducts";

export default function All() {
  const all = "/api/products";
  return (
    <>
      <AllProducts apiEndpoint={all} />
    </>
  );
}
