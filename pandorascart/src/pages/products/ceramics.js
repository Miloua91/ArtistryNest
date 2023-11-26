import AllProducts from "@/pages/components/AllProducts";

export default function Ceramics() {
  const ceramics = "/api/category?category=ceramics";
  return (
    <>
      <AllProducts apiEndpoint={ceramics} />
    </>
  );
}
