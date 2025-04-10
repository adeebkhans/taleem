import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ Import Redux hooks
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginSuccess, logout } from "../redux/authSlice"; // ✅ Import Redux actions

// const API_URL = "http://localhost:3000/api/auth";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const dispatch = useDispatch(); // ✅ Use Redux dispatch
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login/Signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/${isLogin ? "login" : "signup"}`,
        formData,
        { withCredentials: true }
      );

      dispatch(loginSuccess(response.data)); // ✅ Store user & token in Redux
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const decoded = jwtDecode(credential);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/google-login`, { tokenId: credential }, { withCredentials: true });

      dispatch(loginSuccess({ user: decoded, token: credential })); // ✅ Store Google user in Redux
    } catch (error) {
      setError(error.response?.data?.message || "Google authentication failed");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    dispatch(logout()); // ✅ Clear user from Redux
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">Welcome, {user.name}!</h2>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {isLogin ? "Login" : "Signup"}
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>

            <div className="text-center my-4 text-gray-600">OR</div>

            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleLogin} onError={() => setError("Google login failed")} />
            </div>

            <p className="text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 font-semibold hover:underline"
              >
                {isLogin ? "Signup" : "Login"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
