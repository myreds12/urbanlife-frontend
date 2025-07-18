import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Button from "../../Ui/button/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../ApiClient/apiClient";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      console.error("Validation errors:", newErrors);
      return;
    }

    try {
      const response = await apiClient.post("/auth/login", formData);

      const { accessToken } = response.data.data;


      // Simpan token & user info ke localStorage
      localStorage.setItem("authToken", accessToken); // penting!
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // penting!

      // Reset form
      setFormData({ email: "", password: "" });
      setErrors({});
      setShowPassword(false);

      // Toast dan redirect
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo */}
          <div className="mb-6 lg:mb-8 text-center">
            <img
              src="./images/All/Logo.png"
              alt="Urbanlife Logo"
              className="h-10 sm:h-12 lg:h-14 mb-2 mx-auto"
            />
          </div>

          {/* Sign In Form */}
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
              Sign In
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
          </div>

          <form
            className="space-y-4 sm:space-y-5 lg:space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="holiday@gmail.com"
                className={`w-full px-3 py-3 sm:py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Min. 6 characters"
                  className={`w-full px-3 py-3 sm:py-3.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base transition-colors ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-lg transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full py-3 sm:py-3.5 text-sm sm:text-base font-medium"
              disabled={
                !formData.email ||
                !formData.password ||
                formData.password.length < 6
              }
            >
              Sign In
            </Button>{" "}
          </form>
        </div>
      </div>

      {/* Right Side - Dashboard Preview */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-cyan-500 to-cyan-700 flex flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen order-1 lg:order-2">
        {/* Top Section - Dashboard Admin Title */}
        <div className="flex-1 flex items-center justify-center pt-2 sm:pt-4 lg:pt-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Dashboard Admin
            </h1>
          </div>
        </div>

        {/* Middle Section - Dashboard Preview Image */}
        <div className="flex-1 flex items-center justify-center py-4 sm:py-6 lg:py-8">
          <div className="relative">
            <img
              src="./images/All/Login.png"
              alt="Dashboard Preview"
              className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-sm xl:max-w-md mx-auto rounded-lg"
            />
            {/* Subtle overlay for better contrast */}
          </div>
        </div>

        {/* Bottom Section - Copyright and Decorative Elements */}
        <div className="flex-1 flex items-end justify-center relative">
          {/* Decorative Elements - Responsive positioning */}
          <div className="hidden sm:block absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
            <div
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-sm transform rotate-12"
              style={{
                animation: "moveBox1 3s infinite alternate ease-in-out",
              }}
            ></div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 bg-yellow-400 rounded-sm mt-1 ml-2 sm:mt-2 sm:ml-3 lg:ml-4 transform rotate-12"
              style={{
                animation: "moveBox2 3s infinite alternate ease-in-out",
                animationDelay: "0.2s",
              }}
            ></div>
          </div>

          {/* Additional decorative elements for larger screens */}
          <div className="hidden lg:block absolute bottom-16 right-12">
            <div
              className="w-3 h-3 bg-white bg-opacity-20 rounded-full"
              style={{
                animation: "float 3s infinite alternate ease-in-out",
              }}
            ></div>
          </div>

          {/* Copyright - Center bottom */}
          <div className="text-center pb-2 sm:pb-4">
            <p className="text-cyan-100 text-xs sm:text-sm opacity-90 leading-relaxed">
              2025 Copyright Urbanlife
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>All rights reserved
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>Made in Jakarta
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations. biar tuing tuing */}
      <style jsx>{`
        @keyframes moveBox1 {
          0% {
            transform: translateY(0) rotate(12deg) scale(1);
          }
          100% {
            transform: translateY(-22px) rotate(12deg) scale(1.1);
          }
        }
        @keyframes moveBox2 {
          0% {
            transform: translateY(0) rotate(12deg) scale(1);
          }
          100% {
            transform: translateY(-20px) rotate(12deg) scale(1.05);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) rotate(12deg) scale(1);
          }
          100% {
            transform: translateY(-24px) rotate(12deg) scale(1.05);
          }
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: 100dvh; /* For mobile browsers */
          }
        }

        /* Touch improvements for mobile */
        @media (hover: none) and (pointer: coarse) {
          input:focus {
            transform: scale(1.02);
            transition: transform 0.2s ease;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
