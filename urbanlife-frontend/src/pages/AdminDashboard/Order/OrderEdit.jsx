import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_API_URL + "/pemesanan";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderData, setOrderData] = useState({
    id: "",
    user: { nama: "", email: "", nomor_hp: "" },
    total_harga: "",
    status: "",
    notes: "",
    createdAt: "",
    pemesanan_item: [],
  });
  const [vehicles, setVehicles] = useState([]);

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "DONE", label: "Paid" },
    { value: "DIBATALKAN", label: "Cancelled" },
  ];

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api}/${id}`);
      const data = res.data.data;
      console.log("ORDER DETAIL:", data);

      setOrderData({
        id: data.id || "",
        user: {
          nama: data.user?.nama || "",
          email: data.user?.email || "",
          nomor_hp: data.user?.nomor_hp || "",
        },
        total_harga: data.total_harga || "",
        status: data.status || "",
        notes: data.notes || "",
        createdAt: data.createdAt || "",
        pemesanan_item: data.pemesanan_item || [],
      });
    } catch (err) {
      console.error("Failed to fetch order detail", err);
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/pemesanan/items?type=KENDARAAN`
      );
      console.log(res.data.data, "VEHICLE DATA");
      setVehicles(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
      alert("Failed to load vehicles");
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetail();
      fetchVehicles();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setOrderData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleVehicleChange = (e, index) => {
    const selectedVehicleId = e.target.value;
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === parseInt(selectedVehicleId)
    );

    if (selectedVehicle) {
      // Update pemesanan_item dengan kendaraan yang dipilih
      setOrderData((prev) => {
        const updatedItems = [...prev.pemesanan_item];
        updatedItems[index] = {
          ...updatedItems[index],
          kendaraan_id: selectedVehicle.id,
          detail: selectedVehicle, // Simpan detail kendaraan untuk tampilan
          total_harga: selectedVehicle.durasi[0]?.harga || 0, // Ambil harga dari durasi pertama
        };

        // Hitung ulang total harga order
        const newTotalHarga = updatedItems.reduce((total, item) =>
          total + (parseFloat(item.total_harga) || 0), 0
        );

        return {
          ...prev,
          pemesanan_item: updatedItems,
          total_harga: newTotalHarga
        };
      });
    }
  };

  const handleDurationChange = (e, index) => {
    const selectedDurationId = e.target.value;
    const selectedVehicle = orderData.pemesanan_item[index].detail;

    if (selectedVehicle) {
      const selectedDuration = selectedVehicle.durasi.find(
        (durasi) => durasi.id === parseInt(selectedDurationId)
      );

      if (selectedDuration) {
        setOrderData((prev) => {
          const updatedItems = [...prev.pemesanan_item];
          updatedItems[index] = {
            ...updatedItems[index],
            durasi_id: selectedDuration.id,
            total_harga: selectedDuration.harga || 0, // Ambil harga dari durasi yang dipilih
          };

          // Hitung ulang total harga order
          const newTotalHarga = updatedItems.reduce((total, item) =>
            total + (parseFloat(item.total_harga) || 0), 0
          );

          return {
            ...prev,
            pemesanan_item: updatedItems,
            total_harga: newTotalHarga
          };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Siapkan data untuk update
      const updateData = orderData.pemesanan_item.map(item => ({
        kendaraan_id: item.kendaraan_id,
        durasi_id: item.durasi_id,
        harga: item.total_harga,
        notes: orderData.notes
      }));

      console.log("Data to be sent for update:", updateData);

      // await Promise.all(updateData.map((data) =>
      //   axios.patch(`${api}/pemesanan/update-kendaraan/${id}`, data)
      // ));

      alert("Order updated successfully!");
      navigate("/admin/order");
    } catch (err) {
      console.error("Failed to update order", err);
      alert("Failed to update order. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/order");
  };

  const renderOrderItems = () => {
    if (!orderData.pemesanan_item || orderData.pemesanan_item.length === 0) {
      return <div className="text-gray-500">No order items found</div>;
    }

    return orderData.pemesanan_item.map((item, index) => (
      <div key={item.id} className="border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">
          Item #{index + 1} - {item.item_type}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Informasi Kendaraan */}
          {item.item_type === "KENDARAAN" && (
            <>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Select Vehicle
                </label>
                <select
                  value={item.kendaraan_id || ""}
                  onChange={(e) => handleVehicleChange(e, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.nama} - {vehicle.plat_nomor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Duration */}
              {item.detail && item.detail.durasi && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Select Duration
                  </label>
                  <select
                    value={item.durasi_id || ""}
                    onChange={(e) => handleDurationChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select Duration</option>
                    {item.detail.durasi.map((durasi) => (
                      <option key={durasi.id} value={durasi.id}>
                        {durasi.nama} - Rp {durasi.harga.toLocaleString("id-ID")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Info Kendaraan Terpilih */}
              {item.detail && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Vehicle Name
                    </label>
                    <input
                      type="text"
                      value={item.detail.nama || "-"}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Type
                    </label>
                    <input
                      type="text"
                      value={item.detail.tipe || "-"}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      License Plate
                    </label>
                    <input
                      type="text"
                      value={item.detail.plat_nomor || "-"}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      value={item.total_harga ? `Rp ${parseInt(item.total_harga).toLocaleString("id-ID")}` : "-"}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                </>
              )}
            </>
          )}

          {/* Informasi Tanggal (untuk semua item types) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="text"
              value={
                item.tanggal_mulai
                  ? new Date(item.tanggal_mulai).toLocaleDateString()
                  : "-"
              }
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="text"
              value={
                item.tanggal_selesai
                  ? new Date(item.tanggal_selesai).toLocaleDateString()
                  : "-"
              }
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* Informasi Harga (untuk non-KENDARAAN items) */}
          {item.item_type !== "KENDARAAN" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Item Price
              </label>
              <input
                type="text"
                value={
                  item.total_harga
                    ? `Rp ${parseInt(item.total_harga).toLocaleString("id-ID")}`
                    : "-"
                }
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
          )}
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div
        className="shadow-md"
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800"> Order Edit </h1>
          </div>
        </div>

        <div className="">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking ID
                </label>
                <input
                  type="text"
                  value={orderData.id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={orderData.user.nama}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={orderData.user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Phone
                </label>
                <input
                  type="text"
                  value={orderData.user.nomor_hp}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Total Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="text"
                  value={
                    orderData.total_harga
                      ? `Rp ${parseInt(orderData.total_harga).toLocaleString(
                          "id-ID"
                        )}`
                      : "-"
                  }
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={orderData.status}
                  disabled
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Created Date
                </label>
                <input
                  type="text"
                  value={
                    orderData.createdAt
                      ? new Date(orderData.createdAt).toLocaleDateString()
                      : "-"
                  }
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Order Items Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Items
              </h3>
              {renderOrderItems()}
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={orderData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Additional notes for this order..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
