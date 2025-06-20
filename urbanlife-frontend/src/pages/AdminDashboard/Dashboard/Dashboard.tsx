import "../../../styles/AdminDashboard/Dashboard/Dashboard.css";
import "../../../styles/AdminDashboard/Dashboard/CalendarCustom.css";
import ChartBar from "../../../components/AdminDashboard/Dashboard/charts/bar/ChartBar";
import CardWidget from "../../../components/AdminDashboard/Dashboard/card/CardWidget";
import RecentOrders from "../../../components/AdminDashboard/Dashboard/orders/RecentOrders";
import CardWelcome from "../../../components/AdminDashboard/Dashboard/card/CardWelcome";

function Dashboard() {
  return (
    <div className="p-2">
      {/* Baris 1: Welcome Card - Full Width */}
      <div className="grid grid-cols-1 gap-5 mb-5">
        <CardWelcome />
      </div>

      {/* Baris 2 & 3: Left side (Cards + Chart) + Right side (Custom Demographic) */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Left Side - 8 columns */}
        <div className="col-span-8">
          {/* Baris 2: Customer & Orders Cards */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            <CardWidget />
          </div>
          
          {/* Baris 3: Chart Bar */}
          <div>
            <ChartBar />
          </div>
        </div>

        {/* Right Side - 4 columns (spans 2 rows) */}
        <div className="col-span-4">
          {/* Custom Demographic Placeholder */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full min-h-[600px] flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Demographic</h3>
              <p className="text-sm text-gray-500 mb-4">Number of customer based on country</p>
              <div className="space-y-2">
                <div className="w-full bg-gray-100 h-2 rounded"></div>
                <div className="w-3/4 bg-gray-100 h-2 rounded"></div>
                <div className="w-1/2 bg-gray-100 h-2 rounded"></div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Component will be added later</p>
            </div>
          </div>
        </div>
      </div>

      {/* Baris 4: Recent Orders - Full Width */}
      <div className="grid grid-cols-1 gap-5">
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;