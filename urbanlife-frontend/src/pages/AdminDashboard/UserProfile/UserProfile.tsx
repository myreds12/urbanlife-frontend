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
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
        </div>
      </div>
    </>
  );
}
