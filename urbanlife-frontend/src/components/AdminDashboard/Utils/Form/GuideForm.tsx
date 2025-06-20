import { forwardRef, useImperativeHandle, useState } from "react";

export interface Guide {
  id: string;
  name: string;
  identity: string;
  phone: string;
  gender: string;
  english: string;
  status: string;
}

export interface GuideFormHandle {
  getFormData: () => Omit<Guide, "status"> | null;
  resetForm: () => void;
}

const GuideForm = forwardRef<GuideFormHandle>((_, ref) => {
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [english, setEnglish] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!name || !identity || !phone || !gender || !english) return null;
      return {
        id: String(Date.now()).slice(-3),
        name,
        identity,
        phone,
        gender,
        english,
      };
    },
    resetForm: () => {
      setName("");
      setIdentity("");
      setPhone("");
      setGender("");
      setEnglish("");
    },
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Guide ID</label>
        <input
          type="text"
          disabled
          value="Auto"
          className="input input-bordered w-full bg-gray-100 text-gray-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Guide name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">ID</label>
        <input
          type="text"
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          placeholder="Enter ID"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
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
        <label className="block text-sm text-gray-600 mb-1">Fluent english</label>
        <select
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          className="input input-bordered w-full"
        >
          <option value="">Choose</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
});

export default GuideForm;
