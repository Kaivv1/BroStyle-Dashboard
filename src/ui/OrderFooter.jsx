/* eslint-disable*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../features/settings/useSettings";
import { calcOrderTotalPrice, formatCurrency } from "../utils/helpers";
import { useUpdateOrder } from "../features/orders/useUpdateOrder";
import Loader from "./Loader";
import CheckBoxInput from "./CheckBoxInput";

function OrderFooter({ order, onToggle }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const {
    status,
    profiles: { full_name },
    order_items,
    priority,
    id,
    payment_method,
  } = order;

  const { settings } = useSettings();
  const { totalPrice } = calcOrderTotalPrice(
    order_items,
    priority && settings?.priority_price,
  );
  const { updateOrder, isUpdating } = useUpdateOrder();

  return (
    <>
      {status !== "completed" && (
        <div>
          {status === "pending" && (
            <CheckBoxInput
              isChecked={isProcessing}
              onChange={() => setIsProcessing((prev) => !prev)}
              isLoading={isUpdating}
            >
              I confirm that i am starting to prepare and shipping the order !
            </CheckBoxInput>
          )}
          {status === "processing" && (
            <CheckBoxInput
              isChecked={isCompleted}
              onChange={() => setIsCompleted((prev) => !prev)}
              isLoading={isUpdating}
            >
              {`I confirm that order #${id < 10 && "0"}${id} have been delivered ${payment_method === "delivery" ? `and ${full_name} have payed the total amount of ${formatCurrency(totalPrice)}` : `to ${full_name}`}`}
            </CheckBoxInput>
          )}
        </div>
      )}
      <div className="flex justify-end gap-3">
        {status === "pending" && (
          <button
            className="buttonDefault"
            onClick={() => {
              updateOrder({ id, updatedOrder: { status: "processing" } });
            }}
            disabled={!isProcessing || isUpdating}
          >
            {isUpdating ? (
              <>
                <span>Updating</span>
                <Loader size="sm" color="white" />
              </>
            ) : (
              "Start processing"
            )}
          </button>
        )}
        {status === "processing" && (
          <button
            className="buttonDefault"
            onClick={() => {
              updateOrder({ id, updatedOrder: { status: "completed" } });
            }}
            disabled={!isCompleted || isUpdating}
          >
            {isUpdating ? (
              <>
                <span>Updating</span>
                <Loader size="sm" color="white" />
              </>
            ) : (
              "Complete order"
            )}
          </button>
        )}
        <button onClick={onToggle} className="buttonDelete">
          Delete
        </button>
        <button
          onClick={() => navigate(-1)}
          className="buttonOutlined bg-white dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default OrderFooter;
