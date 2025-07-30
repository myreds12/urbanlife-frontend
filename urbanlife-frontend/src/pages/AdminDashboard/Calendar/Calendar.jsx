import { useState, useEffect } from "react";
import Calendar from "../../../components/AdminDashboard/Calendar/Calendar";
import CurrentOrderList from "../../../components/AdminDashboard/Calendar/CurrentOrderList";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import dummyEvents from "../../../components/AdminDashboard/Calendar/dummyEvents";
import OrderItem from "../../../components/AdminDashboard/Calendar/OrderItem";

const normalizeType = (category) => {
  switch (category) {
    case "TRAVEL_PACKAGE":
      return "day tour";
    case "AKOMODASI":
      return "accommodation";
    case "VEHICLE":
    case "KENDARAAN":
      return "rent car";
    default:
      return "other";
  }
};

const CalendarPage = () => {
  const [events, setEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  console.log(selectedOrders, "selectedOrders");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const viewStart = new Date(currentDate);
        const viewEnd = new Date(currentDate);

        if (currentView === "month") {
          viewStart.setDate(1);
          viewEnd.setMonth(viewEnd.getMonth() + 1);
          viewEnd.setDate(0);
        } else if (currentView === "week") {
          const day = viewStart.getDay();
          viewStart.setDate(viewStart.getDate() - day);
          viewEnd.setDate(viewEnd.getDate() + (6 - day));
        }

        const formatDate = (d) => d.toISOString().split("T")[0];

        const response = await apiClient.get("/pemesanan/calender", {
          params: {
            date_from: formatDate(viewStart),
            date_to: formatDate(viewEnd),
          },
        });

        const rawData = response.data.data || [];

        const mapped = rawData.reduce((acc, item) => {
          const dateKey = item.date;
          const types = item.categories || [];

          acc[dateKey] = types.map((type) => ({
            id: `${dateKey}-${type}`,
            type: normalizeType(type),
            customer: null,
            title: null,
            location: null,
            date: dateKey,
            dateDisplay: new Date(dateKey).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          }));

          return acc;
        }, {});

        setEvents(mapped);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchEvents();
  }, [currentDate, currentView]);

  const handleDateClick = async (dateString) => {
    try {
      setSelectedDate(dateString);
      const response = await apiClient.get(`/pemesanan/get-by-date/${dateString}`);
      const data = response.data.data || [];

      console.log(data, "Pemesnana berdasarkan tanggal");
      setSelectedOrders(data);
    } catch (err) {
      console.error("Gagal fetch data tanggal:", err);
    }
  };

  const getAllOrders = () => {
    const allOrders = [];
    Object.values(events).forEach((dayEvents) => {
      dayEvents.forEach((event) => {
        allOrders.push({
          id: event.id,
          customerName: event.customer,
          orderType: event.type,
          location: event.location,
          date: event.dateDisplay,
          status: event.type,
        });
      });
    });
    return allOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Calendar
              initialEvents={events}
              onDateClick={handleDateClick}
              onAddEvent={() => alert("Tambah event dinonaktifkan.")}
              onDeleteEvent={() => alert("Hapus event dinonaktifkan.")}
              onNavigate={(date) => setCurrentDate(date)}
              onViewChange={(view) => setCurrentView(view)}
            />
          </div>
          <div className="lg:col-span-1">
            <CurrentOrderList orders={getAllOrders()} />
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Detail Orders on {selectedDate}
            </h3>
            <div className="space-y-3">
              {selectedOrders.length > 0 ? (
                selectedOrders.map((order, index) => (
                  <OrderItem
                    key={index}
                    customerName={order.customer || "Unknown"}
                    location={order.lokasi || "-"}
                    date={selectedDate}
                    status={normalizeType(order.type)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">Tidak ada order pada tanggal ini.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
