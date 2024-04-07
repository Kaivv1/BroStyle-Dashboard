/* eslint-disable */
import { useNavigate } from "react-router-dom";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import OrderStatus from "../../ui/OrderStatus";
import { useOrdersToday } from "./useOrdersToday";

function TodaysActivity() {
  const { isLoading, orders } = useOrdersToday();
  const navigate = useNavigate();

  return (
    <div className="space-y-3 rounded-md border-[0.1rem] border-gray-200 bg-white p-5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      <Heading as="h5">Today</Heading>
      <ul className="no-scrollbar h-60 overflow-auto">
        {isLoading ? (
          <div className="flex h-3/4 items-center justify-center">
            <Loader size="md2" />
          </div>
        ) : !orders?.length ? (
          <div className="flex h-3/4 items-center justify-center">
            <p className="text-base">No activity today</p>
          </div>
        ) : (
          orders?.map((order) => (
            <li
              key={order?.id}
              className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr] items-center gap-3 border-b-[0.1rem] border-b-gray-200 py-4 pr-1 dark:border-b-gray-700"
            >
              <OrderStatus status={order?.status} />
              <div className="box-border flex items-center">
                <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-1 dark:bg-gray-900">
                  <img
                    src={order?.country_flag}
                    alt=""
                    className="inline-block w-6"
                  />
                  <p>{order?.profiles?.full_name}</p>
                </div>
              </div>
              <p className="">
                {order?.order_items?.length}{" "}
                {order?.order_items?.length === 1 ? "item" : "items"}
              </p>
              <button
                className="buttonDefault justify-center px-3 py-1"
                onClick={() => navigate(`/orders/${order?.id}`)}
              >
                <span>View</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodaysActivity;
