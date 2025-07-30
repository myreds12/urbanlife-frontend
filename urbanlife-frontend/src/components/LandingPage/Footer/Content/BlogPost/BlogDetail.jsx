import React from "react";
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

      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-title">{post.title}</h1>
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
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
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
