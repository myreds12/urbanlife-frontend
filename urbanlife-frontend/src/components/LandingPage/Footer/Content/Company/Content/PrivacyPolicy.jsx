import React, { useEffect, useState } from "react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";
import toast from "react-hot-toast";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";
import { useTranslation } from "react-i18next";

const renderLexicalToHTML = (jsonString) => {
  if (!jsonString) return "";
  try {
    const parsed = JSON.parse(jsonString);
    const children = parsed.root?.children || [];

    const renderTextChildren = (children) => {
      return children.map((c) => c.text).join("");
    };

    return children
      .map((node) => {
        // Heading
        if (node.type === "heading") {
          // Map tag ke class font size
          const headingClassMap = {
            h1: "text-4xl font-bold mb-6",
            h2: "text-3xl font-semibold mb-5",
            h3: "text-2xl font-semibold mb-4",
            h4: "text-xl font-semibold mb-3",
            h5: "text-lg font-semibold mb-2",
            h6: "text-base font-semibold mb-2",
          };
          const alignStyle =
            node.format === "center"
              ? "text-align:center;"
              : node.format === "right"
                ? "text-align:right;"
                : node.format === "left"
                  ? "text-align:left;"
                  : "";

          return `<${node.tag} class="${headingClassMap[node.tag] || "text-lg font-semibold mb-4"}" style="${alignStyle}">
            ${renderTextChildren(node.children)}
          </${node.tag}>`;
        }

        // List
        if (node.type === "list") {
          // Render tiap list item
          const items = node.children
            .map((li) => {
              const liAlignStyle =
                li.format === "center"
                  ? "text-align:center;"
                  : li.format === "right"
                    ? "text-align:right;"
                    : li.format === "left"
                      ? "text-align:left;"
                      : "";

              let liContent = li.children
                .map((child) => {
                  if (child.type === "text") {
                    return child.text;
                  } else if (child.type === "paragraph") {
                    return `<p>${renderTextChildren(child.children)}</p>`;
                  }
                  return "";
                })
                .join("");

              return `<li class="mb-2" style="${liAlignStyle}">${liContent}</li>`;
            })
            .join("");

          const listTag = node.listType === "number" ? "ol" : "ul";
          // Use Tailwind list style
          const listClass =
            listTag === "ol"
              ? "list-decimal pl-6 space-y-1 mb-6"
              : "list-disc pl-6 space-y-1 mb-6";

          return `<${listTag} class="${listClass}">
            ${items}
          </${listTag}>`;
        }

        // Paragraph
        if (node.type === "paragraph") {
          const alignStyle =
            node.format === "center"
              ? "text-align:center;"
              : node.format === "right"
                ? "text-align:right;"
                : node.format === "left"
                  ? "text-align:left;"
                  : "";

          return `<p class="mb-4 leading-relaxed text-slate-700" style="${alignStyle}">
            ${renderTextChildren(node.children)}
          </p>`;
        }

        return "";
      })
      .join("");
  } catch (err) {
    console.error("Failed to parse Lexical JSON:", err);
    return "";
  }
};

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await apiClient.get("/privacyandpolicy");
        const data = res.data?.data?.[0]; // ambil index pertama
        setPolicy(data);
      } catch (err) {
        console.error("Failed to fetch privacy policy:", err);
        toast.error(t("privacypolicy.error"));
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">{t("privacypolicy.loading")}</p>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{t("privacypolicy.not_found")}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-b from-cyan-50 to-slate-50 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mt-15">
          {i18n.language === "id" ? (policy.title_id || "Kebijakan Privasi") : (policy.title_en || "Privacy Policy")}
        </h1>
        <p className="text-slate-600">
          {t("privacypolicy.last_updated")}{" "}
          {new Date(policy.createdAt).toLocaleDateString(
            i18n.language === "id" ? "id-ID" : "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {(i18n.language === "id" ? policy.content_id : policy.content_en) && (
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderLexicalToHTML(i18n.language === "id" ? policy.content_id : policy.content_en),
            }}
          />
        )}

        {/* Contact Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            {i18n.language === "id" ? (policy.contact_title_id || "Hubungi Kami") : (policy.contact_title_en || "Contact Us")}
          </h2>
          <div className="rounded-xl border bg-white shadow-sm p-6">
            <p className="text-slate-700 mb-2">
              {t("privacypolicy.contact_description")}
            </p>
            <p className="text-cyan-600 font-medium">{policy.contact_email}</p>
            <p className="text-slate-600">{policy.contact_phone}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;