import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "../../../styles/Dashboard/Dashboard.css";
import Calendar from "react-calendar";
import "../../../styles/Dashboard/CalendarCustom.css";
import Orders from "../Order/Order";

function Dashboard() {
  const chartOptions = {
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
      dropShadow: { enabled: false },
    },
    tooltip: { enabled: true, x: { show: false } },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 4 },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: 0 },
    },
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  const series = [
    {
      name: "New users",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#1A56DB",
    },
  ];

  const widgets = [
    {
      title: "Day Tour Bookings",
      value: 106,
      icon: "fa-solid fa-dollar-sign",
      percentage: 60,
      trend: "up",
      color: "#1C64F2", // Warna biru kayak gambar
    },
    {
      title: "Car Rental Bookings",
      value: 106,
      icon: "fa-solid fa-car",
      percentage: 60,
      trend: "up",
      color: "#1C64F2",
    },
    {
      title: "Cancelled Day Tour Bookings",
      value: 16,
      icon: "fa-solid fa-dollar-sign",
      percentage: -60,
      trend: "down",
      color: "#EF4444", // Warna merah kayak gambar
    },
    {
      title: "Cancelled Car Rental Bookings",
      value: 106,
      icon: "fa-solid fa-car",
      percentage: 60,
      trend: "up",
      color: "#1C64F2",
    },
  ];

  const [bubbleOpen, setBubbleOpen] = useState(false);
  useEffect(() => {
                     const handleClickOutside = (event) => {
                     if (bubbleOpen && !event.target.closest(".inline-flex")) {
                            setBubbleOpen(false);
                     }
                     };
                     document.addEventListener("mousedown", handleClickOutside);
                     return () => document.removeEventListener("mousedown", handleClickOutside);
                     }, [bubbleOpen]);

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-5">
        {/* widget */}
        <div className="col-span-5 grid grid-cols-2 gap-5">
          {widgets.map((widget, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
                    {widget.value}
                  </h5>
                  <i
                    className={`${widget.icon} w-5 h-5 text-gray-500 hover:text-gray-900`}
                  ></i>
                  <span className="text-base font-normal text-gray-900">
                    {widget.title}
                  </span>
                </div>
                <div
                  className={`flex items-center px-2.5 py-0.5 text-base font-semibold ${
                    widget.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {widget.percentage > 0
                    ? `+${widget.percentage}%`
                    : `${widget.percentage}%`}
                  <svg
                    className="w-3 h-3 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={
                        widget.trend === "up"
                          ? "M5 13V1m0 0L1 5m4-4 4 4"
                          : "M5 1v12m0 0L9 7m-4 4-4-4"
                      }
                    />
                  </svg>
                </div>
              </div>

              <Chart
                options={{
                  ...chartOptions,
                  fill: {
                    ...chartOptions.fill,
                    gradient: {
                      ...chartOptions.fill.gradient,
                      shade: widget.color,
                    },
                  },
                }}
                series={series}
                type="area"
                height={100}
              />

              <div className="grid grid-cols-1 items-center justify-between">
                <p className="text-sm font-medium text-gray-500 text-center">
                  From last month
                </p>
              </div>
            </div>
          ))}
        </div>




        {/* calendar  &  bubble */}
        <div className="col-span-2">
          <div className="w-full p-1 rounded-lg">
            <h5 className="text-xl font-bold text-gray-900 mt-3 mb-4">
              Calendar upcoming event
            </h5>
            <Calendar
              value={new Date()}
              className="react-calendar"
              tileClassName={({ date, view }) => {
                if (view === "month" && date.getDate()) {
                  return "highlight";
                }
                return null;
              }}
            />
          </div>

          <div className="flex items-start relative mb-3">
            <div className="flex flex-col w-full">
              <div
                className={`inline-flex justify-between leading-1.5 p-4 bg-emerald-100 rounded-xl transition-all duration-300 ${
                  bubbleOpen ? "w-[260px]" : "w-full"
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-emerald-600">Rent Car</p>
                  <span className="text-sm font-normal text-emerald-400">
                    Daniel Mananta * Toyota Alphard
                  </span>
                </div>
                <button
                  className="flex self-center items-center p-2 text-sm font-medium text-center text-emerald-500"
                  type="button"
                  onClick={() => setBubbleOpen(!bubbleOpen)}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 4 15"
                  >
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </button>

                {bubbleOpen && (
                  <div className="absolute z-10 right-[-3.5rem] top-0 w-20 space-y-2">
                    <ul className="text-sm">
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center w-10 h-10 mt-4 rounded-full bg-emerald-600 "
                          onClick={(e) => {
                            e.preventDefault();
                            alert("Delete clicked!");
                            setBubbleOpen(false);
                          }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                          >
                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>


          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
