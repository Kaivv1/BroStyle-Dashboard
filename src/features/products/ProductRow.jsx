/* eslint-disable */
import { HiOutlinePencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import TableRowButtons from "../../ui/TableRowButtons";
import { useDeleteProduct } from "./useDeleteProduct";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useToggleModal } from "../../hooks/useToggleModal";
import AddEditProductForm from "./AddEditProductForm";

function ProductRow({ product }) {
  const { name, category, stockQuantity, price, discount, picture, id } =
    product;
  const {
    isOpen: isOpenDeleteModal,
    isOpenSecond: isOpenEditModal,
    toggleOpenModal: toggleDeleteModal,
    toggleOpenSecondModal: toggleEditModal,
  } = useToggleModal();
  const { isDeleting, deleteProduct } = useDeleteProduct();

  function handleDeleteProduct() {
    deleteProduct(id, {
      onSettled: () => toggleDeleteModal(),
    });
  }

  return (
    <>
      <div className="grid grid-cols-[0.2fr_0.7fr_1.5fr_1fr_1fr_1fr_1fr] items-center gap-4 border-b-[0.1rem] border-b-gray-200 bg-white px-4 py-1 text-center text-sm font-semibold last:rounded-b-md last:border-none dark:border-b-gray-700 dark:bg-gray-800">
        <TableRowButtons>
          <button className="buttonTableRow" onClick={toggleEditModal}>
            <HiOutlinePencil />
            <span>Edit</span>
          </button>
          <button className="buttonTableRow" onClick={toggleDeleteModal}>
            <HiOutlineTrash />
            <span>Delete</span>
          </button>
        </TableRowButtons>
        <img
          src={picture}
          alt={`Picture of ${name}`}
          className="aspect-square h-20 w-20 object-cover object-center"
        />
        <p>{name}</p>
        <p className="capitalize">{category}</p>
        <p>{stockQuantity} in stock</p>
        <p>{formatCurrency(price)}</p>
        <p>{discount ? formatCurrency(discount) : "-"}</p>
      </div>
      {isOpenDeleteModal && (
        <Modal onClose={toggleDeleteModal}>
          <ConfirmDelete
            resourseName="product"
            isLoading={isDeleting}
            onClose={toggleDeleteModal}
            onDelete={() => handleDeleteProduct()}
          />
        </Modal>
      )}
      {isOpenEditModal && (
        <Modal onClose={toggleEditModal}>
          <AddEditProductForm
            productToEdit={product}
            onClose={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
}

export default ProductRow;
