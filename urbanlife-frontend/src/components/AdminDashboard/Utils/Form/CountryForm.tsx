import ComponentCard from "../../common/ComponentCard";

const CountryForm = () => {
  return (
    <ComponentCard title="Countries">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter country ID"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Enter country name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
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
    </ComponentCard>
  );
};

export default CountryForm;
