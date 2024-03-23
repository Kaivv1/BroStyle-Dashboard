/* eslint-disable react/prop-types */
import Heading from "./Heading";
import Loader from "./Loader";

function ConfirmDelete({ resourseName, onClose, onDelete, isLoading }) {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h4">Deleting {resourseName}</Heading>
      <p className="">Are you sure you want to delete this {resourseName} ?</p>
      <div className="flex items-center justify-between">
        <button className="buttonOutlined" onClick={onClose}>
          Cancel
        </button>
        <button
          className="buttonDelete"
          onClick={onDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Deleting</span>
              <Loader size="sm" color="white" />
            </>
          ) : (
            <>
              <span>Delete</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
