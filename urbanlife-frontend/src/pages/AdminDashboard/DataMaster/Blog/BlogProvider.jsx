import React, { createContext, useState } from "react";

export const BlogContext = createContext();

const initialBlogData = [
  {
    id: 1,
    category: "Art Market",
    content: [
      { bahasa: "ENGLISH", judul: "Ubud Art Market", deskripsi: "Ubud Art Market is a traditional market offering unique handicrafts..." },
      { bahasa: "INDONESIA", judul: "Pasar Seni Ubud", deskripsi: "Pasar Seni Ubud adalah pasar tradisional yang menawarkan kerajinan tangan unik..." },
    ],
    files: [{ nama_file: "artmarket.jpg", fullUrl: "/images/artmarket.jpg" }],
    date: "2024-09-08",
    slug: "ubud-art-market",
    location: "North-eastern Bali",
  },
  {
    id: 2,
    category: "Beach",
    content: [
      { bahasa: "ENGLISH", judul: "Kuta Beach", deskripsi: "Kuta Beach is famous for its sunset views..." },
      { bahasa: "INDONESIA", judul: "Pantai Kuta", deskripsi: "Pantai Kuta terkenal dengan pemandangan matahari terbenamnya..." },
    ],
    files: [{ nama_file: "kutabeach.jpg", fullUrl: "/images/kutabeach.jpg" }],
    date: "2024-10-01",
    slug: "kuta-beach",
    location: "South Bali",
  },
];

const categories = [
  { value: "Art Market", label: "Art Market" },
  { value: "Beach", label: "Beach" },
  { value: "Cultural Park", label: "Cultural Park" },
  { value: "Dance", label: "Dance" },
  { value: "Hot Spring", label: "Hot Spring" },
  { value: "Monkey Forest", label: "Monkey Forest" },
  { value: "Rice Terrace", label: "Rice Terrace" },
  { value: "Temple", label: "Temple" },
  { value: "Volcano", label: "Volcano" },
  { value: "Waterfall", label: "Waterfall" },
  { value: "Water Palace", label: "Water Palace" },
  { value: "Water Sport", label: "Water Sport" },
];

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState(initialBlogData);

  return (
    <BlogContext.Provider value={{ blogData, setBlogData, categories }}>
      {children}
    </BlogContext.Provider>
  );
};