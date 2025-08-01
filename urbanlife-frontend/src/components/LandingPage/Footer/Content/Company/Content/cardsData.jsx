// cardsData.js
export const cardsData = [
  {
    id: 1,
    image: "./images/LandingPage/Footer/content/company/AboutUs.png",
    category: "About Us",
    title: "Learn About Our Company Mission and Values",
    description: "Discover our journey, mission, and commitment to providing exceptional services. We are dedicated to delivering quality solutions that meet your needs and exceed expectations.",
    buttonText: "Read More",
    categoryColor: "#0891b2",
    link: "/AboutUs"
  },
  {
    id: 2,
    image: "./images/LandingPage/Footer/content/company/PrivacyPolicy.png",
    category: "Privacy Policy",
    title: "Privacy Policy and Data Protection",
    description: "Understanding how we collect, use, and protect your personal information. Our comprehensive privacy policy ensures your data security and transparency in our operations.",
    buttonText: "View Policy",
    categoryColor: "#059669",
    link: "/PrivacyPolicy"
  },
  {
    id: 3,
    image: "./images/LandingPage/Footer/content/company/TermsandConditions.png",
    category: "Terms and Conditions",
    title: "Terms of Service",
    description: "Welcome to our Terms of Service. By using our platform, you agree to the following terms and conditions. Please review them carefully.",
    buttonText: "View Policy",
    categoryColor: "#f43f5e",
    link: "/TermsAndConditions"
  },
  {
    id: 4,
    image: "./images/LandingPage/Footer/content/company/ContactUs.png",
    category: "Contact Us",
    title: "Contact Us",
    description: "We're here to help you. Whether you have questions, feedback, or need assistance, feel free to contact us. Our dedicated team is ready to provide you with the support you need.",
    buttonText: "Contact Now",
    categoryColor: "#f43f5e",
    link: "/ContactUs"
  },
  {
    id: 5,
    image: "./images/LandingPage/Footer/content/company/DayTour.png",
    category: "Day Tours",
    title: "Explore Bali's Best Day Tour Packages",
    description: "Experience the beauty of Bali with our curated day tour packages. From cultural sites to natural wonders, discover the island's hidden gems with professional guides.",
    buttonText: "Book Now",
    categoryColor: "#dc2626",
    linkTo: "/DayTour"
  },
  {
    id: 6,
    image: "./images/LandingPage/Footer/content/company/BaliAirportTransferService.png",
    category: "Bali Airport Transfer Service",
    title: "Bali Airport Transfer Service",
    description: "Reliable and comfortable airport transfer services in Bali. Professional drivers, clean vehicles, and punctual service to ensure your smooth arrival and departure.",
    buttonText: "Book Transfer",
    categoryColor: "#7c3aed"
  },
  {
    id: 7,
    image: "./images/LandingPage/Footer/content/company/CarRental.png",
    category: "Car Rental",
    title: "Car Rental Services in Bali",
    description: "Rent a car in Bali for maximum flexibility during your vacation. Wide selection of vehicles from economy to luxury cars with competitive rates and full insurance.",
    buttonText: "Rent Car",
    categoryColor: "#2563eb",
    linkTo: "/unit-car"
  },
  {
    id: 8,
    image: "./images/LandingPage/Footer/content/company/BaliMotorbikeRental.png",
    category: "Bali Motorbike Rental",
    title: "Bali Motorbike Rental Services",
    description: "Explore the convenience of renting a motorbike in Bali. Enjoy the ease of travel and the flexibility of our rental options. Whether you need a compact car or a powerful motorbike, we have the perfect solution for your needs.",
    buttonText: "Rent Motorbike",
    categoryColor: "#f97316"
  },
  {
    id: 9,
    image: "./images/LandingPage/Footer/content/company/TransportationTo.png",
    category: "Transportation to/from Sanur Pier",
    title: "Transportation to/from Sanur Pier",
    description: "Easily access the island's main ports and terminals. Our reliable transportation services ensure your smooth journey to and from Sanur Pier. Whether you're heading to or returning from work, we have you covered.",
    buttonText: "Book Now",
    categoryColor: "#10b981"
  }
];

// Filter functions
export const getCardsByCategory = (category) => {
  if (category === 'All') return cardsData;

  return cardsData.filter(card => {
    const title = card.title.toLowerCase();
    const cat = card.category.toLowerCase();

    switch (category) {
      case 'About Us':
        return cat.includes('about') || title.includes('about');
      case 'Privacy Policy':
        return cat.includes('privacy') || title.includes('privacy');
      case 'Terms and Conditions':
        return cat.includes('terms') || title.includes('terms') || title.includes('conditions');
      case 'Contact Us':
        return cat.includes('contact') || title.includes('contact');
      case 'Day Tours':
        return cat.includes('day tour') || title.includes('day tour');
      case 'Bali Airport Transfer Service':
        return cat.includes('airport') || title.includes('airport');
      case 'Car Rental':
        return cat.includes('car rental') || title.includes('car rental');
      case 'Bali Motorbike Rental':
        return cat.includes('motorbike') || title.includes('motorbike');
      case 'Transportation to/from Sanur Pier':
        return cat.includes('sanur') || title.includes('sanur') || title.includes('pier');
      default:
        return false;
    }
  });
};
