import { useLocation } from "react-router-dom";
import SidebarItem from "../../components/AdminDashboard/SideBar/SidebarItem";
import SidebarExpandableItem from "../../components/AdminDashboard/SideBar/SidebarExpandableItem";
import { useAuthStore } from "../../components/AdminDashboard/Utils/Auth/AuthStore";
import { useLogo } from "../../components/LogoFaviconManager";

const navItems = [
  { icon: "fa-solid fa-border-all", name: "Dashboard", path: "/admin/dashboard" },
  { icon: "fa-shopping-cart", name: "Order", path: "/admin/order" },
  { icon: "fa-calendar", name: "Calendar order", path: "/admin/calendar" },
];

const contentItems = [
  { icon: "fa-solid fa-chart-pie", name: "Day tour", path: "/admin/day-tour" },
  { icon: "fa-car", name: "Rent a car", path: "/admin/rent-car" },
  { icon: "fa-bed", name: "Accommodation", path: "/admin/accommodation" },
  { icon: "fa-newspaper", name: "News", path: "/admin/news" },
];

const companyItems = [
  { icon: "fa-info-circle", name: "About Us", path: "/admin/aboutus" },
  { icon: "fa-shield-alt", name: "Privacy Policy", path: "/admin/privacy-policy" },
  { icon: "fa-file-contract", name: "Terms and Conditions", path: "/admin/terms-conditions" },
  // { icon: "fa-envelope", name: "Contact Us", path: "/admin/contact-us" },
];

const othersItems = [
  { icon: "fa-users", name: "Customer", path: "/admin/customer" },
  {
    icon: "fa-brands fa-whatsapp",
    name: "Whatsapp",
    subItems: [
      { name: "Connect", path: "/admin/whatsapp-connect" },
      // { name: "Template", path: "/admin/template" },
    ],
  },
  { icon: "fa-inbox", name: "Inbox", path: "/admin/inbox" },
  {
    icon: "fa-database",
    name: "Data master",
    subItems: [
      { name: "Hero Section", path: "/admin/herosection" },
      { name: "Service Schedule", path: "/admin/ServiceSchedule" },
      { name: "Partner", path: "/admin/ourpartner" },
      { name: "Countries", path: "/admin/country" },
      { name: "Cities", path: "/admin/city" },
      { name: "Car", path: "/admin/car" },
      { name: "Driver", path: "/admin/driver" },
      { name: "Guide", path: "/admin/guide" },
      { name: "Blog", path: "/admin/blogs" },
      { name: "Category", path: "/admin/category" },
      { name: "Users", path: "/admin/users" }, // hanya untuk super_admin
      { name: "Testimonial", path: "/admin/testimonial" },
      { name: "Logo Favicon", path: "/admin/logo-favicon" },
      { name: "Popular Category", path: "/admin/popular-category" },
      { name: "Type Akomodasi", path: "/admin/type-akomodasi" },
    ],
  },
  {
    icon: "fa-cog",
    name: "Setting",
    subItems: [{ name: "User", path: "/admin/profile" }],
  },
];

const AppSidebar = () => {
  const LOCATION = useLocation();
  const { logo } = useLogo()

  // Ambil role user, sesuaikan sumbernya
  const userRole = useAuthStore((s) => s.user?.role);

  // Filter othersItems agar "Users" hanya muncul untuk super_admin
  const filteredOthersItems = othersItems.map(item => {
    if (item.name === "Data master" && Array.isArray(item.subItems)) {
      const filteredSubItems = item.subItems.filter(subItem => {
        if (subItem.name === "Users") {
          return userRole === "super_admin";
        }
        return true;
      });
      return { ...item, subItems: filteredSubItems };
    }
    return item;
  });

  const renderMenuItems = (items) => (
    <ul className="space-y-1">
      {items.map((item) =>
        item.subItems ? (
          <SidebarExpandableItem key={item.name} item={item} />
        ) : (
          <SidebarItem key={item.name} item={item} />
        )
      )}
    </ul>
  );

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto">
      <div className="mb-6">
        <img src={logo} alt="Urbanlife Logo" className="h-12" />
      </div>
      <nav>
        <div className="mb-4">
          <h2 className="text-xs text-gray-400 uppercase mb-2 tracking-wider">Menu</h2>
          {renderMenuItems(navItems)}
        </div>
        <div className="mb-4">
          <h2 className="text-xs text-gray-400 uppercase mb-2 tracking-wider">Content Management</h2>
          {renderMenuItems(contentItems)}
        </div>
        <div className="mb-4">
          <h2 className="text-xs text-gray-400 uppercase mb-2 tracking-wider">Company</h2>
          {renderMenuItems(companyItems)}
        </div>
        <div>
          <h2 className="text-xs text-gray-400 uppercase mb-2 tracking-wider">Others</h2>
          {renderMenuItems(filteredOthersItems)}
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;