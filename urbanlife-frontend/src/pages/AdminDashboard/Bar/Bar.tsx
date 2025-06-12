import "../../../styles/Bar/Bar.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Bar = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const whatsappRoutes = [
    "/whatsapp-setting",
    "/whatsapp-connect",
    "/whatsapp-template",
  ];

  const isInWhatsappSection = whatsappRoutes.includes(location.pathname);

  return (
    <>
      <nav className="bg-white fixed top-0 left-0 w-full z-50 p-4 shadow-sm flex items-center justify-between">
        <h2 className="text-2xl font-bold ml-65 text-gray-900">
          Dashboard Admin
        </h2>

        <div className="flex items-center gap-4 mr-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLanguageOpen(!languageOpen)}
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-cyan-600 hover:text-white transition"
            >
              <img
                src="./us.png"
                alt="US Flag"
                className="w-5 h-5 rounded-full mr-2"
              />
              English
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src="./us.png"
                        alt="US Flag"
                        className="w-5 h-5 rounded-full mr-2"
                      />
                      English
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <img
                        src="https://flagcdn.com/id.svg"
                        alt="Indonesia Flag"
                        className="w-5 h-5 rounded-full mr-2"
                      />
                      Indonesia
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center text-sm rounded-full focus:outline-none"
            >
              <span className="mr-2 font-medium text-gray-900 hidden sm:inline">
                Admin
              </span>
              <img
                className="w-8 h-8 rounded-full border border-gray-300"
                src="./profile.png"
                alt="User avatar"
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-gray-500">Admin@gmail.com</p>
                </div>
                <ul className="py-1 text-sm text-gray-700">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside
        className="fixed top-0 left-0 z-[100] w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-7 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <div className="flex items-center justify-center h-12 mb-2">
              <img src="./logo.png" alt="Logo" className="h-12" />
            </div>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-solid fa-chart-line w-5 text-gray-500 group-hover:text-gray-900 "></i>
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-regular fa-calendar w-5 text-gray-500 group-hover:text-gray-900"></i>
                <span className="ml-3">Order</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/day-tour"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-solid fa-suitcase-rolling w-5 text-gray-500 group-hover:text-gray-900"></i>
                <span className="ml-3">Day Tour</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rent-car"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-solid fa-car w-5 text-gray-500 group-hover:text-gray-900"></i>
                <span className="ml-3">Rent Car</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accommodation"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-solid fa-house-user w-5 text-gray-500 group-hover:text-gray-900"></i>
                <span className="ml-3">Accommodation</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inbox"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-xl transition duration-100 ease-in-out buttonhover ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "text-gray-900 hover:bg-cyan-600 hover:text-white group"
                  }`
                }
              >
                <i className="fa-solid fa-inbox w-5 text-gray-500 group-hover:text-gray-900"></i>
                <span className="ml-3">Inbox</span>
              </NavLink>
            </li>


            <li>
              <div className="rounded-2xl bg-cyan-600 text-white w-50 space-y-1 p-2">
                <NavLink
                  to="/whatsapp-setting"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-full transition duration-100 ease-in-out ${
                      isActive
                        ? "bg-white text-cyan-600"
                        : "text-white hover:bg-cyan-700 hover:text-white"
                    }`
                  }
                >
                  <i className="fa-brands fa-whatsapp w-5 text-white hover:text-white"></i>
                  <span className="ml-3">Whatsapp Setting</span>
                </NavLink>

                {/* Show submenu if inside whatsapp section */}
                {isInWhatsappSection && (
                  <div className="space-y-1 pl-6">
                    <NavLink
                      to="/whatsapp-connect"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-full font-semibold text-left transition duration-100 ease-in-out ${
                          isActive
                            ? "bg-white text-cyan-600"
                            : "text-white hover:bg-cyan-700 hover:text-white"
                        }`
                      }
                    >
                      Whatsapp Connect
                    </NavLink>
                    <NavLink
                      to="/whatsapp-template"
                      className={({ isActive }) =>
                        `flex items-center p-2 block py-2 pr-4 pl-4 rounded-full font-semibold text-left transition duration-500 ease-in-out ${
                          isActive
                            ? "bg-white text-cyan-600"
                            : "text-white hover:bg-cyan-700 hover:text-white"
                        }`
                      }
                    >
                       Template
                    </NavLink>
                  </div>
                )}
              </div>
            </li>

            
          </ul>
        </div>

        <div className="w-full max-w-xs p-4 mx-auto rounded-lg dark:bg-gray-50 dark:text-gray-800">
          <div className="flex justify-between space-x-4 items-center">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-12 h-12 p-1 dark:text-yellow-600 fill-current"
              >
                <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
                <rect width="32" height="48" x="240" y="16"></rect>
                <rect width="32" height="48" x="240" y="448"></rect>
                <rect width="48" height="32" x="448" y="240"></rect>
                <rect width="48" height="32" x="16" y="240"></rect>
                <rect
                  width="32"
                  height="45.255"
                  x="400"
                  y="393.373"
                  transform="rotate(-45 416 416)"
                ></rect>
                <rect
                  width="32.001"
                  height="45.255"
                  x="80"
                  y="73.373"
                  transform="rotate(-45 96 96)"
                ></rect>
                <rect
                  width="45.255"
                  height="32"
                  x="73.373"
                  y="400"
                  transform="rotate(-45.001 96.002 416.003)"
                ></rect>
                <rect
                  width="45.255"
                  height="32.001"
                  x="393.373"
                  y="80"
                  transform="rotate(-45 416 96)"
                ></rect>
              </svg>
              <h1 className="text-sm font-semibold">Stockholm</h1>
            </div>
            <span className="font-bold text-4xl">14°</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-6 text-xs text-center dark:text-gray-600">
            {[
              { day: "wed", temp: "11°" },
              { day: "thu", temp: "17°" },
              { day: "fri", temp: "8°" },
              { day: "sat", temp: "-2°" },
              { day: "sun", temp: "4°" },
            ].map(({ day, temp }) => (
              <div key={day} className="flex flex-col items-center space-y-1">
                <span className="uppercase">{day}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M382.76,432H136c-30.732,0-61.371-12.725-84.061-34.912-23.221-22.707-36.009-52.35-36.009-83.469A109.4,109.4,0,0,1,49.136,235.2a122.281,122.281,0,0,1,62.794-32.707V200c0-79.4,64.6-144,144-144s144,64.6,144,144v1.453c55.716,7.939,96,53.729,96,112.166,0,31.27-11.375,60.72-32.031,82.927A109.747,109.747,0,0,1,382.76,432Z"></path>
                </svg>
                <span>{temp}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Bar;
