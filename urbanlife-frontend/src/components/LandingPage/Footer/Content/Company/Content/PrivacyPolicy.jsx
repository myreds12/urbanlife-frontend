import React, { useEffect, useState } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";
import toast from "react-hot-toast";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";

// ✅ Convert Lexical JSON ke HTML string
const renderLexicalToHTML = (jsonString) => {
  if (!jsonString) return "";
  try {
    const parsed = JSON.parse(jsonString);
    const children = parsed.root?.children || [];

    const renderNode = (node) => {
      if (!node) return "";

      switch (node.type) {
        case "heading": {
          const Tag = node.tag || "h2";
          const text = node.children?.map(renderNode).join("") || "";
          return `<${Tag} class="my-3 font-semibold">${text}</${Tag}>`;
        }

        case "paragraph": {
          const text = node.children?.map(renderNode).join("") || "";
          return `<p class="my-2 leading-relaxed">${text}</p>`;
        }

        case "list": {
          const Tag = node.listType === "number" ? "ol" : "ul";
          const items = node.children?.map(renderNode).join("") || "";
          return `<${Tag} class="list-inside ml-6 my-2 space-y-1">${items}</${Tag}>`;
        }

        case "listitem": {
          const text = node.children?.map(renderNode).join("") || "";
          return `<li>${text}</li>`;
        }

        case "text": {
          let text = node.text || "";
          if (node.format & 1) text = `<b>${text}</b>`; // bold
          if (node.format & 2) text = `<i>${text}</i>`; // italic
          if (node.format & 4) text = `<u>${text}</u>`; // underline
          return text;
        }

        default:
          return "";
      }
    };

    return children.map(renderNode).join("");
  } catch (err) {
    console.error("❌ Failed to parse Lexical JSON:", err);
    return "";
  }
};

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await apiClient.get("/privacyandpolicy");
        const data = res.data?.data?.[0]; // ambil index pertama
        setPolicy(data);
      } catch (err) {
        console.error("Failed to fetch privacy policy:", err);
        toast.error("Gagal memuat Privacy Policy");
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading Privacy Policy...</p>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Privacy Policy tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-100">
        <Navbar />
        <div className="relative z-10 container mx-auto px-6 py-20 text-center mt-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
              {policy.title_en || "Privacy Policy"}
            </h1>
            <p className="text-slate-600">
              Last updated:{" "}
              {new Date(policy.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-10">
        {/* Content EN */}
        {policy.content_en && (
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderLexicalToHTML(policy.content_en),
            }}
          />
        )}

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            {policy.contact_title_en || "Contact Us"}
          </h2>
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-medium mb-2">
                {policy.contact_title_en}
              </h3>
              <p className="text-cyan-100 mb-4 text-sm">
                If you have questions about this Privacy Policy, contact us:
              </p>
              <p className="text-white font-medium">{policy.contact_email}</p>
              <p className="text-white mt-2">{policy.contact_phone}</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
