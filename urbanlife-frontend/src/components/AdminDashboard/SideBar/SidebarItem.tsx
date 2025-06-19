import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item }: { item: { icon: string; name: string; path: string } }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <li>
      <Link
        to={item.path}
        className={`flex items-center px-3 py-2 rounded-md transition-colors group ${
          isActive ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <i className={`fas ${item.icon} mr-3 w-5 text-center`}></i>
        <span className="text-sm">{item.name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
