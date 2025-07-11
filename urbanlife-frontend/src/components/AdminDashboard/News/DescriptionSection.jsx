import React from "react";

const DescriptionSection = ({
  id,
  isActive,
  formData,
  content,
  onChangeContent,
  handleChange,
  locations,
  type,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="grid grid-cols-2 gap-6 ">
          {content.map((item, index) => (
            <div key={item.bahasa} className="space-y-4">

              {/* Subject Field */}
              <div className="flex items-center gap-5">
                <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                  {item.bahasa === "ENGLISH" ? "Subject" : "Subjek"}
                </label>
                <input
                  type="text"
                  value={item.subject || (item.bahasa === "ENGLISH" ? "Barong Dance" : "Tari Barong")}
                  onChange={(e) =>
                    onChangeContent(index, "subject", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder={item.bahasa === "ENGLISH" ? "Enter subject" : "Masukkan subjek"}
                />
              </div>

              {/* Category Field */}
              <div className="flex items-center gap-5">
                <label className="block text-sm font-medium text-gray-600  bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                  {item.bahasa === "ENGLISH" ? "Category" : "Kategori"}
                </label>
                <input
                  type="text"
                  value={item.category || (item.bahasa === "ENGLISH" ? "Art" : "Kesenian")}
                  onChange={(e) =>
                    onChangeContent(index, "category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder={item.bahasa === "ENGLISH" ? "Enter category" : "Masukkan kategori"}
                />
              </div>

              {/* Language Label */}
              <div>
                <label className="block text-md font-medium mb-1">
                  {item.bahasa === "ENGLISH" ? "English" : "Indonesia"}
                </label>
                
                {/* Description Label with asterisk */}
                <div className="mb-1">
                  <span className="text-red-500">*</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {item.bahasa === "ENGLISH" ? "Description" : "Description"}
                  </span>
                </div>
                
                {/* Description Textarea */}
                <textarea
                  value={item.deskripsi || (item.bahasa === "ENGLISH" ? "Apart from its natural beauty, Bali is also famous for its arts and culture. One of them is a traditional dance called Barong Dance that tells a battle between Barong, a creature that looks like a lion with a red head, which represents good spirits and Rangda, the demon queen in Balinese mythology. This dance is usually performed in an open theater with live traditional musical instruments called 'gamelan' played by approximately 20-30 people. The dance is performed by several dancers, but the most important is that the two famous fire dance carvings that are sold along the roadside shops. The show can be watched from around 09:30 am – 10:30 am daily." : "")}
                  name="deskripsi"
                  onChange={(e) =>
                    onChangeContent(index, "deskripsi", e.target.value)
                  }
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder={item.bahasa === "ENGLISH" ? "Enter description in English..." : "Masukkan deskripsi dalam bahasa Indonesia..."}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;