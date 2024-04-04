/* eslint-disable */
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../contexts/useDarkMode";
import Heading from "../../ui/Heading";

function CategorySalesChart({ orders }) {
  const { isDarkMode } = useDarkMode();
  let tshirtsCount = 0;
  let hoodiesCount = 0;

  orders?.forEach((order) => {
    order?.order_items?.forEach(({ products: product, quantity }) => {
      if (product.category === "t-shirts") {
        tshirtsCount += quantity;
      }
      if (product.category === "hoodies") {
        hoodiesCount += quantity;
      }
    });
  });

  const data = [
    {
      category: "T-shirts",
      value: tshirtsCount,
      color: isDarkMode ? "#0369a1" : "#0ea5e9",
    },
    {
      category: "Hoodies",
      value: hoodiesCount,
      color: isDarkMode ? "#1d4ed8" : "#2563eb",
    },
  ];

  return (
    <div className="space-y-3 rounded-md border-[0.1rem] border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
      <Heading as="h5">Sold products by category</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            nameKey="category"
            dataKey="value"
            data={data}
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={5}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategorySalesChart;
