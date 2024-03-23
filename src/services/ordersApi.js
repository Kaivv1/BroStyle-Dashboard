import { supabase } from "./supabase";

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      "*, profiles(email, full_name), order_items(products(*), quantity)",
    );

  if (error) throw new Error("There was a problem getting the orders");

  return data;
}

export async function getOrderById(id) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*, profiles(full_name, email), order_items(products(*), quantity)")
    .eq("id", id)
    .single();

  if (error) throw new Error("There was a problem fetching this order");

  return order;
}

export async function updateOrder(id, updatedOrder) {
  const { data, error } = await supabase
    .from("orders")
    .update(updatedOrder)
    .eq("id", id)
    .single();

  if (error) throw new Error("There was a error updating the order status");

  console.log(data);
  return data;
}

export async function deleteOrder(id) {
  const { error: deleteOrderItemsError } = await supabase
    .from("order_items")
    .delete()
    .eq("orderID", id);

  const { error: deleteOrderError } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .single();

  if (deleteOrderError || deleteOrderItemsError)
    throw new Error("There was a problem deleting this order");
}
