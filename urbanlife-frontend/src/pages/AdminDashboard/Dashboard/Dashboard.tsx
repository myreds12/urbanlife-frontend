import Chart from "react-apexcharts";
import "../../../styles/AdminDashboard/Dashboard/Dashboard.css";
import Calendar from "react-calendar";
import "../../../styles/AdminDashboard/Dashboard/CalendarCustom.css";
import Orders from "../Order/Order";

function Dashboard() {
  const options: ApexOptions = {
    colors: ["#189AB4"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];

  return (
    <div className="p-2">
      <div className="grid grid-cols-10 gap-5">
        
        {/* chart bar */}
        <div className="col-span-6 ">
          <div className="overflow-hidden rounded-2xl bg-white px-5 pt-5 border border-gray-200  sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 ">
                Monthly Sales
              </h3>
              <div className="relative inline-block">
                <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div id="chartOne" className="min-w-[300px] w-full">
                <Chart options={options} series={series} type="bar" height={180} />
              </div>
            </div>
          </div> 
        </div>

        {/* card 1 */}
        <div className="col-span-2  flex flex-col justify-between h-full rounded-2xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center p-5">
            {/* icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <span className="flex items-center text-sm text-red-600 bg-red-100 px-2 py-1 rounded-xl">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              9.05%
            </span>
          </div>

          <div className="flex flex-col items-center ">
              <span className="text-md text-gray-500 dark:text-gray-400">Customers</span>
              <h4 className="text-3xl font-bold text-gray-800">5,359</h4>
          </div>
          
          <div className="flex flex-col items-center justify-items-end py-2 mt-5 bg-gray-100 w-full rounded-b-2xl">
              <span className="text-sm text-gray-500 dark:text-gray-400">From last month</span>
          </div>
        </div>

        {/* card 2 */}
        <div className="col-span-2  flex flex-col justify-between h-full rounded-2xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center p-5">
            {/* icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
              </svg>
          </div>

            <span className="flex items-center text-sm text-red-600 bg-red-100 px-2 py-1 rounded-xl">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              9.05%
            </span>
          </div>

          <div className="flex flex-col items-center ">
              <span className="text-md text-gray-500 dark:text-gray-400">Orders</span>
              <h4 className="text-3xl font-bold text-gray-800">5,359</h4>
          </div>
          
          <div className="flex flex-col items-center justify-items-end py-2 mt-5 bg-gray-100 w-full rounded-b-2xl">
              <span className="text-sm text-gray-500 dark:text-gray-400">From last month</span>
          </div>
        </div>

        
      </div>

    </div> //div terluar
  );
}

export default Dashboard;