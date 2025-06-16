import { Link, useLocation } from "react-router-dom";

const AppSidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: "fa-tachometer-alt", name: "Dashboard", path: "/dashboard", category: "MENU" },
    { icon: "fa-shopping-cart", name: "Order", path: "/order", category: "MENU" },
    { icon: "fa-calendar", name: "Calendar order", path: "/calendar-order", category: "MENU" },
    { icon: "fa-sun", name: "Day tour", path: "/day-tour", category: "CONTENT MANAGEMENT" },
    { icon: "fa-car", name: "Rent car", path: "/rent-car", category: "CONTENT MANAGEMENT" },
    { icon: "fa-bed", name: "Accommodation", path: "/accommodation", category: "CONTENT MANAGEMENT" },
    { icon: "fa-users", name: "Customer", path: "/customer", category: "OTHERS" },
    { icon: "fa-whatsapp", name: "Whatsapp", path: "/whatsapp-connect", category: "OTHERS" },
    { icon: "fa-inbox", name: "Inbox", path: "/inbox", category: "OTHERS" },
    { icon: "fa-cog", name: "Setting", path: "/setting", category: "OTHERS" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 p-4">
      <div className="mb-6">
        <div className="text-2xl font-bold">urbanlife</div>
        <div className="text-xs text-gray-500">Your Leisure Reference</div>
      </div>
      {["MENU", "CONTENT MANAGEMENT", "OTHERS"].map((category) => (
        <div key={category} className="mb-4">
          {category && <div className="text-xs text-gray-400 uppercase mb-2">{category}</div>}
          <ul className="space-y-1">
            {navItems
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg ${
                      isActive(item.path) ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <i className={`fas ${item.icon} mr-3`}></i>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default AppSidebar;