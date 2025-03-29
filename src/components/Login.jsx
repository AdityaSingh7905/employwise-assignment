import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const emailIsValid = email.trim().length > 0;
  const emailHasError = !emailIsValid && emailIsTouched;

  const [password, setPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const passwordIsValid = password.trim().length > 0;
  const passwordHasError = !passwordIsValid && passwordIsTouched;

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const API_BASE_URL = "https://reqres.in";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      setFormError("Both fields are required!");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok || !data.token) {
        throw new Error(data.error || "Invalid credentials: Login Failed!!");
      }

      // storing token in the local storage
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/users"); // Redirect to Users List
    } catch (err) {
      setFormError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login
        </h2>

        {formError && (
          <p className="text-red-500 text-lg text-center mb-3">{formError}</p>
        )}

        {loading ? <Loading change={"Logging..."} /> : ""}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailIsTouched(true)}
              className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition ${
                emailHasError ? "border-red-500 bg-red-100" : ""
              }`}
              placeholder="Enter your email"
            />
            {emailHasError && (
              <p className="text-red-500 text-sm">
                Please enter a valid email.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordIsTouched(true)}
              className={`w-full mt-1 p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 transition ${
                passwordHasError ? "border-red-500 bg-red-100" : ""
              }`}
              placeholder="Enter your password"
            />
            {passwordHasError && (
              <p className="text-red-500 text-sm">
                Please enter a valid password.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 font-bold text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
