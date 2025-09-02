import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // pastikan import dari react-router-dom
import { useAuthStore } from "../Utils/Auth/AuthStore.js";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import apiClient from "../Utils/ApiClient/apiClient.js";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useAuthStore((s) => s.token);
  const [userInfo, setUserInfo] = useState({
    name: "Admin 1",
    email: "admin1@gmail.com",
    profilePicture: "/images/user/owner.jpg",
  });

  const getImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (image.profilePicture) {
      return `${apiClient.defaults.baseURL}/public/${image.profilePicture
        .replace(/\\/g, "/")
        .replace(/^uploads\//, "")}`;
    } else if (!image.profilePicture) {
      return "/images/user/owner.jpg";
    }
    return "";
  };

  const fetchUserData = async () => {
    try {
      if (!token) throw new Error("Token not found");

      const decoded = jwtDecode(token);
      const userId = decoded?.id;
      if (!userId) throw new Error("User ID not found in token");

      const res = await apiClient.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.status === 200 && res.data.data) {
        const user = res.data.data;
        const adminWa = user.AdminWa?.[0] || {};
        setUserInfo({
          name: user.nama || "",
          role: user.role_id === 2 ? "Admin" : "User",
          email: user.email || "",
          phone: user.nomor_hp || adminWa.nomor_wa || "",
          profilePicture: user.profile || "",
          bio: "",
          location: "",
          country: "Indonesia",
          status: adminWa.is_active ? "Active" : "Inactive",
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } 
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleProfileUpdate = (event) => {
      const updatedUser = event.detail || {};
      setUserInfo((prev) => ({
        ...prev,
        name: updatedUser.nama || prev.name,
        email: updatedUser.email || prev.email,
        profilePicture: updatedUser.profilePicture || prev.profilePicture,
      }));
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("userProfileUpdated", handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserInfo((prev) => ({
          ...prev,
          name: parsed.nama || prev.name,
          email: parsed.email || prev.email,
          profilePicture: parsed.profile || prev.profilePicture,
        }));
      } catch (error) {
        console.error("Error parsing saved user info:", error);
      }
    }
  }, []);

  useEffect(() => {
    // close dropdown ketika klik di luar
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-toggle") && !e.target.closest(".dropdown-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  const handleLogout = () => {
    logout();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center dropdown-toggle text-gray-700"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img
            src={getImageUrl(userInfo)}
            alt="User"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/profile.png";
            }}
          />
        </span>

        <span className="block mr-1 font-medium text-medium">
          {userInfo.name.split(" ")[0] || "Admin"}
        </span>
        <svg
          className={`stroke-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="dropdown-menu absolute right-0 mt-[17px] w-[220px] flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-md z-50"
          onClick={(e) => e.stopPropagation()}
          role="menu"
          aria-label="User dropdown menu"
        >
          <div className="mb-4">
            <span className="block font-medium text-gray-700 text-medium">
              {userInfo.name}
            </span>
            <span className="mt-0.5 block text-sm text-gray-500">
              {userInfo.email}
            </span>
          </div>

          <ul className="flex flex-col gap-1 pt-2 pb-3 border-b border-gray-200">
            <li>
              <Link
                to="/admin/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-1 font-medium text-gray-700 rounded-lg group text-medium hover:bg-gray-100 hover:text-gray-700"
                role="menuitem"
              >
                {/* icon */}
                ...
                Edit profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-1 font-medium text-gray-700 rounded-lg group text-medium hover:bg-gray-100 hover:text-gray-700"
                role="menuitem"
              >
                {/* icon */}
                ...
                Account settings
              </Link>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-1 mt-2 font-medium text-gray-700 rounded-lg group text-medium hover:bg-gray-100 hover:text-gray-700 w-full text-left"
            type="button"
            role="menuitem"
          >
            {/* icon */}
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
