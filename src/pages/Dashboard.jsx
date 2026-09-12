import { useEffect, useState } from "react";
import { useApiClient } from "../api/client";
import AddMonitorModal from "../components/AddMonitorModal";
import MonitorDetailModal from "../components/MonitorDetailModal";

const Dashboard = () => {
  const api = useApiClient();
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMonitorId, setSelectedMonitorId] = useState(null);
  const [error, setError] = useState("");

  const fetchMonitors = async () => {
    try {
      const res = await api.get("/api/monitors");
      setMonitors(res.data);
    } catch (err) {
      setError("Failed to load monitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
  }, []);

  const handleMonitorAdded = (newMonitor) => {
    setMonitors((prev) => [newMonitor, ...prev]);
  };

  const handleMonitorUpdated = (updated) => {
    setMonitors((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
  };

  const handleMonitorDeleted = (id) => {
    setMonitors((prev) => prev.filter((m) => m._id !== id));
  };

  if (loading) return <div className="p-4 sm:p-6 text-base">Loading...</div>;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-2xl font-bold">Your Monitors</h1>
          <p className="text-sm text-gray-500 mt-1">{monitors.length} / 5 used</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={monitors.length >= 5}
          className="bg-black text-white px-5 py-3.5 rounded-md text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto min-h-[48px]"
        >
          + Add Monitor
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

      {monitors.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-base px-4">
          No monitors yet. Tap "Add Monitor" to start tracking a website.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {monitors.map((m) => (
            <div
              key={m._id}
              onClick={() => setSelectedMonitorId(m._id)}
              className="border rounded-lg p-5 shadow-sm cursor-pointer hover:shadow-md transition active:scale-[0.98] min-h-[44px]"
            >
              <h2 className="font-semibold text-base">{m.name}</h2>
              <p className="text-sm text-gray-500 break-all mt-1">{m.url}</p>
              <span
                className={
                  "inline-block mt-3 px-3 py-1.5 text-sm rounded font-medium " +
                  (m.lastStatus === "up"
                    ? "bg-green-100 text-green-700"
                    : m.lastStatus === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600")
                }
              >
                {m.lastStatus}
              </span>
            </div>
          ))}
        </div>
      )}

      <AddMonitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMonitorAdded={handleMonitorAdded}
        currentCount={monitors.length}
      />

      <MonitorDetailModal
        monitorId={selectedMonitorId}
        isOpen={!!selectedMonitorId}
        onClose={() => setSelectedMonitorId(null)}
        onUpdated={handleMonitorUpdated}
        onDeleted={handleMonitorDeleted}
      />
    </div>
  );
};

export default Dashboard;
