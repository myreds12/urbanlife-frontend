import React from 'react';

const ArticleModal = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#0092B8] text-white px-4 py-2 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-[#071C4D] mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {article.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {article.fullContent}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Close
              </button>
              <button className="flex-1 bg-gradient-to-r from-[#0092B8] to-[#007F9F] hover:from-[#007F9F] hover:to-[#006B85] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                Share Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;