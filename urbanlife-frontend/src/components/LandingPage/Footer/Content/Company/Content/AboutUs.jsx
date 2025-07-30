import React from 'react';
import ArticleCard from './ArticleCard';

const AboutUs = () => {
  const description = "We provide transportation services in Bali and Jakarta to make it easy for you in exploring the island and visiting your selected list of destinations, so that you could enjoy your holiday and have a great experience.";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto p-6">
      <ArticleCard
        title="About Us"
        description={description}
        link="/company/about-us"
      />
      {/* Include other cards when 'All' category is selected */}
    </div>
  );
};

export default AboutUs;