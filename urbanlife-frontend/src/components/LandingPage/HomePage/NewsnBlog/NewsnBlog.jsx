import React, { useEffect, useState } from "react";
import ArticleModal from "./ArticleModal";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

// Dummy data untuk testing
const dummyNewsData = [
  {
    id: 1,
    createdAt: "2024-07-15T10:30:00Z",
    readTime: "5 min read",
    news_category: {
      name: "Technology"
    },
    news_content: [
      {
        judul: "Breakthrough in AI Technology Revolutionizes Healthcare",
        deskripsi: "A new artificial intelligence system has been developed that can diagnose diseases with 95% accuracy, potentially transforming the healthcare industry and improving patient outcomes worldwide."
      }
    ],
    news_file: [
      {
        nama_file: "ai-healthcare.jpg"
      }
    ]
  },
  {
    id: 2,
    createdAt: "2024-07-20T14:15:00Z",
    readTime: "3 min read",
    news_category: {
      name: "Business"
    },
    news_content: [
      {
        judul: "Startup Ecosystem Shows Strong Growth in Southeast Asia",
        deskripsi: "Investment in Southeast Asian startups reached a record high this quarter, with fintech and e-commerce leading the charge in innovation and market expansion."
      }
    ],
    news_file: [
      {
        nama_file: "startup-growth.jpg"
      }
    ]
  },
  {
    id: 3,
    createdAt: "2024-07-25T09:45:00Z",
    readTime: "7 min read",
    news_category: {
      name: "Environment"
    },
    news_content: [
      {
        judul: "Renewable Energy Projects Gain Momentum Globally",
        deskripsi: "Countries worldwide are accelerating their renewable energy initiatives, with solar and wind power installations reaching unprecedented levels as nations work toward carbon neutrality."
      }
    ],
    news_file: [
      {
        nama_file: "renewable-energy.jpg"
      }
    ]
  },
  {
    id: 4,
    createdAt: "2024-07-28T16:20:00Z",
    readTime: "4 min read",
    news_category: {
      name: "Education"
    },
    news_content: [
      {
        judul: "Digital Learning Platforms Transform Traditional Education",
        deskripsi: "Educational institutions are embracing digital transformation, with online learning platforms showing remarkable success in student engagement and learning outcomes."
      }
    ],
    news_file: [
      {
        nama_file: "digital-education.jpg"
      }
    ]
  },
  {
    id: 5,
    createdAt: "2024-07-30T11:10:00Z",
    readTime: "6 min read",
    news_category: {
      name: "Sports"
    },
    news_content: [
      {
        judul: "Olympic Athletes Prepare for Upcoming International Games",
        deskripsi: "Athletes from around the world are in final preparations for the upcoming international games, showcasing dedication and excellence in their respective sports disciplines."
      }
    ],
    news_file: [
      {
        nama_file: "olympic-preparation.jpg"
      }
    ]
  },
  {
    id: 6,
    createdAt: "2024-08-01T08:30:00Z",
    readTime: "5 min read",
    news_category: {
      name: "Culture"
    },
    news_content: [
      {
        judul: "Traditional Arts Festival Celebrates Cultural Heritage",
        deskripsi: "An international festival showcasing traditional arts and crafts brings together artists from diverse cultures, promoting cultural exchange and heritage preservation."
      }
    ],
    news_file: [
      {
        nama_file: "arts-festival.jpg"
      }
    ]
  }
];

const NewsnBlog = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      // Uncomment baris di bawah untuk menggunakan API asli
      // const response = await apiClient.get("/news");
      // setNewsData(response.data.data);
      
      // Simulasi loading delay untuk dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsData(dummyNewsData);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback ke dummy data jika API gagal
      setNewsData(dummyNewsData);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening modal with article
  const handleReadMore = (article) => {
    // Update URL with ID
    const url = new URL(window.location);
    url.searchParams.set("id", article.id);
    window.history.pushState({}, "", url);

    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  // Handle closing modal and clean URL
  const handleCloseModal = () => {
    const url = new URL(window.location);
    url.searchParams.delete("id");
    window.history.replaceState({}, "", url);

    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // On initial load, check if `id` is in the URL and open the corresponding modal
  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("id");

    if (idFromUrl && newsData.length > 0) {
      const article = newsData.find(
        (item) => String(item.id) === String(idFromUrl)
      );
      if (article) {
        setSelectedArticle(article);
        setIsModalOpen(true);
      }
    }
  }, [newsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="py-16">
        <div className="max-w-7xl mx-auto p-4 border border-gray-200 rounded-xl">
          <div className="mb-9 border-b border-gray-200">
            <h2 className="playfair mb-4 text-[#071C4D] text-[35px] font-bold text-center">
              News and Blog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.map((article) => (
              <div
                key={article.id}
                className="flex flex-col md:flex-row rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
              >
                <div className="w-full h-48 md:w-60 md:h-full flex-shrink-0 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={
                      article?.news_file[0]?.nama_file
                        ? `${apiClient.defaults.baseURL}/public/news/${article.news_file[0].nama_file}`
                        : "/public/images/error/No_Image_Available.jpg"
                    }
                    alt={article.news_content[0].judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between min-h-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#0092B8] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.news_category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[#071C4D] font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#0092B8] transition-colors duration-300">
                      {article.news_content[0].judul}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.news_content[0].deskripsi}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleReadMore(article)}
                      className="bg-[#0092B8] hover:bg-[#007F9F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-500">
                      {article.readTime}
                    </span>
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