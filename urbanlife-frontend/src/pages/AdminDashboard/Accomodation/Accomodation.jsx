import React, { useEffect, useState } from "react";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";
import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const Accomodation = () => {
  const navigate = useNavigate();
  const [accommodationData, setAccommodationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  console.log(accommodationData, "accommodationData");

  const columns = [
    "#",
    "Name",
    "Location",
    "Type", 
    "Category",
    "Action",
  ];

  const fetchAccommodations = async (page = 1, take = itemsPerPage) => {
    setIsLoading(true);
    try {
      const params = { page, take };
      const response = await apiClient.get("/akomodasi", { params });

      const data = response?.data?.data || [];
      const total = response?.data?.total || 0;

      const formatted = data.map((item) => ({
        id: item.id,
        name: item.nama,
        location: item.lokasi?.nama || "-",
        type: item.tipe,
        category: item.kategori,
      }));

      setAccommodationData(formatted);
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      alert("Failed to load accommodations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Accommodation</h2>
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/admin/accommodation/create")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add Unit"}
            <i class="fa-solid fa-plus"></i>
          </Button>
        </div>
      </div>

      <Table
        data={accommodationData}
        columns={columns}
        defaultMapping={{
          "#": (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
          Name: "name",
          Location: "location",
          Type: "type",
          Category: "category",
        }}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        handlePageChange={handlePageChange}
      />

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          accommodations
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
          size="base"
        />
      </div>
    </div>
  );
};

export default Accomodation;
