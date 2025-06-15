import "../../../styles/AdminDashboard/Dashboard/Dashboard.css";
import "../../../styles/AdminDashboard/Dashboard/CalendarCustom.css";
import ChartBar from "../../../components/AdminDashboard/charts/bar/ChartBar";
import CardWidget from "../../../components/AdminDashboard/card/CardWidget";
import RecentOrders from "../../../components/AdminDashboard/orders/RecentOrders";
import CardWorld from "../../../components/AdminDashboard/map/CardWorld";

function Dashboard() {


  return (
    <div className="p-2">
      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-6 ">
          <ChartBar />
        </div>

        <div className="col-span-4">
          <CardWidget />
        </div>  
      </div>
      <div className="grid grid-cols-10 gap-5 mt-5">
        <div className="col-span-6 ">
          <RecentOrders />
        </div>

        <div className="col-span-4">
          <CardWorld />
        </div>  

      </div>
    </div> //div terluar
  );
}

export default Dashboard;