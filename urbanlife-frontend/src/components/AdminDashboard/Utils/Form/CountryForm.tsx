import { useState } from "react";

interface Props {
  onSubmit: (country: { id: string; name: string }) => void;
}

const CountryForm = ({ onSubmit }: Props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id, name });
    setId("");
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-0">
      <label className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          placeholder="Enter country name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
        <input
          type="text"
          placeholder="Enter country ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
        />
        
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            setId("");
            setName("");
          }}
          className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CountryForm;
