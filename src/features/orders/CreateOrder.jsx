import { useToggleModal } from "../../hooks/useToggleModal";
import Modal from "../../ui/Modal";
import CreateOrderForm from "./CreateOrderForm";

function CreateOrder() {
  const { isOpen, toggleOpenModal } = useToggleModal();

  return (
    <>
      <div>
        <button onClick={toggleOpenModal} className="buttonDefault">
          + Simulate order
        </button>
      </div>
      {isOpen && (
        <Modal onClose={toggleOpenModal}>
          <CreateOrderForm onClose={toggleOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateOrder;
