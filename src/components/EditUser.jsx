import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";

export default function EditUser() {
  const { id } = useParams();
  const { users, setUsers } = useContext(AuthContext);

  // Convert id to a number because it is a string
  console.log("Users data: ", users);
  const user = users?.find((user) => user.id === Number(id));
  console.log("Logging User: ", user);

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userEmailIsTouched, setUserEmailIsTouched] = useState(false);
  const userEmailIsValid = userEmail.trim().length > 0;
  const userEmailHasError = !userEmailIsValid && userEmailIsTouched;

  const [userFirstName, setUserFirstName] = useState("");
  const [userFirstNameIsTouched, setUserFirstNameIsTouched] = useState(false);
  const userFirstNameIsValid = userFirstName.trim().length > 0;
  const userFirstNameHasError = !userFirstNameIsValid && userFirstNameIsTouched;

  const [userLastName, setUserLastName] = useState("");
  const [userLastNameIsTouched, setUserLastNameIsTouched] = useState(false);
  const userLastNameIsValid = userLastName.trim().length > 0;
  const userLastNameHasError = !userLastNameIsValid && userLastNameIsTouched;

  const [userAvatar, setUserAvatar] = useState("");

  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const API_BASE_URL = "https://reqres.in/api/users";

  useEffect(() => {
    if (user) {
      setUserFirstName(user.first_name);
      setUserLastName(user.last_name);
      setUserEmail(user.email);
      setUserAvatar(user.avatar);
    }
  }, [user]);

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };
  const emailBlurHandler = () => {
    setUserEmailIsTouched(true);
  };

  const firstNameChangeHandler = (event) => {
    setUserFirstName(event.target.value);
  };
  const firstNameBlurHandler = () => {
    setUserFirstNameIsTouched(true);
  };

  const lastNameChangeHandler = (event) => {
    setUserLastName(event.target.value);
  };
  const lastNameBlurHandler = () => {
    setUserLastNameIsTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmailIsValid || !userFirstNameIsValid || !userLastNameIsValid) {
      setError("All fields are required!!");
      return;
    }
    setSaving(true);
    setError(null);
    const updatedUser = {
      id: Number(id),
      email: userEmail,
      first_name: userFirstName,
      last_name: userLastName,
      avatar: userAvatar,
    };
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to update user.");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      navigate("/users");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Edit User Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-center">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={userFirstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition ${
                userFirstNameHasError ? "border-red-500 bg-red-100" : ""
              }`}
            />
            {userFirstNameHasError && (
              <p className="text-red-500 text-sm mb-3">
                {"Please enter a valid first name."}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={userLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition ${
                userLastNameHasError ? "border-red-500 bg-red-100" : ""
              }`}
            />
            {userLastNameHasError && (
              <p className="text-red-500 text-sm mb-3">
                {"Please enter a valid last name."}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition ${
                userEmailHasError ? "border-red-500 bg-red-100" : ""
              }`}
            />
            {userEmailHasError && (
              <p className="text-red-500 text-sm mb-3">
                {"Please enter a valid email."}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={saving}
            >
              {saving ? (
                <Loading change={"Saving Changes..."} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
