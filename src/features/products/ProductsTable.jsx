/* eslint-disable */
import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import ProductRow from "./ProductRow";
import ProductsTableHeader from "./ProductsTableHeader";
function ProductsTable({ products, isLoading }) {
  if (isLoading) return <Loader size="lg" />;

  if (!products?.length) return <Empty resourceName="products" />;

  return (
    <div className="rounded-md border-[0.1rem] border-gray-200 dark:border-gray-700 ">
      <ProductsTableHeader />
      {products?.map((product) => (
        <ProductRow product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsTable;
