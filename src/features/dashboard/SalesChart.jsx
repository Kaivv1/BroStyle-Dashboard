/* eslint-disable */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSettings } from "../settings/useSettings";
import { calcOrderTotalPrice } from "../../utils/helpers";
import { useDarkMode } from "../../contexts/useDarkMode";

function SalesChart({ numDays, orders }) {
  const { settings } = useSettings();
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: orders
        ?.filter((order) => isSameDay(date, new Date(order.created_at)))
        ?.reduce((acc, order) => {
          const { totalPrice } = calcOrderTotalPrice(
            order?.order_items,
            order?.priority && settings?.priority_price,
          );
          return acc + totalPrice;
        }, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#fff",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <div className="space-y-3 rounded-md border-[0.1rem] border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      <Heading as="h5">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={colors.text}
          />
          <YAxis unit="$" tick={{ fill: colors.text }} tickLine={colors.text} />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
