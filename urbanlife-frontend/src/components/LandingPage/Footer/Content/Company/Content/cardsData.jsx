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
    linkTo: "/AboutUs"
  },
  {
    id: 2,
    image: "./images/LandingPage/Footer/content/company/PrivacyPolicy.png",
    category: "Privacy Policy",
    title: "Privacy Policy and Data Protection",
    description: "Understanding how we collect, use, and protect your personal information. Our comprehensive privacy policy ensures your data security and transparency in our operations.",
    buttonText: "View Policy",
    categoryColor: "#059669",
    linkTo: "/PrivacyPolicy"
  },
  {
    id: 3,
    image: "./images/LandingPage/Footer/content/company/TermsandConditions.png",
    category: "Terms and Conditions",
    title: "Terms of Service",
    description: "Welcome to our Terms of Service. By using our platform, you agree to the following terms and conditions. Please review them carefully.",
    buttonText: "View Terms",
    categoryColor: "#f43f5e",
    linkTo: "/TermsAndConditions"
  },
  {
    id: 4,
    image: "./images/LandingPage/Footer/content/company/ContactUs.png",
    category: "Contact Us",
    title: "Contact Us",
    description: "We're here to help you. Whether you have questions, feedback, or need assistance, feel free to contact us. Our dedicated team is ready to provide you with the support you need.",
    buttonText: "Contact Now",
    categoryColor: "#f43f5e",
    linkTo: "/ContactUs"
  },
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
      default:
        return false;
    }
  });
};
