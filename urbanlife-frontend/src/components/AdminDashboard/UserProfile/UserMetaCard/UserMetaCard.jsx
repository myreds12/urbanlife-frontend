import { useEffect, useState } from "react";
import Button from "../../Utils/Ui/button/Button";
import ResetPasswordForm from "../ResetPasswordForm";
import EditProfileForm from "../EditProfileForm";
import apiClient from "../../Utils/ApiClient/apiClient";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../Utils/Auth/AuthStore";

function ProfileHeader({ userInfo, showResetForm, toggleReset }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/images/user/owner.jpg"
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {userInfo.name}
            </h2>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-blue-500"></i>
              <p className="text-gray-600">{userInfo.role}</p>
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-red-500"></i>
              <p className="text-sm text-gray-500">
                {userInfo.location || "-"}
              </p>
            </span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          isActive={showResetForm}
          onClick={toggleReset}
          startIcon={<i className="fa fa-rotate-left" />}
        >
          Reset password
        </Button>
      </div>
    </div>
  );
}

function PersonalInfoCard({ userInfo, onEdit }) {
  const [firstName, lastName] = [
    userInfo.name.split(" ")[0],
    userInfo.name.split(" ").slice(1).join(" "),
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          startIcon={<i className="fa fa-edit" />}
        >
          Edit
        </Button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <InfoField label="First Name" value={firstName} />
        <InfoField label="Last Name" value={lastName} />
        <InfoField label="Email address" value={userInfo.email} />
        <InfoField label="Phone" value={userInfo.phone} />
      </div>
    </div>
  );
}


function InfoField({ label, value, full = false, className = "" }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <p className={`text-gray-900 ${className}`}>{value}</p>
    </div>
  );
}

export default function UserMetaCard() {
  const [showResetForm, setShowResetForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

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
          bio: "",
          location: "",
          country: "Indonesia",
          status: adminWa.is_active ? "Active" : "Inactive",
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateUser = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setShowEditForm(false);
  };

  if (loading) return <p>Loading user data...</p>;
  if (!userInfo) return <p>Failed to load user data.</p>;

  return (
    <div className="space-y-6">
      <ProfileHeader
        userInfo={userInfo}
        showResetForm={showResetForm}
        toggleReset={() => setShowResetForm((prev) => !prev)}
      />

      {showResetForm && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <ResetPasswordForm
            onCancel={() => setShowResetForm(false)}
            onSuccess={() => setShowResetForm(false)}
          />
        </div>
      )}

      {showEditForm ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <EditProfileForm
            userInfo={userInfo}
            onCancel={() => setShowEditForm(false)}
            onSave={handleUpdateUser}
          />
        </div>
      ) : (
        <>
          <PersonalInfoCard
            userInfo={userInfo}
            onEdit={() => setShowEditForm(true)}
          />
        </>
      )}
    </div>
  );
}
