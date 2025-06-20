import { useState } from "react";
import Button from "../Utils/Ui/button/Button";

export default function UserMetaCard() {
  const [showResetForm, setShowResetForm] = useState(false);

  return (
    <div className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow">
            <img src="/images/user/owner.jpg" alt="user" className="object-cover w-full h-full" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Musharof Chowdhury</h4>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            size="sm"
            variant={showResetForm ? "solid" : "outline"}
            onClick={() => setShowResetForm(!showResetForm)}
          >
            Reset password
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      </div>

      {/* Reset Password Section */}
      {showResetForm && (
        <div className="mt-8 p-6 rounded-2xl border border-gray-100 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Reset password</h4>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 max-w-[70%]">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button size="sm" variant="outline" onClick={() => setShowResetForm(false)}>
              Cancel
            </Button>
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
}
