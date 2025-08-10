import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import apiClient from "../../../Utils/ApiClient/apiClient";

export default function ChartBar() {
  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: new Array(12).fill(0), // Placeholder awal: 12 bulan
    },
  ]);

  const options = {
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
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: { text: undefined },
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/pemesanan/perbulan?tahun=2025");
        const monthlyCounts = new Array(12).fill(0);

        response.data.data.forEach((item) => {
          const monthIndex = parseInt(item.month.split("-")[1], 10) - 1;
          monthlyCounts[monthIndex] = item.count;
        });

        setSeries([
          {
            name: "Sales",
            data: monthlyCounts,
          },
        ]);
      } catch (error) {
        console.error("❌ Gagal memuat data chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white px-5 pt-5 border border-gray-200 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 darktitle">Monthly Sales</h3>
        <div className="relative inline-block">
          <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
  );
}
