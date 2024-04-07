/* eslint-disable */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { SlLocationPin } from "react-icons/sl";
import FakeCart from "../../ui/FakeCart";
import { useState } from "react";
import { calcOrderTotalPrice, formatCurrency } from "../../utils/helpers";
import { useGetAddress } from "./useGetAddress";
import { useSettings } from "../settings/useSettings";
import { useUser } from "../authentication/useUser";
import { useCreateOrder } from "./useCreateOrder";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";

function CreateOrderForm({ onClose }) {
  const [orderItems, setOrderItems] = useState([]);
  const [priority, setPriority] = useState(false);
  const { register, formState, handleSubmit, setValue } = useForm();
  const { errors } = formState;
  const { address, countryFlag } = useGetAddress();
  const { createOrder, isCreating } = useCreateOrder();
  const { user } = useUser();
  const { settings } = useSettings();
  const { totalPrice } = calcOrderTotalPrice(
    orderItems,
    priority && settings?.priority_price,
  );

  function addItem(item) {
    const isAdded = orderItems.some(
      (orderItem) => orderItem.products.id === item.products.id,
    );
    if (isAdded) return;

    setOrderItems((prev) => [...prev, item]);
  }

  function removeItem(id) {
    setOrderItems((prev) =>
      prev.filter(({ products: product }) => product.id !== id),
    );
  }

  function onSubmit(data) {
    if (!orderItems.length)
      return toast.error("If you are going to make a order, add products!");

    createOrder(
      {
        order: {
          ...data,
          priority,
          address,
          country_flag: countryFlag,
          profile_id: user.id,
        },
        orderItems,
      },
      {
        onSettled: () => onClose(),
      },
    );
  }

  console.log(orderItems);
  return (
    <form className="w-auto sm:w-[30rem]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 ">
        <FakeCart onAdd={addItem} onDelete={removeItem} />
        {orderItems.length >= 1 && (
          <div className="input max-h-24 space-y-1 overflow-auto">
            {orderItems.map(({ quantity, products: product }) => (
              <div key={product.id} className="flex items-center gap-3">
                <p className="space-x-2">
                  <span>
                    {product.name} ({formatCurrency(product.price)})
                  </span>
                  <span> x </span>
                  <span>{quantity}</span>
                </p>
                <button
                  type="button"
                  className="buttonDelete px-2 py-1 text-xs"
                  onClick={() => removeItem(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <FormRow
          label="Address"
          className="col-span-full"
          error={errors?.address?.message}
        >
          <div className="relative">
            <input
              type="text"
              className="input w-full pr-14"
              {...register("address", { required: "This field is required" })}
            />
            <button
              type="button"
              className="buttonDefault absolute right-2 top-[0.32rem] gap-0 px-2 py-[0.3rem] text-sm"
              onClick={() => {
                setValue("address", address);
              }}
            >
              +<SlLocationPin />
            </button>
          </div>
        </FormRow>
        <FormRow label="Payment methods" error={errors?.delivery?.message}>
          <select
            defaultValue="delivery"
            id="payment"
            className="select text-base"
            {...register("payment_method")}
          >
            <option value="delivery">On delivery</option>
            <option value="card">With card</option>
          </select>
        </FormRow>
        <FormRow label="Phone number" error={errors?.phone?.message}>
          <input
            type="tel"
            className="input"
            id="phone"
            {...register("phone", {
              required: "This field is required",
              pattern: {
                value:
                  /^(?:\+\d{1,3})?(?:[ -]?\(?\d{3}\)?[ -]?)?\d{3}(?:[ -]?\d{3}){1,2}(?: ?(?:x|ext)\.? ?\d{1,5})?$/,
                message: "Invalid phone number",
              },
            })}
          />
        </FormRow>
        <FormRow>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="size-6 hover:cursor-pointer focus:outline-none"
              id="priority"
              defaultValue={priority}
              onChange={() => setPriority((priority) => !priority)}
            />
            <label htmlFor="priority">Make it a priority order</label>
          </div>
        </FormRow>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 sm:mt-6">
        <button className="buttonOutlined" onClick={onClose}>
          Cancel
        </button>
        <button className="buttonDefault" type="submit">
          {isCreating ? (
            <>
              <span>Creating</span>
              <Loader color="white" size="sm" />
            </>
          ) : (
            <span>
              Create order{" "}
              {orderItems.length === 0 ? "$0" : formatCurrency(totalPrice)}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateOrderForm;
