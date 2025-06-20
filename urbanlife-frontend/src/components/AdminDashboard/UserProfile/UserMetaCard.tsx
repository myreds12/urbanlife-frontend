import { useState } from "react";
import Button from "../Utils/Ui/button/Button";

export default function UserMetaCard() {
  const [showResetForm, setShowResetForm] = useState(false);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          {/* Avatar */}
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img src="/images/user/owner.jpg" alt="user" />
          </div>

          {/* Name & Role */}
          <div className="order-3 xl:order-2 text-center xl:text-left">
            <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Musharof Chowdhury
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
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
      </div>

      {/* Reset Password Section */}
      {showResetForm && (
        <div className="mt-8 border border-gray-200 rounded-2xl p-6 dark:border-gray-800">
          <h4 className="text-base font-semibold mb-4 text-gray-800 dark:text-white/90">
            Reset password
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            You will receive an email to reset your password.
          </p>
          <div className="flex gap-3 justify-end">
            <Button size="sm" variant="outline" onClick={() => setShowResetForm(false)}>
              Cancel
            </Button>
            <Button size="sm">Send Reset Email</Button>
          </div>
        </div>
      )}
    </div>
  );
}
