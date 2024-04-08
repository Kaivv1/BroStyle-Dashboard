import { isToday } from "date-fns";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { supabase } from "./supabase";

export async function getOrders(page) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: orders,
    error,
    count,
  } = await supabase
    .from("orders")
    .select(
      "*, profiles(email, full_name), order_items(products(*), quantity)",
      { count: "exact" },
    )
    .range(from, to);

  if (error) throw new Error("There was a problem getting the orders");

  return { orders, count };
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

export async function getOrdersAfterDate(date) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, profiles(email, full_name), order_items(products(*), quantity)")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error)
    throw new Error("There was a problem getting the orders after this date");

  return orders;
}

export async function getOrdersToday() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, profiles(email, full_name), order_items(*)");

  const ordersToday = orders.filter((order) => isToday(order.created_at));

  if (error) throw new Error("Could not get todays activity");

  return ordersToday;
}

export async function createOrder({ order, orderItems }) {
  const payment_status = order.payment_method === "delivery" ? false : true;

  const { data: createdOrder, error: createOrderError } = await supabase
    .from("orders")
    .insert({ ...order, status: "pending", payment_status })
    .select()
    .single();

  const { error: itemsError } = await supabase.from("order_items").insert(
    orderItems.map(({ quantity, products }) => {
      return {
        quantity,
        productID: products.id,
        orderID: createdOrder.id,
      };
    }),
  );

  if (createOrderError || itemsError)
    throw new Error("There was a problem creating the order");
}
