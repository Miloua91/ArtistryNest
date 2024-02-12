import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Products(req, res) {
  const { search } = req.query;
  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, image, price, date_added")
    .ilike('product_name', `%${search}%`);
  res.status(200).json({ data: products, error });
}
