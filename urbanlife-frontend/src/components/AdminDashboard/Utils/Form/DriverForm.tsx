import { forwardRef, useImperativeHandle, useState } from "react";

export interface Driver {
  id: string;
  name: string;
  identityNumber: string;
  phone: string;
  gender: string;
  expiry: string;
  status: string;
}

export interface DriverFormHandle {
  getFormData: () => Omit<Driver, "status"> | null;
  resetForm: () => void;
}

const DriverForm = forwardRef<DriverFormHandle>((_, ref) => {
  const [name, setName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [expiry, setExpiry] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!name || !identityNumber || !phone || !gender || !expiry) return null;
      return {
        id: String(Date.now()).slice(-3),
        name,
        identityNumber,
        phone,
        gender,
        expiry,
      };
    },
    resetForm: () => {
      setName("");
      setIdentityNumber("");
      setPhone("");
      setGender("");
      setExpiry("");
    },
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver ID</label>
        <input
          type="text"
          disabled
          value="Auto"
          className="input input-bordered w-full bg-gray-100 text-gray-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Driver name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="David"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">ID</label>
        <input
          type="text"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          placeholder="12345678"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0811111111"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
});

export default DriverForm;
