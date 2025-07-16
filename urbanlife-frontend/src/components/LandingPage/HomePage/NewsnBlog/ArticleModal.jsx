import React, { useState } from 'react';

const ArticleModal = ({ article, isOpen, onClose }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const shareData = {
    title: "Bagikan Artikel",
    location: article.title,
    description: article.description,
    image: article.image,
    url: window.location.href,
  };

  const shareOptions = [
    {
      id: 'copy',
      name: 'Salin Tautan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: 'email',
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        const subject = encodeURIComponent(`${article.title}`);
        const body = encodeURIComponent(`Check out this article: ${shareData.url}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
      },
    },
    {
      id: 'message',
      name: 'Pesan',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: () => {
        const text = encodeURIComponent(`${article.title}: ${shareData.url}`);
        window.open(`sms:?body=${text}`);
      },
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      action: () => {
        const text = encodeURIComponent(`${article.title}: ${shareData.url}`);
        window.open(`https://wa.me/?text=${text}`);
      },
    },
    {
      id: 'messenger',
      name: 'Messenger',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.732 8.1l3.13 3.259L19.752 8.1l-6.559 6.863z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://m.me/share?link=${encodeURIComponent(shareData.url)}`);
      },
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
      },
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        const text = encodeURIComponent(`${article.title}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareData.url)}`);
      },
    },
  ];

    const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-[100] transition-opacity duration-300">
        <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] mt-25 overflow-y-auto">
          <div className="relative">
            {/* Header Image */}
            <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0092B8]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center gap-3 text-sm text-gray-500 mb-4">
                <div className='flex  gap-3'>
                  <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="">
                  <span className="bg-[#0092B8] text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>

              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#071C4D] mb-4 leading-tight">
                {article.title}
              </h1>

              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
                <p className="leading-relaxed mb-4">{article.description}</p>
                <p className="leading-relaxed">{article.fullContent}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#0092B8]"
                >
                  Tutup
                </button>
                <button
                  onClick={handleShareClick}
                  className="flex-1 bg-gradient-to-r from-[#0092B8] to-[#007F9F] hover:from-[#007F9F] hover:to-[#006B85] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#0092B8]"
                >
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[1001] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseShareModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-xs w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">{shareData.title}</h2>
                <button
                  onClick={handleCloseShareModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0092B8]"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Preview */}
              <div className="flex gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={shareData.image}
                  alt={shareData.location}
                  className="w-14 h-10 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{shareData.location}</p>
                  <p className="text-xs text-gray-600 line-clamp-3">{shareData.description}</p>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-2">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={option.action}
                    className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[#0092B8]"
                  >
                    <div className="text-gray-600">{option.icon}</div>
                    <span className="text-sm font-medium text-gray-900">{option.name}</span>
                  </button>
                ))}
              </div>

              {/* Copy Success Message */}
              {copied && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-sm text-green-800">
                    ✓ Berhasil disalin ke clipboard
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleModal;