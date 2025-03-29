import Loading from "./Loading";

const DeleteUser = ({ firstName, onCancel, onDelete, deleteLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete {firstName}?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        {deleteLoading && <Loading change={"Deleting User..."} />}
      </div>
    </div>
  );
};

export default DeleteUser;
