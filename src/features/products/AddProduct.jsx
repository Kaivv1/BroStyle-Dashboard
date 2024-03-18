import Modal from "../../ui/Modal";
import AddEditProductForm from "./AddEditProductForm";
import { useToggleModal } from "../../hooks/useToggleModal";

function AddProduct() {
  const { isOpen, toggleOpenModal } = useToggleModal();

  return (
    <>
      <div>
        <button onClick={toggleOpenModal} className="buttonDefault">
          + Add new product
        </button>
      </div>
      {isOpen && (
        <Modal onClose={toggleOpenModal}>
          <AddEditProductForm onClose={toggleOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default AddProduct;
