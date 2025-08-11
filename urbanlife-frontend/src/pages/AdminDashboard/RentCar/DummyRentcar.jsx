export const dummyRentCarData = [
  {
    id: 1,
    nama: "Honda Civic",
    model: "Civic Type R",
    lokasi: {
      nama: "Bali",
      negara: {
        nama: "Indonesia",
      },
    },
    status: true,
    description: {
      indonesia:
        "Honda Civic Type R adalah mobil sport yang menggabungkan performa tinggi dengan kenyamanan berkendara. Dilengkapi dengan mesin turbocharged yang bertenaga dan fitur-fitur canggih untuk pengalaman berkendara yang tak terlupakan.",
      english:
        "Honda Civic Type R is a sports car that combines high performance with driving comfort. Equipped with a powerful turbocharged engine and advanced features for an unforgettable driving experience.",
    },
    capacity: "4 - 6 people",
    policy_and_procedure: {
      indonesia: "blablabla",
      english: "bliblibli",
    },
    plat_nomor: "B 1234 ABC",
    tax_status: true,
    tanggal_pajak_berakhir: "2024-12-31",
    price: {
      harga: 5000000,
      includes: {
        indonesia: ["15-20 Jam"],
        english: ["15 - 20 hours"],
      },
    },
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500",
    ],
  },
];

export default dummyRentCarData;
