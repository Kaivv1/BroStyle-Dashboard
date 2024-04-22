/* eslint-disable */
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import ProductRow from "./ProductRow";
import ProductsTableHeader from "./ProductsTableHeader";

function ProductsTable({ products, isLoading }) {
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";

  let filteredProducts;
  if (filteredValue === "all") filteredProducts = products;
  if (filteredValue === "no-discount")
    filteredProducts = products?.filter((product) => product.discount === 0);
  if (filteredValue === "with-discount")
    filteredProducts = products?.filter((product) => product.discount > 0);

  const sortBy = searchParams.get("sortBy") || "created_at-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (field === "name" || field === "category") {
      return a[field].localeCompare(b[field]) * modifier;
    } else if (field === "date") {
      return (new Date(a["created_at"]) - new Date(b["created_at"])) * modifier;
    } else if (field === "price" || field === "stockQuantity") {
      return (b[field] - a[field]) * modifier;
    } else {
      return 0;
    }
  });

  if (isLoading) return <Loader size="lg" />;

  if (!products?.length) return <Empty resourceName="products" />;

  return (
    <div className="rounded-md border-[0.1rem] border-gray-200 dark:border-gray-700 dark:shadow-md">
      <ProductsTableHeader />
      {sortedProducts?.map((product) => (
        <ProductRow product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsTable;
