import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";
import Navbar from "../../../HomePage/Navbar/Navbar";
import Footer from "../../../HomePage/Footer";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fetch blog detail berdasarkan slug
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/blog?slug=${slug}`);
        const { data } = response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          setPost(data[0]); // Ambil blog pertama yang cocok dengan slug
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("❌ Failed to fetch blog detail:", error);
        toast.error("Failed to load blog. Please try again later.");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  // Fetch popular posts
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await apiClient.get("/blog", {
          params: { take: 5, page: 1 },
        });
        const { data } = response.data;
        setPopularPosts(data || []);
      } catch (error) {
        console.error("❌ Failed to fetch popular posts:", error);
        toast.error("Failed to load popular posts.");
        setPopularPosts([]);
      }
    };

    fetchPopularPosts();
  }, []);

  // Efek mouse untuk hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroSection.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  if (loading) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <div className="not-found">
          <h2>404 - Blog Not Found</h2>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Proses URL gambar untuk thumbnail
  const imageUrl = post.blog_file?.[0]?.url
    ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${post.blog_file[0].url.replace(/\\/g, "/").replace(/^uploads\//, "")}`
    : "/public/images/error/No_Image_Available.jpg";

  return (
    <div className="blog-detail-page">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div
        className="hero-section"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%)`,
        }}
      >
        {/* Animated Decorative Elements */}
        <div className="hero-decorations">
          <div className="floating-element diamond diamond-1"></div>
          <div className="floating-element diamond diamond-2"></div>
          <div className="floating-element diamond diamond-3"></div>
          <div className="floating-element triangle triangle-1"></div>
          <div className="floating-element triangle triangle-2"></div>
          <div className="floating-element triangle triangle-3"></div>
          <div className="floating-element hexagon hexagon-1"></div>
          <div className="floating-element hexagon hexagon-2"></div>
          <div className="floating-line line-1"></div>
          <div className="floating-line line-2"></div>
          <div className="floating-line line-3"></div>
          <div className="dots-pattern dots-1"></div>
          <div className="dots-pattern dots-2"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">{post.blog_content[0]?.judul || "Untitled"}</h1>
          <div className="breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            <span className="separator">/</span>
            <span onClick={() => navigate("/blog")}>Blog</span>
            <span className="separator">/</span>
            <span>{post.blog_content[0]?.judul || "Untitled"}</span>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="blog-container">
        <div className="blog-left">
          <img
            src={imageUrl}
            alt={post.blog_content[0]?.judul || "Blog Image"}
            className="blog-thumbnail"
          />
          <div className="blog-meta">
            <span>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("id-ID")
                : "Unknown Date"} · {post.blog_category?.name || "Uncategorized"}
            </span>
          </div>
          <div
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: post.blog_content[0]?.deskripsi || "" }}
          />
          {post.lokasi?.nama && (
            <div className="blog-location">
              <span>{post.lokasi.nama}</span>
            </div>
          )}
        </div>

        <aside className="blog-right">
          <div className="latest-posts">
            <h3>Popular Posts</h3>
            <ul>
              {popularPosts.length > 0 ? (
                popularPosts.map((item) => (
                  <li key={item.id}>
                    <a href={`/blog/${item.slug}`}>
                      {item.blog_content[0]?.judul || "Untitled"}
                    </a>
                  </li>
                ))
              ) : (
                <li>No popular posts available</li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;