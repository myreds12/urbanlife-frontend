import { useRef, useState } from "react";
import GuideForm, {
  type Guide,
  type GuideFormHandle,
} from "../../../components/AdminDashboard/Utils/Form/GuideForm";
import GuideTable from "../../../components/AdminDashboard/Utils/Table/GuideTable";

const Guide = () => {
  const [guides, setGuides] = useState<Guide[]>([
    {
      id: "001",
      name: "David omstein",
      identity: "12345678",
      phone: "081111111",
      gender: "Male",
      english: "yes",
      status: "Active",
    },
    {
      id: "002",
      name: "David raya",
      identity: "12345678",
      phone: "081111111",
      gender: "Male",
      english: "yes",
      status: "Active",
    },
  ]);

  const formRef = useRef<GuideFormHandle>(null);

  const handleSave = () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;

    setGuides((prev) => [...prev, { ...newData, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Guide</h3>

          <GuideForm ref={formRef} />

          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              Save Changes
            </button>
          </div>
        </div>

        <GuideTable guides={guides} />
      </div>
    </div>
  );
};

export default Guide;
