/* eslint-disable */
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productsApi";
import { useRef, useState } from "react";

function FakeCart({ onAdd }) {
  const [{ quantity, item, showError, error }, setCurrItem] = useState({
    quantity: 0,
    item: null,
    showError: false,
    error: "",
  });
  const selectRef = useRef(null);
  const { data: products } = useQuery({
    queryKey: ["products", "fakeCart"],
    queryFn: getProducts,
  });

  function inc() {
    setCurrItem((prev) => ({ ...prev, error: "", showError: false }));
    setCurrItem((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }

  function dec() {
    if (quantity === 0) return;
    setCurrItem((prev) => ({ ...prev, error: "", showError: false }));
    setCurrItem((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  }

  function addItem() {
    if (quantity === 0) {
      setCurrItem((prev) => ({
        ...prev,
        showError: true,
        error: "Product must have quantity",
      }));
      return;
    }
    if (!item) {
      setCurrItem((prev) => ({
        ...prev,
        showError: true,
        error: "Please select a product",
      }));
      return;
    }

    onAdd({ quantity, products: item });
    setCurrItem({ quantity: 0, item: null, showError: false, error: "" });
    selectRef.current.selectedIndex = 0;
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="">Add products</label>
        {showError && <p className="text-red-600">{error}</p>}
      </div>
      <div className="grid grid-cols-[1fr_0.5fr_auto] items-center gap-4">
        <select
          className="select text-base"
          ref={selectRef}
          defaultValue="Select product"
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedProduct = products.find(
              (product) => product.id === +selectedId,
            );
            setCurrItem((prev) => ({
              ...prev,
              quantity: 1,
              item: selectedProduct,
            }));
          }}
        >
          <option disabled value="Select product">
            Select product
          </option>
          {products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-[auto_0.5fr_auto] items-center justify-center gap-3">
          <button
            type="button"
            className="buttonDefault gap-0 rounded-full px-[0.55rem] py-[0.1rem]"
            onClick={() => inc()}
          >
            <span>+</span>
          </button>
          <p className="text-center">{quantity}</p>
          <button
            type="button"
            className="buttonDefault rounded-full px-[0.55rem] py-[0.1rem]"
            onClick={() => dec()}
          >
            <span>-</span>
          </button>
        </div>
        <button
          type="button"
          className="buttonDefault px-2 py-2 text-sm"
          onClick={addItem}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default FakeCart;
