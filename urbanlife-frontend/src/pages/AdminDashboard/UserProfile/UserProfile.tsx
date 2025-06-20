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
      <div className="p-6 border-[1.5px] border-gray-200 shadow-sm rounded-2xl bg-white">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Profile</h3>
        <UserMetaCard />
      </div>
    </>
  );
}
