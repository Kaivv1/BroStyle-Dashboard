/* eslint-disable  */
import TableRowButtons from "../../ui/TableRowButtons";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi2";
import { useSettings } from "../settings/useSettings";
import { calcOrderTotalPrice, formatCurrency } from "../../utils/helpers";
import OrderStatus from "../../ui/OrderStatus";
import { format } from "date-fns";
import { useDeleteOrder } from "./useDeleteOrder";
import { useToggleModal } from "../../hooks/useToggleModal";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";

function OrderRow({ order }) {
  const navigate = useNavigate();
  const {
    id,
    status,
    profiles: { full_name, email },
    order_items,
    priority,
    created_at,
  } = order;

  const { settings } = useSettings();
  const { deleteOrder, isDeleting } = useDeleteOrder(id);
  const { isOpen, toggleOpenModal } = useToggleModal();
  const { totalPrice } = calcOrderTotalPrice(
    order_items,
    priority && settings?.priority_price,
  );

  function handleDelete() {
    deleteOrder(id, {
      onSettled: () => toggleOpenModal(),
    });
  }

  return (
    <>
      <div className="grid grid-cols-[0.2fr_0.6fr_1.5fr_1fr_1fr_1fr] items-center gap-4 border-b-[0.1rem] border-b-gray-200 bg-white px-4 py-1 text-center text-sm font-semibold last:rounded-b-md last:border-none dark:border-b-gray-700 dark:bg-gray-800">
        <TableRowButtons>
          <button
            className="buttonTableRow"
            onClick={() => navigate(`/orders/${id}`)}
          >
            <HiOutlineEye />
            <span>See details</span>
          </button>
          <button className="buttonTableRow" onClick={toggleOpenModal}>
            <HiOutlineTrash />
            <span>Delete</span>
          </button>
        </TableRowButtons>
        <p>
          #{`${id < 10 && "0"}`}
          {id}
        </p>
        <p className="flex flex-col">
          <span>{full_name}</span>
          <span className="font-normal text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </p>
        <p>{format(new Date(created_at), "MMM dd yyyy")}</p>
        <div className="flex items-center justify-center">
          <OrderStatus status={status} />
        </div>
        <span>{formatCurrency(totalPrice)}</span>
      </div>
      {isOpen && (
        <Modal onClose={toggleOpenModal}>
          <ConfirmDelete
            onClose={toggleOpenModal}
            resourseName="order"
            isLoading={isDeleting}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </>
  );
}

export default OrderRow;
