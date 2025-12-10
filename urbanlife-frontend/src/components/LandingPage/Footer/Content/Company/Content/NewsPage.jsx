import React, { useState, useEffect } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";
import "./RentalCar/CarRental.css";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from 'react-i18next';
import ArticleModal from "../../../../HomePage/NewsnBlog/ArticleModal";
import { normalizeLanguageField } from "../../../../../AdminDashboard/Utils/Language/languageUtils";

const NewsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t, i18n } = useTranslation();
  console.log("Current language:", i18n.language); // Debug bahasa saat ini

  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHomeClick = () => {
    window.location.reload("/")
  }

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const getData = async (endpoint) => {
        const response = await apiClient.get(endpoint);
        return response.data.data
      };

      const [news, blogs] = await Promise.all([
        getData("/news"),
        getData("/blog"),
      ]);

      const normalizedNews = news.map((article) => ({
        ...article,
        judul: normalizeLanguageField(article, "news_content", true),
        deskripsi: normalizeLanguageField(article, "news_content", true, "deskripsi"),
        tipe: 'news',
        file: article?.news_file[0]?.nama_file
          ? `${apiClient.defaults.baseURL}/public/news/${article.news_file[0].nama_file}`
          : "/public/images/error/No_Image_Available.jpg",
        name: article.news_category.name,
      }));

      const normalizedBlogs = blogs.map((blog) => ({
        ...blog,
        judul: normalizeLanguageField(blog, "blog_content", true),
        deskripsi: normalizeLanguageField(blog, "blog_content", true, "deskripsi"),
        tipe: 'blog',
        readTime: '-',
        file: blog?.blog_file[0]?.nama_file
          ? `${apiClient.defaults.baseURL}/public/blogs/${blog.blog_file[0].nama_file}`
          : "/public/images/error/No_Image_Available.jpg",
        name: blog.blog_category.name,
      }));

      const normalizedData = [...normalizedNews, ...normalizedBlogs];

      setNewsData(normalizedData);
    } catch (error) {
      console.error(t("newsnblog.error_fetch_news"), error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening modal with article
  const handleReadMore = (article) => {
    // Update URL with ID
    const url = new URL(window.location);
    const data = article.tipe === 'blog' 
    ? `/blog/${article.slug}`
    : `/${article.id}`;

    url.pathname = data;
    window.history.pushState({}, "", url);

    setSelectedArticle({
      ...article,
      judul: article.judul[i18n.language],
      deskripsi: article.deskripsi[i18n.language],
    });
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

  // Fetch data on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Handle URL params for modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("id");

    if (idFromUrl && newsData.length > 0) {
      const article = newsData.find(
        (item) => String(item.id) === String(idFromUrl)
      );
      if (article) {
        setSelectedArticle({
          ...article,
          judul: article.judul[i18n.language],
          deskripsi: article.deskripsi[i18n.language],
        });
        setIsModalOpen(true);
      }
    }
  }, [newsData, i18n.language]); // tambah i18n.language biar update pas ganti bahasa

  if (isLoading) {
    return <div>{t("newsnblog.loading")}</div>;
  }

  return (
    <div className="categories-page">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
        }}
      >
        <div className="hero-decorations">
          {/* Dekorasi jika ada */}
        </div>
        <div className="hero-content">
          <h1 className="hero-title playfair">{t("newsnblog.title")}</h1>
          <div className="breadcrumb">
            <button
              className="breadcrumb-link cursor-pointer"
              onClick={handleHomeClick}
            >
              {t("services.home")}
            </button>
            <span className="separator">/</span>
            <span>{t("newsnblog.title")}</span>
          </div>
        </div>
      </div>

      <div className="content-area">
        {!newsData || newsData.length === 0 ? (
          <div className="no-cards text-center py-10 text-gray-500">
            <h3 className="text-lg font-semibold">{t("services.nocontent")}</h3>
            <p>{t("unitcar.norentcar")}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-8">
            {newsData.map((article) => (
              <div
                key={article.id}
                className="flex flex-col md:flex-row rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
              >
                <div className="w-full h-48 md:w-60 md:h-full flex-shrink-0 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={article.file}
                    alt={article.judul[i18n.language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 p-5 flex flex-col justify-between min-h-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#0092B8] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {article.name}
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
                      {article.judul[i18n.language]}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.deskripsi[i18n.language]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleReadMore(article)}
                      className="bg-[#0092B8] hover:bg-[#007F9F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                    >
                      {t("newsnblog.readmore")}
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
        )}
      </div>

      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsPage;
