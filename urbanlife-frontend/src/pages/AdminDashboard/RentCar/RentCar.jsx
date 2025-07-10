import React, { useState, useEffect } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import CreateRentCar from "./CreateRentCar";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const RentCar = () => {
  const navigate = useNavigate();

  const [rentCarData, setRentCarData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [take] = useState(10); // Jumlah data per halaman
  const [total, setTotal] = useState(0);

  const fetchRentCar = async () => {
    setLoading(true);
    try {
      const params = { page, take };
      const res = await apiClient.get("/kendaraan", { params });
      const { data, total } = res.data;
      setRentCarData(data);
      setTotal(total);
    } catch (err) {
      console.error("Failed to fetch rent car", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentCar();
  }, [page]);

  const totalPages = Math.ceil(total / take);

  const columns = [
    "#",
    "ID",
    "Nama",
    "Model",
    "Tipe",
    "Plat Nomor",
    "Lokasi",
    "Status",
    "Pajak Berakhir",
    "Action",
  ];
  
  const mapping = {
  "#": (row, index) => index + 1,
  "ID": "id",
  "Nama": "nama",
  "Model": "model",
  "Tipe": "tipe",
  "Plat Nomor": "plat_nomor",
  "Lokasi": (row) => row.lokasi?.nama || "-",
  "Status": (row) => row.status ? "Aktif" : "Non-Aktif",
  "Pajak Berakhir": (row) => new Date(row.tanggal_pajak_berakhir).toLocaleDateString(),
  "Action": null
};

  const currentData = rentCarData;

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
        <h2 className="text-xl font-bold text-gray-800">Rent Car</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/admin/rent-car/create")}
        >
          Add Unit
          <i class="fa-solid fa-plus"></i>
        </Button>
      </div>

      <Table
        data={currentData}
        columns={columns}
        startIndex={(page - 1) * take}
        defaultMapping={mapping}
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Info data */}
        <div className="text-sm text-gray-700">
          Showing {(page - 1) * take + 1} to {Math.min(page * take, total)} of{" "}
          {total} rent cars
        </div>

        {/* Pagination */}
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

export default RentCar;
