import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function PopularProducts(req, res) {
  const { data: data , error } = await supabase
    .from("best_sellers")
    .select("*");
  res.status(200).json({ data: data, error });
}
