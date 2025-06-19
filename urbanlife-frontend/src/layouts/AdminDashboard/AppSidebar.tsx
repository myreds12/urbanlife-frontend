import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;
  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const renderMenuItems = (items: typeof navItems) => (
    <ul className="space-y-2">
      {items.map((item) => {
        const isOpen = openMenu === item.name;
        const isMainActive = isActive(item.path || "");
        const isAnySubItemActive = item.subItems?.some((s) =>
          isActive(s.path)
        );
        const isActiveStyle = isMainActive || isAnySubItemActive;

        return (
          <li key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all ${
                    isActiveStyle
                      ? "bg-teal-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`fas ${item.icon} mr-3 text-lg`} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <i
                    className={`fas fa-chevron-down transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`ml-7 mt-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-1">
                    {item.subItems.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          to={sub.path}
                          className={`block px-2 py-1 rounded-md text-sm transition-all ${
                            isActive(sub.path)
                              ? "bg-teal-100 text-teal-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to={item.path!}
                className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                  isActive(item.path!)
                    ? "bg-teal-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <i className={`fas ${item.icon} mr-3 text-lg`} />
                <span className="text-sm">{item.name}</span>
              </Link>
            )}
          </li>
        );
      })}
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
