import { formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

export function getImageName(imageUrl) {
  const imagePathArr = imageUrl.split("/");
  const imageName = imagePathArr[imagePathArr.length - 1].split("?")[0];

  return imageName;
}

export function calcOrderTotalPrice(order_items, priorityPrice = 0) {
  const totalItemsPrice = order_items?.reduce((acc, order_item) => {
    const discount =
      (order_item?.products?.discount ?? 0) * order_item?.quantity;

    const price = acc + order_item?.products?.price * order_item?.quantity;

    return price - discount;
  }, 0);

  const totalPrice = totalItemsPrice + priorityPrice;

  return { totalPrice, totalItemsPrice };
}

export const formatDistanceFromNow = (dataStr) =>
  formatDistance(parseISO(dataStr), new Date(), { addSuffix: true });
