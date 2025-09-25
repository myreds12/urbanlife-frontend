import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";
import { useTranslation } from "react-i18next";
import apiClient from "../../../../../AdminDashboard/Utils/ApiClient/apiClient";

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

//TODO: Untuk Saat ini masih Statis, Bisa diubah menjadi dinamis setelah golive
const TermsAndConditions = () => {
  const [terms, setTerms] = useState(null)
  const [loading, setLoading] = useState(true)
  const [t, i18n] = useTranslation()

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await apiClient.get("/termsandcondition");
        const data = res.data?.data?.[0];
      
        setTerms(data);
  
      } catch (err) {
        console.error("Failed to fetch terms and condition:", err);
        toast.error("Gagal memuat Terms And Condition");
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading ...</p>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          {i18n.language === "en" ? `Terms & Condition Not Found` : `Syarat & Ketentuan tidak ditemukan`}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-cyan-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-100 rounded-full text-cyan-700 text-sm font-medium mb-6 mt-10">
            <FileText className="w-4 h-4 mr-2" />
            Legal Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {i18n.language === "en" ? terms.title_en : terms.title_id }
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* <article className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 leading-relaxed text-gray-700 space-y-6">
          <p>
            Welcome to our website. If you continue to browse and use this
            website, you agree to comply with and are bound to the following
            terms and conditions of use, which together with our privacy policy
            govern urbanlife’s relationship with you in relation to the use of
            this website. If you disagree with any part of these terms and
            conditions, kindly not to use our website.
          </p>

          <p>
            urbanlife or urbanlife.id is owned and managed by PT. Urban Digital
            Media. The term “urbanlife“ or “urbanlife.id“ or “our“ or “us“ or
            “we“ refers to the owner of the website whose registered office is
            at Komplek Perkantoran Buncit Mas Blok C – 03A Lt. 1, Jl. Mampang
            Prapatan Raya No. 108, Kelurahan Duren Tiga, Kecamatan Pancoran,
            Jakarta Selatan 12760, Indonesia. Our branch office is located on
            Jl. Pura Demak, Gang Air Mancur V No. 3, Pemecutan Klod, Kecamatan
            Denpasar Barat, Kota Denpasar, Bali 80113, Indonesia. Our company
            registration number is 0606220058651 and registered in Jakarta,
            Indonesia. The term “you“ refers to the user or visitor of our
            website.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            The use of this website is subject to the following terms of use:
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </li>
            <li>
              This website uses cookies to monitor browsing preferences. If you
              do allow cookies to be used, the following personal information
              may be stored by us for use by a third party:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>
                  Referral type (direct method, a referring link, a website
                  search, or a campaign such as an ad or an email link)
                </li>
              </ul>
            </li>
            <li>
              Your use of this website and any dispute arising out of such use
              of the website is subject to the law of the Republic of Indonesia.
            </li>
            <li>
              Neither we nor any third party related to this website provides
              any warranty or guarantee to the accuracy, timeliness, performance,
              completeness or suitability of the information and materials found
              or offered on this website for any particular purpose. You
              acknowledge that such information and materials may contain
              inaccuracies or errors and we expressly exclude liability for any
              of such inaccuracies or errors.
            </li>
            <li>
              Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable. It
              shall be at your own responsibility to ensure that any product,
              service or information available through this website meets your
              specific requirements.
            </li>
            <li>
              This website contains materials which are owned by or licensed to
              us. These materials include, but are not limited to, the design,
              layout, look, appearance and graphics. Reproduction is prohibited
              other than in accordance with the copyright notice, which forms
              part of these terms and conditions.
            </li>
            <li>
              All trademarks reproduced on this website, which are not the
              property of, or licensed to the operator, are acknowledged on the
              website.
            </li>
            <li>
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense.
            </li>
            <li>
              Contents related to pornography, racism, discrimination (religion,
              ethnic or inter-group), coercion or violation are not tolerated
              and permitted by us. If found, the contents will be deleted
              without prior notice.
            </li>
            <li>
              From time to time, this website may also include links to other
              website(s) and/or social media. These links are provided to give
              you further information. They do not signify that we endorse the
              website(s) and/or social media. We have no responsibility for the
              content of the linked website(s) and/or social media.
            </li>
            <li>
              All the services provided on this website are bound to the
              specific procedures and policies of each of the services. Please
              refer to each of the services that you would like to use and read
              through the procedure and policy carefully before you use the
              service.
            </li>
          </ul>
        </article> */}
        <article className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 leading-relaxed text-gray-700 space-y-6">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderLexicalToHTML(i18n.language === "en" ? terms.content_en : terms.content_id),
            }}
          />
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
