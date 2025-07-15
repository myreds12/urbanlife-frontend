import { useState } from "react";
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
    location: "Jakarta, Indonesia"
  });

  const handleUpdateUser = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setShowEditForm(false);
  };

  return (
    <div className="p-6 border-[1.5px] border-gray-200 shadow-sm rounded-2xl bg-white">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow">
            <img src="/images/user/owner.jpg" alt="user" className="object-cover w-full h-full" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">{userInfo.name}</h4>
            <p className="text-gray-500">{userInfo.role}</p>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            size="sm"
            variant="outline"
            isActive={showResetForm}
            onClick={() => setShowResetForm(!showResetForm)}
            startIcon={<i className="fa fa-rotate-left" />}
          >
            Reset password
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            isActive={showEditForm}
            onClick={() => setShowEditForm(!showEditForm)}
            startIcon={<i className="fa fa-edit" />}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Reset Password Section */}
      {showResetForm && (
        <ResetPasswordForm 
          onCancel={() => setShowResetForm(false)}
          onSuccess={() => setShowResetForm(false)}
        />
      )}

      {/* Edit Profile Section */}
      {showEditForm && (
        <EditProfileForm 
          userInfo={userInfo}
          onCancel={() => setShowEditForm(false)}
          onSave={handleUpdateUser}
        />
      )}

      {/* User Info Display (when not editing) */}
      {!showEditForm && !showResetForm && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{userInfo.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{userInfo.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Location</label>
              <p className="text-gray-900">{userInfo.location}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Bio</label>
              <p className="text-gray-900">{userInfo.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}