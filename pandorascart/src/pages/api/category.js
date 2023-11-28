import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgdkamqbxvrywiscpsvh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function ProductCategory(req, res) {
  const { search } = req.query;
  const { category } = req.query;
  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, price, image, category")
    .eq("category", category)
    .ilike('product_name', `%${search}%`);
  res.status(200).json({ data: products, error });
}
