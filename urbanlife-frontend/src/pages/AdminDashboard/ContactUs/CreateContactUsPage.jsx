import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactHeader from "../../../components/AdminDashboard/ContactUs/ContactHeader";
import ContactInformation from "../../../components/AdminDashboard/ContactUs/ContactInformation";
import ContactServices from "../../../components/AdminDashboard/ContactUs/ContactServices";
import ContactForm from "../../../components/AdminDashboard/ContactUs/ContactForm";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

function CreateContactUsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [activeSection, setActiveSection] = useState("header");
  const [formData, setFormData] = useState({
    title: "",
    contact_info: "",
    services: {
      title: "",
      description: "",
      items: [],
    },
    form_config: {
      fields: [],
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchContactData = async () => {
        try {
          // TODO: Replace with actual API endpoint when available
          // const response = await apiClient.get(`/contact-us/${id}`);
          // setFormData(response.data);

          // Sample data for demonstration
          setFormData({
            title: "Customer Support",
            contact_info:
              "Email: support@company.com\nPhone: +1234567890\nAddress: 123 Main St, City, Country",
            services: {
              title: "Layanan Kami",
              description:
                "Kami menyediakan berbagai layanan berkualitas tinggi untuk memenuhi kebutuhan Anda",
              items: [
                {
                  icon: "https://example.com/icon1.png",
                  name: "Web Development",
                },
                {
                  icon: "https://example.com/icon2.png",
                  name: "Mobile App Development",
                },
              ],
            },
            form_config: {
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Full Name",
                  required: true,
                },
                {
                  name: "email",
                  type: "email",
                  label: "Email Address",
                  required: true,
                },
                {
                  name: "message",
                  type: "textarea",
                  label: "Message",
                  required: true,
                },
              ],
            },
          });
        } catch (error) {
          toast.error("Failed to fetch contact data");
          console.error(error);
        }
      };

      fetchContactData();
    }
  }, [isEditMode, id]);

  // Handler untuk input biasa (title, contact_info)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler khusus untuk services
  const handleServicesChange = (servicesData) => {
    setFormData((prev) => ({
      ...prev,
      services: servicesData,
    }));
  };

  const handleFormConfigChange = (config) => {
    setFormData((prev) => ({
      ...prev,
      form_config: config,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO: Replace with actual API endpoint when available
      if (isEditMode) {
        // await apiClient.put(`/contact-us/${id}`, formData);
        toast.success("Contact information updated successfully");
      } else {
        // await apiClient.post("/contact-us", formData);
        toast.success("Contact information created successfully");
      }

      navigate("/admin/contact-us");
    } catch (error) {
      toast.error("Failed to save contact information");
      console.error(error);
    }
  };

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sections = ["header", "information", "services", "form"];

  const handleChangeContent = (index, field, value) => {
    console.log("handleChangeContent called:", index, field, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1 overflow-y-auto">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit" : "Create"} Contact Information
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${
                    activeSection === section
                      ? "text-cyan-600 active"
                      : "text-gray-500"
                  } hover:text-cyan-700 group`}
                  onClick={() => moveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              ))}
            </div>

            <ContactHeader
              id="header"
              isActive={activeSection === "header"}
              title={formData.title}
              onChange={handleChange}
              onChangeContent={handleChangeContent}
            />

            <ContactInformation
              id="information"
              isActive={activeSection === "information"}
              contactInfo={formData.contact_info}
              onChange={handleChange}
            />

            <ContactServices
              id="services"
              isActive={activeSection === "services"}
              services={formData.services}
              onChange={handleServicesChange}
            />

            <ContactForm
              id="form"
              isActive={activeSection === "form"}
              formConfig={formData.form_config}
              onChange={handleFormConfigChange}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/contact-us">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            >
              {isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </main>
      </div>
    </form>
  );
}

export default CreateContactUsPage;
