import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const SidebarExpandableItem = ({ item }: { item: any }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isAnyChildActive = item.subItems.some((child: any) => isActive(child.path));
  const toggle = () => setOpen((prev) => !prev);

  return (
    <li>
      <button
        onClick={toggle}
        className={`flex items-center w-full px-3 py-2 rounded-md transition-colors group ${
          open || isAnyChildActive ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <i className={`fas ${item.icon} mr-3 w-5 text-center`}></i>
        <span className="text-sm">{item.name}</span>
        <i
          className={`fas fa-chevron-down ml-auto transition-transform ${
            open ? "rotate-180" : ""
          }`}
        ></i>
      </button>
      <ul className={`mt-1 pl-0 space-y-1 ${open ? "block" : "hidden"}`}>
        {item.subItems.map((subItem: any) => (
          <li key={subItem.name}>
            <Link
              to={subItem.path}
              className={`block text-sm rounded-md px-11 py-1.5 transition-colors ${
                isActive(subItem.path)
                  ? "bg-cyan-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {subItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarExpandableItem;
