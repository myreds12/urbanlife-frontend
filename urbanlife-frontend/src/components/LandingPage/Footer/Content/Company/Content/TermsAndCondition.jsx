import React from "react";
import { FileText } from "lucide-react";
import Navbar from "../../../../HomePage/Navbar/Navbar";
import Footer from "../../../../HomePage/Footer";

//TODO: Untuk Saat ini masih Statis, Bisa diubah menjadi dinamis setelah golive
const TermsAndConditions = () => {
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
            Terms & Conditions
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 leading-relaxed text-gray-700 space-y-6">
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
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
