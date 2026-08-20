import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSignUpData((currData) => ({
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

    if (!signUpData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (signUpData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!signUpData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!signUpData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signUpData.password.length < 6) {
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

    API.post("/api/auth/signup", signUpData)
      .then((res) => {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setServerError(err.response?.data?.message || "Signup failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-center text-3xl font-bold mb-2 text-gray-800">
          Create Account
        </h1>

        <p className="text-center mb-8 text-gray-500">Join SkillTrade today</p>

        {serverError && (
          <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Username
            </label>

            <input
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
              type="text"
              placeholder="Enter username"
              value={signUpData.username}
              onChange={handleInputChange}
              name="username"
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>

            <input
              className="border w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:border-purple-500"
              type="email"
              placeholder="Enter your email"
              value={signUpData.email}
              onChange={handleInputChange}
              name="email"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <input
              className="w-full border px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:border-purple-500"
              type="password"
              placeholder="Enter your password"
              value={signUpData.password}
              onChange={handleInputChange}
              name="password"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mb-6 bg-purple-700 py-3 rounded-lg text-white font-semibold hover:bg-purple-800"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
