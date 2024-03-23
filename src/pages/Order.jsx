/*eslint-disable */

import OrderCard from "../features/orders/OrderCard";
import Heading from "../ui/Heading";
import { useOrder } from "../features/orders/useOrder";
import Loader from "../ui/Loader";
import OrderStatus from "../ui/OrderStatus";
import { useQuery } from "@tanstack/react-query";
import { fetchAddress } from "../services/geoApi";
import { useDeleteOrder } from "../features/orders/useDeleteOrder";
import { useToggleModal } from "../hooks/useToggleModal";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";
import OrderButtons from "../ui/OrderFooter";

function Order() {
  const { order, isLoading } = useOrder();
  const { deleteOrder, isDeleting } = useDeleteOrder();
  const { isOpen, toggleOpenModal } = useToggleModal();

  function handleDelete() {
    deleteOrder(order?.id, {
      onSettled: () => toggleOpenModal(),
    });
  }
  // const { data } = useQuery({
  //   queryKey: ["address"],
  //   queryFn: fetchAddress,
  //   retry: false,
  // });

  // console.log(data);
  console.log(order);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Heading as="h1">
            Order #{order?.id < 10 && "0"}
            {order?.id}
          </Heading>
          <OrderStatus status={order?.status} />
        </div>
        {isLoading && <Loader size="lg" />}
        {!isLoading && (
          <>
            <OrderCard order={order} />
            <OrderButtons order={order} onToggle={toggleOpenModal} />
          </>
        )}
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

export default Order;
