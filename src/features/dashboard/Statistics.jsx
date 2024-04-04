/* eslint-disable */
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineClipboardDocumentList,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { useSettings } from "../settings/useSettings";
import { calcOrderTotalPrice, formatCurrency } from "../../utils/helpers";
import Loader from "../../ui/Loader";

function Statistics({ orders, isLoading }) {
  const { settings } = useSettings();

  const totalSalesAmount = orders?.reduce((acc, order) => {
    const { totalPrice } = calcOrderTotalPrice(
      order?.order_items,
      order.priority && settings?.priority_price,
    );
    return acc + totalPrice;
  }, 0);

  const averageOrderValue = totalSalesAmount / orders?.length;

  return (
    <div className="grid grid-cols-3 gap-8">
      <Stat
        title="Total sales amount"
        icon={<HiOutlineBanknotes />}
        value={
          isLoading ? <Loader size="md2" /> : formatCurrency(totalSalesAmount)
        }
      />
      <Stat
        title="Total orders"
        icon={<HiOutlineClipboardDocumentList />}
        value={isLoading ? <Loader size="md2" /> : orders?.length}
      />
      <Stat
        title="Average order value"
        icon={<HiOutlineCurrencyDollar />}
        value={
          isLoading ? (
            <Loader size="md2" />
          ) : isNaN(averageOrderValue) ? (
            "$0.00"
          ) : (
            formatCurrency(averageOrderValue)
          )
        }
      />
    </div>
  );
}

export default Statistics;
