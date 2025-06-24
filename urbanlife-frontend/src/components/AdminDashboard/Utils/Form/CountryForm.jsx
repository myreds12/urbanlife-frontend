import { forwardRef, useImperativeHandle, useState } from "react";

const CountryForm = forwardRef((_, ref) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useImperativeHandle(ref, () => ({
    getFormData: () => {
      if (!id || !name) return null;
      return { id, name };
    },
    resetForm: () => {
      setId("");
      setName("");
    },
  }));

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
        <input
          type="text"
          placeholder="Enter country ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country name</label>
        <input
          type="text"
          placeholder="Enter country name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </div>
    </div>
  );
});

export default CountryForm;
