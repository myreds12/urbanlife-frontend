import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm from "../../../components/AdminDashboard/Utils/Form/CountryForm";
import CountryTable from "../../../components/AdminDashboard/Utils/Table/CountryTable";

const CountryPage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE: FORM + DROPZONE */}
        <div className="space-y-6">
          <CountryForm />
          <Dropzone />
        </div>

        {/* RIGHT SIDE: TABLE */}
        <CountryTable />
      </div>
    </div>
  );
};

export default CountryPage;
