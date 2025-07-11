import { Camera, Car, Home } from "lucide-react";

export const dummyResults = {
  "day-tour": [
    {
      id: 1,
      title: "Jakarta City Heritage Tour",
      description: "Explore Jakarta's rich history and culture",
      price: "Rp 450,000",
      duration: "8 hours",
      rating: 4.8,
      image: "🏛️",
    },
    {
      id: 2,
      title: "Bali Traditional Village Experience",
      description: "Immerse yourself in authentic Balinese culture",
      price: "Rp 650,000",
      duration: "Full day",
      rating: 4.9,
      image: "🏝️",
    },
    {
      id: 3,
      title: "Ho Chi Minh Street Food Adventure",
      description: "Taste the best Vietnamese street food",
      price: "$35",
      duration: "4 hours",
      rating: 4.7,
      image: "🍜",
    },
    {
      id: 4,
      title: "Tokyo Modern & Traditional Mix",
      description: "Experience both sides of Tokyo",
      price: "¥8,500",
      duration: "10 hours",
      rating: 4.9,
      image: "🏯",
    },
  ],
  "rent-car": [
    {
      id: 5,
      title: "Toyota Avanza - Family Car",
      description: "Perfect for family trips, 7 seats",
      price: "Rp 350,000/day",
      features: "AC, GPS, Driver available",
      rating: 4.6,
      image: "🚗",
    },
    {
      id: 6,
      title: "Honda Civic - Luxury Sedan",
      description: "Comfortable and elegant ride",
      price: "Rp 500,000/day",
      features: "Premium interior, Bluetooth",
      rating: 4.8,
      image: "🚙",
    },
    {
      id: 7,
      title: "Yamaha NMAX - Scooter",
      description: "Easy to navigate city traffic",
      price: "Rp 85,000/day",
      features: "Helmet included, Fuel efficient",
      rating: 4.5,
      image: "🛵",
    },
  ],
  "accommodation": [
    {
      id: 8,
      title: "Grand Hyatt Jakarta",
      description: "5-star luxury hotel in city center",
      price: "Rp 2,500,000/night",
      amenities: "Pool, Spa, Restaurant, Gym",
      rating: 4.9,
      image: "🏨",
    },
    {
      id: 9,
      title: "Ubud Jungle Villa",
      description: "Private villa surrounded by nature",
      price: "Rp 1,800,000/night",
      amenities: "Private pool, Kitchen, Garden",
      rating: 4.8,
      image: "🏡",
    },
    {
      id: 10,
      title: "Shibuya Modern Apartment",
      description: "Stylish apartment in heart of Tokyo",
      price: "¥15,000/night",
      amenities: "WiFi, Kitchen, Metro access",
      rating: 4.7,
      image: "🏙️",
    },
  ],
};

export const countries = [
  { value: "indonesia", label: "Indonesia" },
  { value: "vietnam", label: "Vietnam" },
  { value: "japan", label: "Japan" },
  { value: "singapore", label: "Singapore" },
  { value: "thailand", label: "Thailand" },
  { value: "malaysia", label: "Malaysia" },
];

export const cities = {
  indonesia: [
    { value: "jakarta", label: "Jakarta" },
    { value: "bali", label: "Bali" },
    { value: "yogyakarta", label: "Yogyakarta" },
    { value: "surabaya", label: "Surabaya" },
    { value: "bandung", label: "Bandung" },
  ],
  vietnam: [
    { value: "ho-chi-minh", label: "Ho Chi Minh City" },
    { value: "hanoi", label: "Hanoi" },
    { value: "da-nang", label: "Da Nang" },
    { value: "hoi-an", label: "Hoi An" },
  ],
  japan: [
    { value: "tokyo", label: "Tokyo" },
    { value: "osaka", label: "Osaka" },
    { value: "kyoto", label: "Kyoto" },
    { value: "hiroshima", label: "Hiroshima" },
  ],
  singapore: [{ value: "singapore", label: "Singapore" }],
  thailand: [
    { value: "bangkok", label: "Bangkok" },
    { value: "phuket", label: "Phuket" },
    { value: "chiang-mai", label: "Chiang Mai" },
  ],
  malaysia: [
    { value: "kuala-lumpur", label: "Kuala Lumpur" },
    { value: "penang", label: "Penang" },
    { value: "johor-bahru", label: "Johor Bahru" },
  ],
};

export const services = [
  { value: "day-tour", label: "Day Tour", icon: Camera },
  { value: "rent-car", label: "Rent Car", icon: Car },
  { value: "accommodation", label: "Accommodation", icon: Home },
];