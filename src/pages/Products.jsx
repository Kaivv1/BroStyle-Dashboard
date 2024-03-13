import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Sort from "../ui/Sort";

function Products() {
  return (
    <div>
      <div>
        <Heading as="h1">Products</Heading>
        <div>
          <Filter
            options={[
              { label: "All", value: "all" },
              { label: "With discount", value: "discount" },
              { label: "No discount", value: "no-discount" },
            ]}
          />
          <Sort options={[{ label: "Sort by name (A-Z)" }]} />
        </div>
      </div>
    </div>
  );
}

export default Products;
