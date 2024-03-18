import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function ProductsTableOperations() {
  return (
    <div className="flex items-center gap-3">
      <Filter
        options={[
          { label: "All", value: "all" },
          { label: "With discount", value: "discount" },
          { label: "No discount", value: "no-discount" },
        ]}
      />
      <Sort
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by category (t-shirts)", value: "t-shirts" },
          { label: "Sort by category (hoodies)", value: "hoodies" },
          { label: "Sort by price (high first)", value: "price-asc" },
          { label: "Sort by price (low first)", value: "price-desc" },
          { label: "Sort by quantity (high first)", value: "quantity-asc" },
          { label: "Sort by quantity (low first)", value: "quantity-desc" },
          { label: "Sort by date (recent)", value: "date-asc" },
          { label: "Sort by date (oldest)", value: "date-desc" },
        ]}
      />
    </div>
  );
}

export default ProductsTableOperations;
