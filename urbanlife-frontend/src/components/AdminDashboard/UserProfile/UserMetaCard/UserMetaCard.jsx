import { useEffect, useState } from "react";
import Button from "../../Utils/Ui/button/Button";
import ResetPasswordForm from "../ResetPasswordForm";
import EditProfileForm from "../EditProfileForm";

export default function UserMetaCard() {
  const [showResetForm, setShowResetForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Musharof Chowdhury",
    role: "Admin",
    email: "musharof@example.com",
    phone: "+1234567890",
    bio: "Experienced admin with 5+ years in dashboard management",
    location: "Jakarta, Indonesia",
    country:"Indonesia",
    status:"Active",
    profilePicture: "/images/user/owner.jpg" // Tambahkan field untuk menyimpan URL gambar
  });

  const handleUpdateUser = (updatedInfo, profileFile = null) => {
    // Jika ada file gambar baru, buat URL untuk preview
    if (profileFile) {
      const imageUrl = URL.createObjectURL(profileFile);
      updatedInfo.profilePicture = imageUrl;
    }
    
    setUserInfo(updatedInfo);
    setShowEditForm(false);
    
    // Update global state atau localStorage jika diperlukan
    // Contoh: localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
    
    // Trigger event untuk memberitahu komponen lain
    window.dispatchEvent(new CustomEvent('userProfileUpdated', { 
      detail: updatedInfo 
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden">

              <img 
                src={userInfo.profilePicture} 
                alt="user" 
                className="object-cover w-full h-full" 
                onError={(e) => {
                  e.target.src = "/images/user/owner.jpg"; //TODO: MASIH STATIS, belum diintegrasikan dengan backend
                }}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{userInfo.name}</h2>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-briefcase text-blue-500"></i>
                <p className="text-gray-600">{userInfo.role}</p>
              </span>
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-red-500"></i>
                <p className="text-sm text-gray-500">{userInfo.location}</p>
              </span>
            </div>
          </div>
            <Button
              size="sm"
              variant="outline"
              isActive={showResetForm}
              onClick={() => setShowResetForm(!showResetForm)}
              startIcon={<i className="fa fa-rotate-left" />}
            >
              Reset password
            </Button>

        </div>
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
          <AddressCard userInfo={userInfo} />
        </>
      )}
    </div>
  );
}
