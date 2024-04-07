/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateProduct } from "./useCreateProduct";
import Loader from "../../ui/Loader";
import { useEditProduct } from "./useEditProduct";

function AddEditProductForm({ productToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { createProduct, isCreating } = useCreateProduct();
  const { editProduct, isEditing } = useEditProduct();

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    const picture =
      typeof data.picture === "string" ? data.picture : data.picture[0];

    if (isEditSession) {
      editProduct(
        { editedProduct: { ...data, picture }, id: editId },
        {
          onSettled: () => onClose(),
        },
      );
    } else {
      createProduct(
        { ...data, picture },
        {
          onSettled: () => onClose(),
        },
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
        <FormRow label="Product name" error={errors?.name?.message}>
          <input
            type="text"
            className="input"
            id="name"
            {...register("name", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Category">
          <select id="category" {...register("category")} className="input">
            <option value="t-shirts">t-shirts</option>
            <option value="hoodies">hoodies</option>
          </select>
        </FormRow>
        <FormRow label="Stock" error={errors?.stockQuantity?.message}>
          <input
            type="number"
            id="stockQuantity"
            className="input"
            min={0}
            {...register("stockQuantity", {
              required: "This field is required",
              min: { value: 0, message: "Value must be greater or equal to 0" },
            })}
          />
        </FormRow>
        <FormRow label="Price" error={errors?.price?.message}>
          <input
            type="number"
            id="price"
            step="any"
            min={0}
            className="input"
            {...register("price", {
              required: "This field is required",
              min: { value: 0, message: "Value must be greater or equal to 0" },
            })}
          />
        </FormRow>
        <FormRow label="Discount" error={errors?.discount?.message}>
          <input
            type="number"
            id="discount"
            step="any"
            min={0}
            defaultValue={0}
            className="input"
            {...register("discount", {
              min: { value: 0, message: "Value must be greater or equal to 0" },
            })}
          />
        </FormRow>
        <FormRow label="Image" error={errors?.picture?.message}>
          <label>
            <input
              type="file"
              id="picture"
              accept="image/*"
              className="rounded-md"
              {...register(
                "picture",
                !isEditSession && {
                  required: "This field is required",
                },
              )}
            />
          </label>
        </FormRow>
        <FormRow label="Description for website" className="sm:col-span-full">
          <textarea
            id="description"
            {...register("description")}
            className="input resize-none"
            rows="5"
          ></textarea>
        </FormRow>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 sm:mt-6">
        <button onClick={onClose} className="buttonOutlined">
          Cancel
        </button>
        <button type="submit" className="buttonDefault" disabled={isLoading}>
          {isLoading ? (
            <>
              <span>{isEditSession ? "Editing..." : "Creating..."}</span>
              <Loader size="sm" color="white" />
            </>
          ) : (
            <span>{isEditSession ? "Edit product" : "Create new product"}</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default AddEditProductForm;
