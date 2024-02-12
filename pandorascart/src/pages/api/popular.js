import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function PopularProducts(req, res) {
  const { data: popular_products, error } = await supabase
    .from("popular_products")
    .select("*");
  res.status(200).json({ data: popular_products });
}
