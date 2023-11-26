import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgdkamqbxvrywiscpsvh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Products(req, res) {
  const { id } = req.query;
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);
  res.status(200).json({ data: products });
}
