import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgdkamqbxvrywiscpsvh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function PopularProducts(req, res) {
  const { data: data , error } = await supabase
    .from("best_sellers")
    .select("*");
  res.status(200).json({ data: data, error });
}
