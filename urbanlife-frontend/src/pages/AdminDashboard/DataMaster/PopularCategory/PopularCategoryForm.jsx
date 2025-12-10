import { forwardRef, useState, useEffect, useImperativeHandle } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const PopularCategoryForm = forwardRef((props, ref) => {
  const [form, setForm] = useState({
    service_type: "",
    service_id: "",
    service_name: "",
  });
  const { disabledForm } = props
  const [serviceOptions, setServiceOptions] = useState([]);

  const options = [
    { value: 'travel_package', label: 'Day Tour' },
    { value: 'rent_car', label: 'Rent a car' },
    { value: 'accomodation', label: 'Accommodation' },
    { value: 'airport_shuttle', label: 'Airport Shuttle' },
    { value: 'port_shuttle', label: 'Port Shuttle' }
  ]

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "service_type" && value) {
      try {
        let endpoint = ""

        switch (value) {
          case "travel_package":
            endpoint = "/travel-package";
            break;
          case "rent_car":
            endpoint = "/kendaraan";
            break;
          case "accomodation":
            endpoint = "/akomodasi";
            break;
          case "airport_shuttle":
            endpoint = `/airport-shuttle`;
            break;
          case "port_shuttle":
            endpoint = `/port-shuttle`;
            break;
          default:
            endpoint = "";
        }

        if (endpoint) {
          const response = await apiClient.get(endpoint)

          if (response.data && Array.isArray(response.data.data)) {
            const filteredData = response.data.data.filter(item => item.is_popular === false);
            setServiceOptions(filteredData);
          } else {
            setServiceOptions([]);
          }
        } else {
          setServiceOptions([])
        }
      } catch (error) {
        console.error("Error fetching service_id options:", error);
        setServiceOptions([]);
      }
    } else if (name === "service_id" && value) {
      const selectedService = serviceOptions.find(service => service.id == value);

      if (selectedService) {
        setForm((prevForm) => ({
          ...prevForm,
          service_name: selectedService.nama,
        }));
      }
    }
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => form,
  }));

  useEffect(() => {
    if (!form.service_type) {
      setServiceOptions([]);
    }
  }, [form.service_type]);

  return (
    <div className="grid grid-cols-1 gap-6">
      {disabledForm ? (
        <p className="text-sm text-red-500 mt-2">
          Maximum of 6 popular items reached. Please remove one before adding another.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
            >
              <option value="">Select</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <select
              name="service_id"
              value={form.service_id}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
              disabled={!serviceOptions.length}
            >
              <option value="">Select</option>
              {serviceOptions.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
});

export default PopularCategoryForm;
