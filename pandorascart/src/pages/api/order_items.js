import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function OrderItems(req, res) {
  if (req.method === "POST") {
    try {
      const { data: orders_items, error } = await supabase
        .from("orders_items")
        .insert(req.body);
      if (error) {
        throw error;
      }
      res.status(200).json({ data: orders_items });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting order items", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
