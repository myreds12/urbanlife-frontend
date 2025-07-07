import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ContactForm from "../../../components/LandingPage/OrderDetail/ContactForm";
import CustomerRequest from "../../../components/LandingPage/OrderDetail/CustomerRequest";
import ServiceDescription from "../../../components/LandingPage/OrderDetail/ServiceDescription";
import PriceSection from "../../../components/LandingPage/OrderDetail/PriceSection";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import ReactModal from "react-modal";
import { validateForm } from "../../../components/AdminDashboard/Utils/ValidationFrom/ValidationForm";
import BookingListCard from "../../../components/LandingPage/OrderDetail/BookingListCard";

const OrderDetail = () => {
  const location = useLocation();
  const bookingFromState = location.state;
  const bookingInfo = bookingFromState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [price, setPrice] = useState(bookingInfo.price);

  const [orderItems, setOrderItems] = useState(() => {
    const today = new Date().toISOString().split("T")[0];

    let item = {
      item_id: bookingFromState.id,
      tanggal_mulai: today,
      tanggal_selesai: "",
      item_type: bookingFromState.type,
    };

    switch (bookingFromState.type) {
      case "travel_package":
        item = {
          ...item,
          title: bookingFromState.title,
          lokasi: bookingFromState.location || "Unknown",
          negara: bookingFromState.country || "Unknown",
          image: bookingFromState.image,
          jumlah_anak: 0,
          jumlah_dewasa: 1,
          harga_dewasa: bookingFromState.harga_dewasa,
          harga_anak: bookingFromState.harga_anak,
          deskripsi: bookingFromState.content,
        };
        break;

      case "kendaraan":
        item = {
          ...item,
          title: bookingFromState.title,
          lokasi: bookingFromState.location || "Unknown",
          negara: bookingFromState.country || "Unknown",
          image: bookingFromState.image,
          harga: bookingFromState.price,
          durasi: bookingFromState.durasi,
          deskripsi: bookingFromState.content,
        };
        break;

      case "akomodasi":
        item = {
          ...item,
          title: bookingFromState.title,
          lokasi: bookingFromState.lokasi?.nama || "Unknown",
          negara: bookingFromState.lokasi?.negara?.nama || "Unknown",
          image: bookingFromState.image,
          harga: bookingFromState.harga,
          room_and_price: bookingFromState.room_and_price,
          durasi: 1, // default 1 malam
          satuan: "malam",
          deskripsi: bookingFromState.content,
        };
        break;

      default:
        // fallback generic
        item = {
          ...item,
          title: bookingFromState.title,
          lokasi: bookingFromState.location,
          image: bookingFromState.image,
          harga: bookingFromState.price,
          durasi: bookingFromState.durasi || 1,
          deskripsi: bookingFromState.content,
        };
    }

    return [item];
  });


  const [formData, setFormData] = useState({
    durasi_hari: bookingFromState.durasi,
    gender: "Mr",
    nama: "",
    nomor_hp: "+62",
    email: "",
    tanggal_mulai: bookingFromState.tanggal,
    tanggal_selesai: "",
    deskripsi: "",
    satuan: "Hari",
    agreeToTerms: false,
  });

  const handleSelectServiceItem = (item) => {
    const rawUrl = item.file_url;
    const type = selectedType.toLocaleLowerCase();
    const imageUrl =
      rawUrl && rawUrl.trim() !== ""
        ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${rawUrl
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`
        : "/images/default-thumbnail.png";

    const today = new Date().toISOString().split("T")[0];

    let formattedItem = {
      item_id: item.id,
      tanggal_mulai: today,
      tanggal_selesai: "",
      item_type: type,
    };

    switch (type) {
      case "travel_package":
        formattedItem = {
          ...formattedItem,
          title: item.nama || "Unknown Title",
          lokasi: item.lokasi?.nama || "Unknown",
          negara: item.lokasi?.negara?.nama || "Unknown",
          image: imageUrl,
          jumlah_anak: 0,
          jumlah_dewasa: 1,
          harga_dewasa: item.harga_dewasa || 0,
          harga_anak: item.harga_anak || 0,
          durasi_hari: item.durasi_hari || 1,
          deskripsi: item.content || [],
          total_harga: item.harga_dewasa || 0, // default awal 1 dewasa
        };
        break;

      case "kendaraan":
        formattedItem = {
          ...formattedItem,
          title: item.nama || "Unknown Title",
          lokasi: item.lokasi?.nama || "Unknown",
          negara: item.lokasi?.negara?.nama || "Unknown",
          image: imageUrl,
          harga: item.harga || 0,
          durasi: item.durasi || [],
          deskripsi: item.content || [],
          total_harga: item.harga || 0,
        };
        break;

      case "akomodasi":
        formattedItem = {
          ...formattedItem,
          title: item.nama || "Unknown Title",
          lokasi: item.lokasi?.nama || "Unknown",
          negara: item.lokasi?.negara?.nama || "Unknown",
          image: imageUrl,
          harga: item.room_and_price?.[0]?.harga || 0,
          room_and_price: item.room_and_price || [],
          durasi: 1,
          satuan: "malam",
          deskripsi: item.content || [],
          total_harga: item.room_and_price?.[0]?.harga || 0,
        };
        break;

      default:
        formattedItem = {
          ...formattedItem,
          title: item.nama || "Unknown Title",
          lokasi: item.lokasi?.nama || "Unknown",
          image: imageUrl,
          harga: item.harga || 0,
          durasi: item.durasi || 1,
          deskripsi: item.content || [],
          total_harga: item.harga || 0,
        };
    }

    setPrice((prevPrice) => prevPrice + Number(formattedItem.total_harga));
    setOrderItems((prevItems) => [...prevItems, formattedItem]);
    setIsModalOpen(false);
    setSelectedType("");
    setAvailableServices([]);
  };

  const handleFormChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validationRules = [
    { key: "nama", label: "Nama", required: true },
    { key: "email", label: "Email", required: true, type: "email" },
    { key: "nomor_hp", label: "Nomor HP", required: true, type: "phone" },
  ];
  const handleRemoveItem = (id) => {
    const foundItem = orderItems.find((item) => item.item_id === id);

    if (!foundItem) {
      console.warn("Item not found for removal with id:", id);
      return;
    }

    setPrice((prevPrice) => prevPrice - foundItem.harga);
    setOrderItems(orderItems.filter((item) => item.item_id !== id));
  };

  const handleUpdateItem = (itemId, updatedValues) => {
    setOrderItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.item_id !== itemId) {
          return item;
        }

        const updatedItem = {
          ...item,
          ...updatedValues,
          selected_durasi: updatedValues.selected_durasi
            ? { ...updatedValues.selected_durasi }
            : item.selected_durasi,
          selected_room: updatedValues.selected_room
            ? { ...updatedValues.selected_room }
            : item.selected_room,
        };

        let total = 0;

        if (updatedItem.item_type === "travel_package") {
          const hargaDewasa = updatedItem.harga_dewasa || 0;
          const hargaAnak = updatedItem.harga_anak || 0;
          const jumlahDewasa = updatedItem.jumlah_dewasa || 0;
          const jumlahAnak = updatedItem.jumlah_anak || 0;
          total = jumlahDewasa * hargaDewasa + jumlahAnak * hargaAnak;
        } else if (updatedItem.item_type === "akomodasi") {
          const durasi = updatedItem.durasi;

          total = durasi * updatedItem.harga;
        } else if (
          updatedItem.item_type === "kendaraan" &&
          updatedItem.selected_durasi
        ) {
          total = updatedItem.harga || 0;
        }

        updatedItem.total_harga = total;

        return updatedItem;
      });

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + Number(item.total_harga || 0),
        0
      );
      setPrice(newTotal);

      return updatedItems;
    });
  };

  const handleAddService = async ({ type, items }) => {
    setSelectedType(type);
    setAvailableServices(items || []);
    setIsModalOpen(true);
  };

  const handlePayment = async () => {
    try {
      // 1. Persiapkan data untuk pemesanan
      // const totalHarga = Number(
      //   bookingInfo.price
      //     .replace(/[^0-9,]/g, "") // Hilangkan Rp dan titik
      //     .replace(/,\d{1,2}$/, "") // Hapus koma dan dua angka di belakang
      // );

      const validation = validateForm(formData, validationRules);
      if (!validation.valid) {
        toast.error(validation.message);
        return;
      }

      const pemesananPayload = {
        nama: formData.nama,
        email: formData.email,
        gender: formData.gender == "Mr" ? "Laki-laki" : "Perempuan",
        nomor_hp: formData.nomor_hp,
        type: orderItems[0].item_type.toUpperCase(),
        total_harga: price,
        status: "PENDING",
        order_item: orderItems.map((item) => {
          const base = {
            item_type: item.item_type.toUpperCase(),
            item_id: item.item_id,
            tanggal_mulai: new Date(item.tanggal_mulai).toISOString(),
            tanggal_selesai: item.tanggal_selesai
              ? new Date(item.tanggal_selesai).toISOString()
              : null,
            harga: Number(item.total_harga || 0),
          };

          if (item.item_type === "akomodasi") {
            return {
              ...base,
              room_id: item.selected_room?.id || null,
              durasi_hari: item.durasi || 1,
            };
          }

          if (item.item_type === "kendaraan") {
            return {
              ...base,
              durasi_id: item.selected_durasi?.id || null,
            };
          }

          if (item.item_type === "travel_package") {
            return {
              ...base,
              jumlah_dewasa: item.jumlah_dewasa || 0,
              jumlah_anak: item.jumlah_anak || 0,
            };
          }

          return base;
        }),
      };

      console.log("Data Pemesanan Payload:", pemesananPayload);

      // 2. Kirim request untuk membuat pemesanan
      const { data: pemesananData } = await apiClient.post(
        "/pemesanan",
        pemesananPayload
      );

      console.log("Data Pemesanan:", pemesananData);

      if (!pemesananData || !pemesananData.data.id) {
        toast.error("Pemesanan gagal dibuat.");
        return;
      }

      // 3. Persiapkan FormData untuk pembayaran
      const pembayaranForm = new FormData();
      pembayaranForm.append("pemesanan_id", pemesananData.data.id);
      pembayaranForm.append("tanggal_bayar", new Date().toISOString());
      pembayaranForm.append("jumlah_bayar", price);

      // 4. Kirim request untuk membuat pembayaran
      const { data: pembayaranData } = await apiClient.post(
        "/pembayaran",
        pembayaranForm
      );

      if (!pembayaranData || !pembayaranData.data.invoice_url) {
        toast.error("Gagal memproses pembayaran.");
        return;
      }

      // 5. Sukses: tampilkan toast dan redirect ke Xendit invoice
      toast.success("Pemesanan berhasil! Mengalihkan ke halaman pembayaran...");
      window.location.href = pembayaranData.data.invoice_url;
    } catch (error) {
      console.error("Error saat memesan:", error);
      toast.error("Terjadi kesalahan saat melakukan pemesanan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8">
          {/* Left Section: Main Content */}
          <div className="space-y-8">
            {/* Order Detail Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order Detail
              </h1>
              <p className="text-gray-600">
                These contact details will be used to send the e-invoice and for
                rescheduling purposes.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ContactForm
                formData={formData}
                onFormChange={handleFormChange}
              />
            </div>

            {/* Service Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ServiceDescription contentData={bookingInfo.content} />
            </div>

            {/* Customer Request */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CustomerRequest
                specialRequest={formData.deskripsi}
                onRequestChange={(request) =>
                  handleFormChange({ deskripsi: request })
                }
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleFormChange({ agreeToTerms: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to Urbanlife's{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </a>
                </span>
              </label>
            </div>
          </div>

          {/* Right Section: Booking Summary */}
          <div className="space-y-6">
            {/* Booking Items Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BookingListCard
                orderItems={orderItems}
                onRemoveItem={handleRemoveItem}
                onAddService={handleAddService}
                onUpdateItem={handleUpdateItem}
              />
            </div>

            {/* Price Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PriceSection
                amount={price}
                bookingInfo={bookingInfo}
                formData={formData}
                onPayment={handlePayment}
                disabled={!formData.agreeToTerms}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Selecting Service */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Select Service Modal"
        className="relative w-full max-w-lg md:rounded-2xl bg-white p-6 mx-auto my-8 shadow-xl focus:outline-none max-h-[90vh] overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      >
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Pilih {selectedType}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {availableServices.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Tidak ada layanan yang tersedia.</p>
          </div>
        ) : (
          <ul className="space-y-3 overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {availableServices.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectServiceItem(item)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition cursor-pointer"
              >
                <div className="font-medium text-gray-800">
                  {item.name || item.nama || `Item ${item.id}`}
                </div>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
          >
            Batal
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default OrderDetail;
