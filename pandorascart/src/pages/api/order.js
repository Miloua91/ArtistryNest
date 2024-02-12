import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Order(req, res) {
  if (req.method === "POST") {
    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .insert(req.body);
      if (error) {
        throw error;
      }
      res.status(200).json({ data: orders });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting orders", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
