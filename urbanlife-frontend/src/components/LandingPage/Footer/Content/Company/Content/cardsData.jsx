// cardsData.js
export const cardsData = [
  {
    id: 1,
    image: "/api/placeholder/300/200",
    category: "CVE-2024-3393",
    difficulty: "Medium",
    title: "Palo Alto Releases Patch for PAN-OS DoS Flaw — Update Immediately",
    description: "Palo Alto Networks has disclosed a high-severity vulnerability impacting PAN-OS software that could cause a denial-of-service (DoS) condition on susceptible devices. Palo Alto Networks said it discovered the flaw in production use, and...",
    buttonText: "Analyze Vulnerability",
    categoryColor: "#f59e0b",
    difficultyColor: "#10b981"
  },
  {
    id: 2,
    image: "/api/placeholder/300/200",
    category: "2 TTPs",
    difficulty: "High",
    title: "A cyber attack hit Japan Airlines delaying ticket sales for flights",
    description: "A cyberattack hit Japan Airlines (JAL), causing the suspension of ticket sales for flights departing on Thursday. A cyber attack hit Japan Airlines (JAL) on Thursday, the of...",
    buttonText: "Analyze Tactics",
    categoryColor: "#ef4444",
    difficultyColor: "#ef4444"
  },
  {
    id: 3,
    image: "/api/placeholder/300/200",
    category: "3 CVEs",
    difficulty: "Mixed",
    title: "Emerging Threats & Vulnerabilities to Prepare for in 2025",
    description: "Palo Alto Networks has disclosed a high-severity vulnerability impacting PAN-OS software that could cause a denial-of-service (DoS) condition on susceptible devices. Palo Alto Networks said it discovered the flaw in production use, and...",
    buttonText: "Analyze Vulnerability",
    categoryColor: "#8b5cf6",
    difficultyColor: "#f59e0b"
  },
  {
    id: 4,
    image: "/api/placeholder/300/200",
    category: "4 CVEs",
    difficulty: "High",
    title: "FICORA and Kaiten Botnets Exploit Old D-Link Vulnerabilities for Global Attacks",
    description: "FICORA botnet attacks said to the deployment of a downloader shell script ('multsh') from a remote server ('193.149.127.139'), which then downloads and installs a multi-stage script...",
    buttonText: "Analyze Vulnerabilities",
    categoryColor: "#ef4444",
    difficultyColor: "#ef4444"
  },
  {
    id: 5,
    image: "/api/placeholder/300/200",
    category: "About Us",
    difficulty: "Info",
    title: "Learn About Our Company Mission and Values",
    description: "Discover our journey, mission, and commitment to providing exceptional services. We are dedicated to delivering quality solutions that meet your needs and exceed expectations.",
    buttonText: "Read More",
    categoryColor: "#0891b2",
    difficultyColor: "#6b7280"
  },
  {
    id: 6,
    image: "/api/placeholder/300/200",
    category: "Privacy",
    difficulty: "Legal",
    title: "Privacy Policy and Data Protection",
    description: "Understanding how we collect, use, and protect your personal information. Our comprehensive privacy policy ensures your data security and transparency in our operations.",
    buttonText: "View Policy",
    categoryColor: "#059669",
    difficultyColor: "#6b7280"
  },
  {
    id: 7,
    image: "/api/placeholder/300/200",
    category: "Day Tours",
    difficulty: "Popular",
    title: "Explore Bali's Best Day Tour Packages",
    description: "Experience the beauty of Bali with our curated day tour packages. From cultural sites to natural wonders, discover the island's hidden gems with professional guides.",
    buttonText: "Book Now",
    categoryColor: "#dc2626",
    difficultyColor: "#f59e0b"
  },
  {
    id: 8,
    image: "/api/placeholder/300/200",
    category: "Transport",
    difficulty: "Essential",
    title: "Bali Airport Transfer Service",
    description: "Reliable and comfortable airport transfer services in Bali. Professional drivers, clean vehicles, and punctual service to ensure your smooth arrival and departure.",
    buttonText: "Book Transfer",
    categoryColor: "#7c3aed",
    difficultyColor: "#0891b2"
  },
  {
    id: 9,
    image: "/api/placeholder/300/200",
    category: "Car Rental",
    difficulty: "Flexible",
    title: "Car Rental Services in Bali",
    description: "Rent a car in Bali for maximum flexibility during your vacation. Wide selection of vehicles from economy to luxury cars with competitive rates and full insurance.",
    buttonText: "Rent Car",
    categoryColor: "#ea580c",
    difficultyColor: "#10b981"
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