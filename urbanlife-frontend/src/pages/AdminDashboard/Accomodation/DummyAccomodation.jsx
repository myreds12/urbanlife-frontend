export const dummyAccomodationData = [
  {
    id: 1,
    name: "Serenity Hills Resorts",
    location: {
      nama: "Bandung",
      negara: {
        nama: "Indonesia",
      },
    },
    type: "Eco Lodge",
    category: "000",
    description: {
      indonesia:
        "Serenity Hills Resort adalah penginapan ramah lingkungan yang dikelilingi hutan pinus, cocok untuk relaksasi dan pelarian dari hiruk pikuk kota.",
      english:
        "Serenity Hills Resort is an eco-friendly accommodation surrounded by pine forests, perfect for relaxation and escape from the city noise.",
    },
    price: {
      harga: 5000000,
      includes: {
        indonesia: ["Deluxe Room: Rp 950.000/malam", "Standard Room: Rp 700.000/malam", "Family Cabin: Rp 1.300.000/malam"],
        english: ["Deluxe Room: Rp 950.000/night", "Standard Room: Rp 700.000/night", "Family Cabin: Rp 1.300.000/night"],
      },
    },
    facility: {
      indonesia:
        ["WiFi Gratis", "Sarapan", "Pemandangan Hutan", "Jalur Hiking", "Area Api Unggun"],
      english:
        ["Free WiFi", "Breakfast", "Forest View", "Hiking Trail", "Campfire Area"]
    },
    images: [
       "https://images.unsplash.com/photo-1504457046783-0f68c1d52f3d?w=500",
       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
       "https://images.unsplash.com/photo-1501973801540-537f08ccae7d?w=500"
    ]
  },
];
