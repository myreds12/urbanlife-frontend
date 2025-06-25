import "../../../styles/AdminDashboard/Dashboard/Dashboard.css";
import "../../../styles/AdminDashboard/Dashboard/CalendarCustom.css";
import ChartBar from "../../../components/AdminDashboard/Dashboard/charts/bar/ChartBar";
import CardWidget from "../../../components/AdminDashboard/Dashboard/card/CardWidget";
import RecentOrders from "../../../components/AdminDashboard/Dashboard/orders/RecentOrders";
import CardWelcome from "../../../components/AdminDashboard/Dashboard/card/CardWelcome";
import CardMap from "../../../components/AdminDashboard/Dashboard/card/CardMap";

function Dashboard() {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 gap-5 mb-5">
        <CardWelcome />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5">
              <CardWidget />
            </div>

            <div className="grid grid-cols-1 gap-5">
              <ChartBar />
            </div>
        </div>

        <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1">
              <CardMap />
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;