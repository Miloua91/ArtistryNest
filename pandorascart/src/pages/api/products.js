import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mgdkamqbxvrywiscpsvh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function Products(req, res){
  const { data: products, error } = await supabase
  .from('products')
  .select('*')
  res.status(200).json({ data: products });
}
