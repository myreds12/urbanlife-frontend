// cardsData.js
export const cardsData = [
  {
    id: 1,
    image: "./images/LandingPage/Footer/content/company/AboutUs.png",
    category: "About Us",
//     difficulty: "Info",  
    title: "Learn About Our Company Mission and Values",
    description: "Discover our journey, mission, and commitment to providing exceptional services. We are dedicated to delivering quality solutions that meet your needs and exceed expectations.",
    buttonText: "Read More",
    categoryColor: "#0891b2",
//     difficultyColor: "#6b7280"
  },
  {
    id: 2,
    image: "./images/LandingPage/Footer/content/company/PrivacyPolicy.png",
    category: "Privacy",
    // difficulty: "Legal",
    title: "Privacy Policy and Data Protection",
    description: "Understanding how we collect, use, and protect your personal information. Our comprehensive privacy policy ensures your data security and transparency in our operations.",
    buttonText: "View Policy",
    categoryColor: "#059669",
//     difficultyColor: "#6b7280"
  },
  {
    id: 3,
    image: "./images/LandingPage/Footer/content/company/DayTour.png",
    category: "Day Tours",
    // difficulty: "Popular",
    title: "Explore Bali's Best Day Tour Packages",
    description: "Experience the beauty of Bali with our curated day tour packages. From cultural sites to natural wonders, discover the island's hidden gems with professional guides.",
    buttonText: "Book Now",
    categoryColor: "#dc2626",
//     difficultyColor: "#f59e0b"
  },
  {
    id: 4,
    image: "/api/placeholder/300/200",
    category: "Transport",
    // difficulty: "Essential",
    title: "Bali Airport Transfer Service",
    description: "Reliable and comfortable airport transfer services in Bali. Professional drivers, clean vehicles, and punctual service to ensure your smooth arrival and departure.",
    buttonText: "Book Transfer",
    categoryColor: "#7c3aed",
//     difficultyColor: "#0891b2"
  },
  {
    id: 5,
    image: "/api/placeholder/300/200",
    category: "Car Rental",
    // difficulty: "Flexible",
    title: "Car Rental Services in Bali",
    description: "Rent a car in Bali for maximum flexibility during your vacation. Wide selection of vehicles from economy to luxury cars with competitive rates and full insurance.",
    buttonText: "Rent Car",
    categoryColor: "#ea580c",
    // difficultyColor: "#10b981"
  }
];

// Filter functions
export const getCardsByCategory = (category) => {
  if (category === 'All') return cardsData;
  
  return cardsData.filter(card => {
    switch (category) {
      case 'About Us':
        return card.category.toLowerCase().includes('about') || card.title.toLowerCase().includes('about');
      case 'Privacy Policy':
        return card.category.toLowerCase().includes('privacy') || card.title.toLowerCase().includes('privacy');
      case 'Terms and Conditions':
        return card.title.toLowerCase().includes('terms') || card.title.toLowerCase().includes('conditions');
      case 'Contact Us':
        return card.title.toLowerCase().includes('contact');
      case 'Day Tours':
        return card.category.toLowerCase().includes('day tours') || card.title.toLowerCase().includes('day tour');
      case 'Bali Airport Transfer Service':
        return card.category.toLowerCase().includes('transport') || card.title.toLowerCase().includes('airport transfer');
      case 'Car Rental':
        return card.category.toLowerCase().includes('car rental') || card.title.toLowerCase().includes('car rental');
      case 'Bali Motorbike Rental':
        return card.title.toLowerCase().includes('motorbike') || card.title.toLowerCase().includes('motorcycle');
      case 'Transportation to/from Sanur Pier':
        return card.title.toLowerCase().includes('sanur') || card.title.toLowerCase().includes('pier');
      default:
        return false;
    }
  });
};