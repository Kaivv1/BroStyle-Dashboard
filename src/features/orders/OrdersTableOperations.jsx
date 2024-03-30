import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function OrdersTableOperations() {
  return (
    <div className="flex items-center gap-3">
      <Filter
        filterField="status"
        options={[
          { label: "All", value: "all" },
          { label: "Completed", value: "completed" },
          { label: "Processing", value: "processing" },
          { label: "Pending", value: "pending" },
        ]}
      />
      <Sort
        options={[
          { label: "Sort by date (recent)", value: "date-asc" },
          { label: "Sort by date (oldest)", value: "date-desc" },
          { label: "Sort by price (high first)", value: "price-asc" },
          { label: "Sort by price (low first)", value: "price-desc" },
        ]}
      />
    </div>
  );
}

export default OrdersTableOperations;
