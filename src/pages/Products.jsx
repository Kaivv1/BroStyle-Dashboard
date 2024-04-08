/* eslint-disable */
import AddProduct from "../features/products/AddProduct";
import ProductsTable from "../features/products/ProductsTable";
import ProductsTableOperations from "../features/products/ProductsTableOperations";
import { useProducts } from "../features/products/useProducts";
import Heading from "../ui/Heading";

function Products() {
  const { isLoading, products, count } = useProducts();

  return (
    <div className="flex flex-col gap-4 xl:gap-8">
      <div className="flex items-center justify-between">
        <Heading as="h1">Products</Heading>
        <ProductsTableOperations />
      </div>
      <ProductsTable products={products} isLoading={isLoading} count={count} />
      {!isLoading && <AddProduct />}
    </div>
  );
}

export default Products;
