import PageBreadcrumb from "../../../components/AdminDashboard/common/PageBreadCrumb";
import PageMeta from "../../../components/AdminDashboard/common/PageMeta";
import UserMetaCard from "../../../components/AdminDashboard/UserProfile/UserMetaCard";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="User Profile"
        description="User profile page with reset password feature"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Profile</h3>
        <UserMetaCard />
      </div>
    </>
  );
}
