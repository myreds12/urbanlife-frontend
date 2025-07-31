import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "./posts/allPosts";
import Navbar from "../../../HomePage/Navbar/Navbar";
import Footer from "../../../HomePage/Footer";
import "./BlogDetail.css";
import { popularPosts } from "./posts/popularPosts";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((item) => item.slug === slug);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
          <h1 className="hero-title">{post.title}</h1>
          <div className="breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            <span className="separator">/</span>
            <span onClick={() => navigate("/blog")}>Blog</span>
            <span className="separator">/</span>
            <span>{post.title}</span>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="blog-container">
        <div className="blog-left">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="blog-thumbnail"
          />
          <div className="blog-meta">
            <span>
              {post.date} · {post.category}
            </span>
          </div>
          <div
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.location && (
            <div className="blog-location">
              <span>{post.location}</span>
            </div>
          )}
        </div>

        <aside className="blog-right">
          <div className="latest-posts">
            <h3>Popular Posts</h3>
            <ul>
              {popularPosts.map((item) => (
                <li key={item.id}>
                  <a href={`/blog/${item.slug}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
