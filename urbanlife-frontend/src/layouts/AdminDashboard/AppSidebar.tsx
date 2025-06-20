import { useLocation } from "react-router-dom";
import SidebarItem from "../../components/AdminDashboard/SideBar/SidebarItem";
import SidebarExpandableItem from "../../components/AdminDashboard/SideBar/SidebarExpandableItem";

const navItems = [
  { icon: "fa-tachometer-alt", name: "Dashboard", path: "/admin/dashboard" },
  { icon: "fa-shopping-cart", name: "Order", path: "/admin/order" },
  { icon: "fa-calendar", name: "Calendar order", path: "/admin/calendar" },
];

const contentItems = [
  { icon: "fa-sun", name: "Day tour", path: "/admin/day-tour" },
  { icon: "fa-car", name: "Rent car", path: "/admin/rent-car" },
  { icon: "fa-bed", name: "Accommodation", path: "/admin/accommodation" },
];

const othersItems = [
  { icon: "fa-users", name: "Customer", path: "/admin/customer" },
  {
    icon: "fa-whatsapp",
    name: "Whatsapp",
    subItems: [
      { name: "Connect", path: "/admin/whatsapp-connect" },
      { name: "Template", path: "/admin/whatsapp-template" },
    ],
  },
  { icon: "fa-inbox", name: "Inbox", path: "/admin/inbox" },
    {
      icon: "fa-database",
      name: "Data master",
      subItems: [
        { name: "Countries", path: "/admin/country" },  // ← ganti ini
        { name: "Cities", path: "/admin/city" },
        { name: "Car", path: "/admin/car" },
        { name: "Driver", path: "/admin/driver" },
        { name: "Guide", path: "/admin/guide" },
      ],
    },
  {
    icon: "fa-cog",
    name: "Setting",
    subItems: [{ name: "User", path: "/user" }],
  },
];

const AppSidebar = () => {
  const location = useLocation();

  const renderMenuItems = (items: any[]) => (
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
        <div className="text-2xl font-bold text-black">urbanlife</div>
        <div className="text-xs text-gray-500">Your Leisure Reference</div>
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
        <div>
          <h2 className="text-xs text-gray-400 uppercase mb-2 tracking-wider">Others</h2>
          {renderMenuItems(othersItems)}
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;
