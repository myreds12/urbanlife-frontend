import { forwardRef, useImperativeHandle, useState } from "react";

const DriverForm = forwardRef((_, ref) => {
  const [drivername, setDriverName] = useState("");
  const [driverid, setDriverID] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [expiry, setExpiry] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!drivername || !driverid || !phone || !gender || !expiry) return null;
      return {
        id: String(Date.now()).slice(-3),
        drivername,
        driverid,
        phone,
        gender,
        expiry,
      };
    },
    resetForm: () => {
      setDriverName("");
      setDriverID("");
      setPhone("");
      setGender("");
      setExpiry("");
    },
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver ID</label>
        <input
          type="text"
          disabled
          value="Auto"
          className="input input-bordered w-full bg-gray-100 text-gray-500 rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver Name</label>
        <input
          type="text"
          value={drivername}
          onChange={(e) => setDriverName(e.target.value)}
          placeholder="Enter Driver Name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver ID</label>
        <input
          type="text"
          value={driverid}
          onChange={(e) => setDriverID(e.target.value)}
          placeholder="Enter Driver ID"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        >
          <option value="">Choose</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driving expiry period</label>
        <input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
    </div>
  );
});

export default DriverForm;
