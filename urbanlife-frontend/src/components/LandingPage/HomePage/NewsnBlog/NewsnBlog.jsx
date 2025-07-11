import React, { useState } from 'react';
import ArticleModal from './ArticleModal';
import { dummyNewsData } from './DummyData';

const NewsnBlog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <>
      <div className="py-16">
        <div className="max-w-7xl mx-auto p-4 border border-gray-200 rounded-xl">
          {/* Header - Keeping original style */}
          <div className="mb-9 border-b border-gray-200">
            <h2 className="playfair mb-4 text-[#071C4D] text-[35px] font-bold text-center">
              News and Blog
            </h2>
          </div>

          {/* Articles Grid - Same layout as original */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyNewsData.map((article) => (
              <div key={article.id} className="flex bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300 group">
                {/* Image Section */}
                <div className="w-60 h-full flex-shrink-0 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 flex flex-col justify-between min-h-0">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#0092B8] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[#071C4D] font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#0092B8] transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.description}
                    </p>
                  </div>

                  {/* Button & Read Time */}
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleReadMore(article)}
                      className="bg-[#0092B8] hover:bg-[#007F9F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    >
                      {article.buttonText}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ArticleModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default NewsnBlog;