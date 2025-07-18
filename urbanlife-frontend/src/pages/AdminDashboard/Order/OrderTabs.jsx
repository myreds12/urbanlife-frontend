const OrdersTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Orders", "Paid Orders", "Unpaid Orders", "Cancelled Order"];
  
  return (
    <div className="mt-3 space-x-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`cursor-pointer px-1 font-medium underline-item relative ${
            activeTab === tab ? "text-cyan-600 active" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default OrdersTabs;