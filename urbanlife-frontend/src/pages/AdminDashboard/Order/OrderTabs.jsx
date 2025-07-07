const OrdersTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Orders", "Open Orders", "Cancelled Order"];
  

  return (
    <div className="mt-3 space-x-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-sm font-medium relative group ${
            activeTab === tab ? "text-cyan-600" : "text-gray-900"
          }`}
        >
          {tab}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-cyan-600 transition-all duration-200 ${
              activeTab === tab ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </button>
      ))}
    </div>
  );
};

export default OrdersTabs;
