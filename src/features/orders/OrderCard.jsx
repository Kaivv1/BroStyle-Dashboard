/* eslint-disable */

import { format, isToday } from "date-fns";
import {
  calcOrderTotalPrice,
  formatCurrency,
  formatDistanceFromNow,
} from "../../utils/helpers";
import { IoShirtOutline } from "react-icons/io5";
import { HiOutlineCheckCircle, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { useSettings } from "../settings/useSettings";

function OrderCard({ order }) {
  const {
    profiles: { full_name, email },
    address,
    country_flag,
    created_at,
    priority,
    payment_method,
    payment_status,
    order_items,
    phone,
  } = order;
  const { settings } = useSettings();
  const { totalItemsPrice, totalPrice } = calcOrderTotalPrice(
    order_items,
    priority && settings?.priority_price,
  );

  return (
    <div>
      <div className="rounded-md border-[0.1rem]  border-r-gray-200 dark:border-gray-700">
        <div className="flex justify-between rounded-t-md bg-color-brand-600 px-10 py-5 text-lg text-gray-100 dark:bg-color-brand-800 dark:text-gray-200">
          <p className="flex gap-2">
            <IoShirtOutline className="text-2xl" />
            <span>
              {order_items?.length}{" "}
              {order_items?.length === 1 ? "item" : "items"}
            </span>
          </p>
          <p>
            Ordered on {format(new Date(created_at), "EE MMM dd yyyy p")} (
            {isToday(new Date(created_at))
              ? "Today"
              : formatDistanceFromNow(created_at)}
            )
          </p>
        </div>
        <div className="space-y-10 rounded-b-md bg-white px-10 py-7 dark:bg-gray-800">
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-2 rounded-2xl bg-gray-200 px-3 py-1 dark:bg-gray-600">
              <span>
                <img className="inline-block w-6" src={country_flag} alt="" />
              </span>
              <span>{full_name}</span>
            </p>
            <p className="space-x-2 dark:text-gray-300">
              <span>&bull;</span>
              <span>{email}</span>
            </p>
            <p className="space-x-2 dark:text-gray-300">
              <span>&bull;</span>
              <span>{address}</span>
            </p>
            <p className="space-x-2 dark:text-gray-300">
              <span>&bull;</span>
              <span>{phone}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <HiOutlineCheckCircle className="text-2xl text-color-brand-600" />
              <span>Is it priority order ?</span>
              {priority ? <span>Yes</span> : <span>No</span>}
            </p>
            <p className="flex items-center gap-2">
              <HiOutlineCheckCircle className="text-2xl text-color-brand-600" />
              <span>Payment method ?</span>
              <span>
                {payment_method === "delivery"
                  ? "Will pay on delivery"
                  : "Paid with card"}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            {order_items?.map((order_item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img
                  src={order_item?.products?.picture}
                  alt=""
                  className="aspect-video h-12 w-11"
                />
                <p>
                  {order_item?.products?.name}{" "}
                  <span>({formatCurrency(order_item?.products?.price)})</span>
                </p>
                <span>x</span>
                <p>{order_item?.quantity}</p>
                {order_item?.products?.discount && (
                  <>
                    <span>-</span>
                    <p>{`${formatCurrency(order_item?.products?.discount)} discount`}</p>
                    <span>x</span>
                    <p>{order_item?.quantity}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div
            className={`flex justify-between rounded-md p-5 font-semibold ${payment_status ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"}`}
          >
            <div className="flex gap-3">
              <p className="flex items-center gap-1">
                <HiOutlineCurrencyDollar className="text-2xl" />
                <span>Total Price</span>
              </p>
              <p className="space-x-1">
                <span>{formatCurrency(totalPrice)}</span>
                {priority && (
                  <span>
                    ({formatCurrency(totalItemsPrice)} products +{" "}
                    {formatCurrency(settings?.priority_price)} priority price)
                  </span>
                )}
              </p>
            </div>
            <p>{payment_status ? "PAID" : "WILL PAY ON DELIVERY"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
