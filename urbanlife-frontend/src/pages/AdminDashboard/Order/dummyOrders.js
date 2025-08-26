// src/data/dummyOrders.js

const dummyOrders = [
  {
    id: "ORD-1001",
    user: { nama: "Budi Santoso", email: "budi@example.com" },
    type: "Day Tour",
    detail: "Tour ke Bali 3 hari 2 malam",
    createdAt: "2025-08-01",
    total_harga: 2500000,
    status: "DONE",
  },
  {
    id: "ORD-1002",
    user: { nama: "Siti Aminah", email: "siti@example.com" },
    type: "Rent Car",
    detail: "Sewa mobil Avanza 24 jam",
    createdAt: "2025-08-02",
    total_harga: 500000,
    status: "PENDING",
  },
  {
    id: "ORD-1003",
    user: { nama: "Andi Wijaya", email: "andi@example.com" },
    type: "Accommodation",
    detail: "Hotel bintang 4, 2 malam",
    createdAt: "2025-08-03",
    total_harga: 1500000,
    status: "DIBATALKAN",
  },
  {
    id: "ORD-1004",
    user: { nama: "Dewi Lestari", email: "dewi@example.com" },
    type: "Day Tour",
    detail: "City tour Yogyakarta",
    createdAt: "2025-08-04",
    total_harga: 750000,
    status: "DONE",
  },
  {
    id: "ORD-1005",
    user: { nama: "Rudi Hartono", email: "rudi@example.com" },
    type: "Rent Car",
    detail: "Sewa mobil Innova 12 jam",
    createdAt: "2025-08-05",
    total_harga: 600000,
    status: "PENDING",
  },
];

export default dummyOrders;
