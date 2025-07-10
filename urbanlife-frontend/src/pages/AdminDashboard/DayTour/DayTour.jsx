import React, { useState, useEffect } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const DayTour = () => {
  const navigate = useNavigate();

  const [dayTourData, setDayTourData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchDayTours = async () => {
    setLoading(true);
    try {
      const params = { page, take };
      const res = await apiClient.get("/travel-package", { params });
      const { data, total } = res.data;
      setDayTourData(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch travel packages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDayTours();
  }, [page]);

  const totalPages = Math.ceil(total / take);

  const columns = [
    "#",
    "ID",
    "Nama",
    "Durasi",
    "Harga Dewasa",
    "Harga Anak",
    "Lokasi",
    "Negara",
    "Action",
  ];

  const mapping = {
    "#": (row, index) => (page - 1) * take + index + 1,
    "ID": "id",
    "Nama": "nama",
    "Durasi": (row) => `${row.durasi} ${row.tipe_durasi}`,
    "Harga Dewasa": (row) => `Rp${Number(row.harga_dewasa).toLocaleString("id-ID")}`,
    "Harga Anak": (row) => `Rp${Number(row.harga_anak).toLocaleString("id-ID")}`,
    "Lokasi": (row) => row.lokasi?.nama || "-",
    "Negara": (row) => row.lokasi?.negara?.nama || "-",
    "Action": null,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Day Tour / Travel Package</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/admin/day-tour/create")}
        >
          Add Package
          <i class="fa-solid fa-plus"></i>
        </Button>
      </div>

      <Table
        data={dayTourData}
        columns={columns}
        startIndex={(page - 1) * take}
        defaultMapping={mapping}
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {(page - 1) * take + 1} to {Math.min(page * take, total)} of{" "}
          {total} travel packages
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
              setPage(newPage);
            }
          }}
          size="base"
        />
      </div>
    </div>
  );
};

export default DayTour;
