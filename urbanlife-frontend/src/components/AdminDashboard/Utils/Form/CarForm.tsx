import { forwardRef, useImperativeHandle, useState } from "react";

export interface Car {
  id: string;
  brand: string;
  model: string;
  policeNumber: string;
  taxStatus: string;
  taxExpiry: string;
  status: string;
}

export interface CarFormHandle {
  getFormData: () => Omit<Car, "status"> | null;
  resetForm: () => void;
}

const CarForm = forwardRef<CarFormHandle>((_, ref) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [policeNumber, setPoliceNumber] = useState("");
  const [taxStatus, setTaxStatus] = useState("");
  const [taxExpiry, setTaxExpiry] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!brand || !model || !policeNumber || !taxStatus || !taxExpiry) return null;
      return {
        id: String(Date.now()).slice(-3),
        brand,
        model,
        policeNumber,
        taxStatus,
        taxExpiry,
      };
    },
    resetForm: () => {
      setBrand("");
      setModel("");
      setPoliceNumber("");
      setTaxStatus("");
      setTaxExpiry("");
    },
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Auto ID */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Unit ID</label>
        <input
          type="text"
          disabled
          value="Auto"
          className="input input-bordered w-full bg-gray-100 text-gray-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Enter model"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Police number</label>
        <input
          type="text"
          value={policeNumber}
          onChange={(e) => setPoliceNumber(e.target.value)}
          placeholder="Enter police number"
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Vehicle tax status</label>
        <select
          value={taxStatus}
          onChange={(e) => setTaxStatus(e.target.value)}
          className="input input-bordered w-full"
        >
          <option value="">Choose</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Tax expiry period</label>
        <input
          type="date"
          value={taxExpiry}
          onChange={(e) => setTaxExpiry(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
});

export default CarForm;
