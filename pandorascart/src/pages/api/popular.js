import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgdkamqbxvrywiscpsvh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function PopularProducts(req, res) {
  const { data: popular_products, error } = await supabase
    .from("popular_products")
    .select("*");
  res.status(200).json({ data: popular_products });
}
