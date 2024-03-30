import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function ProductsTableOperations() {
  return (
    <div className="flex items-center gap-3">
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "With discount", value: "with-discount" },
          { label: "No discount", value: "no-discount" },
        ]}
      />
      <Sort
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by category (A-Z)", value: "category-asc" },
          { label: "Sort by category (Z-A)", value: "category-desc" },
          { label: "Sort by price (high first)", value: "price-asc" },
          { label: "Sort by price (low first)", value: "price-desc" },
          {
            label: "Sort by quantity (high first)",
            value: "stockQuantity-asc",
          },
          {
            label: "Sort by quantity (low first)",
            value: "stockQuantity-desc",
          },
          { label: "Sort by date (recent)", value: "date-asc" },
          { label: "Sort by date (oldest)", value: "date-desc" },
        ]}
      />
    </div>
  );
}

export default ProductsTableOperations;
