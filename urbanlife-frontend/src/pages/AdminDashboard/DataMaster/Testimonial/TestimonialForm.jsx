import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast"; // Added back for validation error

const TestimonialForm = forwardRef((_, ref) => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    occupation: "",
    description: "",
    order_id: "",
  });

  const fetchOrders = async () => {
    try {
      const res = await apiClient.get("/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      const { name, occupation, description, order_id } = form;
      if (!name || !occupation || !description || !order_id) {
        toast.error("Please complete all required fields.");
        return null;
      }
      return { ...form };
    },
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        name: data.name || "",
        occupation: data.occupation || "",
        description: data.description || "",
        order_id: data.order_id || "",
      });
    },
    resetForm: () => {
      setForm({
        id: "",
        name: "",
        occupation: "",
        description: "",
        order_id: "",
      });
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div>
        <label className="text-sm text-gray-600 mb-1 block">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs border-gray-200 rounded-lg shadow-sm"
          placeholder="Enter name"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 mb-1 block">Occupation</label>
        <input
          type="text"
          name="occupation"
          value={form.occupation}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs border-gray-200 rounded-lg shadow-sm"
          placeholder="Enter occupation"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600 mb-1 block">Order ID</label>
        <select
          name="order_id"
          value={form.order_id}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs border-gray-200 rounded-lg shadow-sm"
          placeholder="Select Order"
        >
          <option value="">Select Order</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:col-span-3">
        <label className="text-sm text-gray-600 mb-1 block">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="input input-bordered w-full border-gray-200 rounded-lg shadow-sm"
          placeholder="Enter testimonial description"
          rows="3"
        />
      </div>
    </div>
  );
});

export default TestimonialForm;