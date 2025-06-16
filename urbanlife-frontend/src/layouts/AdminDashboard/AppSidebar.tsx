import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "../../components/AdminDashboard/Utils/Ui/Dropdown";
import { DropdownItem } from "../../components/AdminDashboard/Utils/Ui/DropdownItem";

const navItems = [
  { icon: "fa-tachometer-alt", name: "Dashboard", path: "/dashboard" },
  { icon: "fa-shopping-cart", name: "Order", path: "/order" },
  { icon: "fa-calendar", name: "Calendar order", path: "/calendar-order" },
];

const contentItems = [
  { icon: "fa-sun", name: "Day tour", path: "/day-tour" },
  { icon: "fa-car", name: "Rent car", path: "/rent-car" },
  { icon: "fa-bed", name: "Accommodation", path: "/accommodation" },
];

const othersItems = [
  { icon: "fa-users", name: "Customer", path: "/customer" },
  { icon: "fa-whatsapp", name: "Whatsapp", path: "/whatsapp-connect" },
  { icon: "fa-inbox", name: "Inbox", path: "/inbox" },
  {
    icon: "fa-database",
    name: "Data master",
    subItems: [
      { name: "Countries", path: "/countries" },
      { name: "Cities", path: "/cities" },
      { name: "Car", path: "/car" },
      { name: "Driver", path: "/driver" },
      { name: "Guide", path: "/guide" },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const renderMenuItems = (items: typeof navItems) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.name} className="relative">
          {item.subItems ? (
            <>
              <button
                onClick={() => toggleDropdown(item.name)}
                className={`flex items-center p-2 rounded-lg w-full text-left transition-colors ${
                  isActive(item.path || "") ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className={`fas ${item.icon} mr-3 text-lg`}></i>
                <span className="text-sm">{item.name}</span>
                <i className={`fas fa-chevron-down ml-auto transition-transform ${
                  openDropdown === item.name ? "rotate-180" : ""
                }`}></i>
              </button>
              <Dropdown
                isOpen={openDropdown === item.name}
                onClose={() => setOpenDropdown(null)}
                className="w-48 mt-1 left-0"
              >
                {item.subItems.map((subItem) => (
                  <DropdownItem key={subItem.name} to={subItem.path} onItemClick={() => setOpenDropdown(null)}>
                    {subItem.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            </>
          ) : (
            item.path && (
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  isActive(item.path) ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className={`fas ${item.icon} mr-3 text-lg`}></i>
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 p-4">
      <div className="mb-6">
        <div className="text-2xl font-bold text-black">urbanlife</div>
        <div className="text-xs text-gray-500">Your Leisure Reference</div>
      </div>
      <nav className="flex-1 overflow-y-auto">
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
