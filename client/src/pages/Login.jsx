import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData((currData) => ({
      ...currData,
      [name]: value,
    }));

    setErrors((currErrors) => ({
      ...currErrors,
      [name]: "",
    }));

    setServerError("");
  };

  const validate = () => {
    let newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setServerError("");

    API.post("/api/auth/login", loginData)
      .then((res) => {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setServerError(
          err.response?.data?.message || "Invalid email or password",
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your SkillTrade account
        </p>

        {serverError && (
          <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleInputChange}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:border-purple-500"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleInputChange}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
