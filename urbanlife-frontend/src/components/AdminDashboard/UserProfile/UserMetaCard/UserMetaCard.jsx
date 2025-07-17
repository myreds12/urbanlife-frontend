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
    location: "Jakarta, Indonesia",
    country:"Indonesia",
    status:"Active"
  });

  const handleUpdateUser = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setShowEditForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src="/images/user/owner.jpg" alt="user" className="object-cover w-full h-full" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{userInfo.name}</h2>
              <p className="text-gray-600">{userInfo.role}</p>
              <p className="text-sm text-gray-500">{userInfo.location}</p>
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
      {showResetForm && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <ResetPasswordForm 
                onCancel={() => setShowResetForm(false)}
                onSuccess={() => setShowResetForm(false)}
              />
            </div>
        )}

      {/* Edit Profile Section */}
      {showEditForm && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <EditProfileForm 
            userInfo={userInfo}
            onCancel={() => setShowEditForm(false)}
            onSave={handleUpdateUser}
          />
        </div>
      )}

      {/* Personal Information Card */}
      {!showEditForm && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowEditForm(true)}
              startIcon={<i className="fa fa-edit" />}
            >
              Edit
            </Button>
            
          </div>
          
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                <p className="text-gray-900">{userInfo.name.split(' ')[0]}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                <p className="text-gray-900">{userInfo.name.split(' ').slice(1).join(' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email address</label>
                <p className="text-gray-900">{userInfo.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <p className="text-gray-900">{userInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                <p className="text-gray-900">{userInfo.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Settings Card */}
      {!showEditForm && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
          </div>
                  
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">City/State</label>
                <p className="text-gray-900">{userInfo.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                <p className="text-gray-900">{userInfo.country}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <p className="text-gray-900">{userInfo.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <p className="text-green-600 font-medium">{userInfo.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}