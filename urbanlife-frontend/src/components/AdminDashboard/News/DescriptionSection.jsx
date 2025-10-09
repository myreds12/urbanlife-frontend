import React, { useEffect, useState } from "react";
import Creatable, { useCreatable } from 'react-select/creatable';
import apiClient from "../Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const DescriptionSection = ({
  id,
  isActive,
  formData,
  content,
  onChangeContent,
  handleChange,
  categories,
}) => {
  const [options, setOptions] = useState(
    categories.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  );

  useEffect(() => {
    setOptions(
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    );
  }, [categories]);

  const handleCreate = async (inputValue) => {
    try {
      const payload = { name: inputValue };
      const { data: { data: { id, name } } } = await apiClient.post("/news-category", payload);

      toast.success("Category news created successfully!");

      const newCategory = {
        label: name,
        value: id
      };

      setOptions((prevOptions) => [...prevOptions, newCategory]);

      handleChange({
        target: { name: 'category_id', value: id }
      });
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
      console.error("Error creating category:", error);
    }
  };

  const selectedOption = options.find((option) => option.value === formData.category_id);

  return (
  <div id={id} className={isActive ? "block" : "hidden"}>
    <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
      {/* Category Field - only one */}
      <div className="flex items-center gap-5 mb-6">
        <label
          className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md"
          style={{ minWidth: '90px' }}
        >
          Category
        </label>
        <Creatable
          name="category_id"
          className="input w-full py-1 rounded-lg"
          value={selectedOption}
          onChange={(selectedOption) => {
            handleChange({
              target: {
                name: 'category_id',
                value: selectedOption ? selectedOption.value : '',
              },
            });
          }}
          onCreateOption={handleCreate}
          options={options}
          placeholder="Choose or Create..."
        />
      </div>

      {/* Content per language */}
      <div className="grid grid-cols-2 gap-6">
        {content.map((item, index) => (
          <div key={item.id || `${item.bahasa}-${index}`}  className="space-y-4">
            {/* Subject Field */}
            <div className="flex items-center gap-5">
              <label
                className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md"
                style={{ minWidth: "90px" }}
              >
                {item.bahasa === "ENGLISH" ? "Subject" : "Subjek"}
              </label>
              <input
                type="text"
                value={
                  item.judul
                }
                onChange={(e) =>
                  onChangeContent(index, "judul", e.target.value)
                }
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder={
                  item.bahasa === "ENGLISH"
                    ? "Enter subject"
                    : "Masukkan subjek"
                }
              />
            </div>

            {/* Language Label */}
            <div>
              <label className="block text-md font-medium mb-1">
                {item.bahasa === "ENGLISH" ? "English" : "Indonesia"}
              </label>

              <div className="mb-1">
                <span className="text-red-500">*</span>
                <span className="text-sm text-gray-600 ml-1">
                  {item.bahasa === "ENGLISH"
                    ? "Description"
                    : "Deskripsi"}
                </span>
              </div>

              <textarea
                value={item.deskripsi || ""}
                name="deskripsi"
                onChange={(e) =>
                  onChangeContent(index, "deskripsi", e.target.value)
                }
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                placeholder={
                  item.bahasa === "ENGLISH"
                    ? "Enter description in English..."
                    : "Masukkan deskripsi dalam bahasa Indonesia..."
                }
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
