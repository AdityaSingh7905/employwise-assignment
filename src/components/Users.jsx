import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DeleteUser from "./DeleteUser";
import Loading from "./Loading";

export default function Users() {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const API_BASE_URL = "https://reqres.in/api/users";

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}?page=${currentPage}`);
        const data = await res.json();
        if (data.data.length === 0) {
          setUsers([]);
        } else {
          setUsers(data.data);
        }
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false); //Ensure loading is set to false
      }
    };

    if (users.length === 0) {
      fetchUsers();
    } else {
      setLoading(false); //If users exist, still stop loading
    }
  }, [currentPage, users]);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/${userToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // remove the user from the user list using filter
        setUsers(users.filter((user) => user.id !== userToDelete.id));
      } else {
        throw new Error("Failed to delete user.");
      }
    } catch (err) {
      setError("Error deleting user.");
    } finally {
      setDeleteLoading(false);
      closeDeleteModal();
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        ResReq Users List
      </h2>

      {loading && <Loading change={"Fetching Users..."} />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-24 h-24 rounded-full border-4 border-gray-300 mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="mt-4 space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                  onClick={() => navigate(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
                  onClick={() => openDeleteModal(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
            // setting users to empty so that when pages change fetchUsers() is called and
            // users are fetched from the api
            setUsers([]);
          }}
          disabled={currentPage === 1}
          className={`px-4 py-2 font-semibold rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-800 font-semibold">Page {currentPage}</span>
        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            setUsers([]);
          }}
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {showDeleteModal && (
        <DeleteUser
          firstName={userToDelete.first_name}
          onCancel={closeDeleteModal}
          onDelete={handleDeleteConfirm}
          deleteLoading={deleteLoading}
        />
      )}
    </div>
  );
}
