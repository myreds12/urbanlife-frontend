import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item }) => {
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

{/* <Link
  to={item.path}
  className={`flex items-center px-3 py-2 rounded-md transition-colors group ${
    isActive
      ? "bg-cyan-600" // background aktif
      : "hover:bg-gray-100 dark:hover:bg-gray-800"
  }`}
>
  <i
    className={`fas ${item.icon} mr-3 w-5 text-center ${
      isActive
        ? "text-white" // aktif → icon putih
        : "text-gray-700 dark:darksideicon" // default → warna biasa atau dark mode
    }`}
  ></i>

  <span
    className={`text-sm ${
      isActive
        ? "text-white" // aktif → teks putih
        : "text-gray-700 dark:darksideitem" // default → warna biasa atau dark mode
    }`}
  >
    {item.name}
  </span>
</Link> */}
    </li>
  );
};

export default SidebarItem;