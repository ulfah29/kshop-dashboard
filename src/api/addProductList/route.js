import { supabase } from "../lib/supabase";

export async function POST(request) {
  try {
    const { name, price, currency = 'KRW', stock = 0 } = await request.json();

    if (!name || !Number.isFinite(Number(price))) {
      return Response.json(
        { error: 'name and a valid price are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('product_list')
      .insert({
        name,
        // price: Number(price),
        // currency,
        // stock: Number(stock),
      })
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}