import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("All");

  const { token } = useAuth();

  useEffect(() => {
    API.get("/api/trade/my-requests", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setRequests(res.data.myRecRequests);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load requests.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleStatus = (id, status) => {
    setUpdatingId(id);

    API.put(
      `/api/trade/request-status/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then(() => {
        setRequests((curr) =>
          curr.map((req) => (req._id === id ? { ...req, status } : req)),
        );

        setError("");

        setSuccessMsg(`Request ${status.toLowerCase()} successfully!`);

        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to update request.");
      })
      .finally(() => {
        setUpdatingId(null);
      });
  };

  const statusColor = (status) => {
    if (status === "Accepted") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((req) => req.status === filter);

  const typeColor = (type) => {
    if (type === "Learn") return "bg-purple-100 text-purple-700";
    if (type === "Teach") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Incoming Requests
        </h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "Pending", "Accepted", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? "bg-purple-700 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {successMsg && (
          <p className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {successMsg}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </p>
        )}

        {filteredRequests.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No requests found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    From: {req.sender?.username || "Deleted User"}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      req.status,
                    )}`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{req.message}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${typeColor(
                      req.requestType,
                    )}`}
                  >
                    {req.requestType}
                  </span>
                </div>

                <div className="border-t pt-4 text-sm text-gray-500 mb-4">
                  <p className="mb-2">📩 Contact: {req.contactEmail}</p>

                  <p className="text-xs text-gray-400">
                    🕒{" "}
                    {new Date(req.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {req.status === "Pending" && (
                  <div className="flex gap-3">
                    <button
                      disabled={updatingId === req._id}
                      onClick={() => handleStatus(req._id, "Accepted")}
                      className="flex-1 bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50 transition"
                    >
                      {updatingId === req._id ? "Updating..." : "Accept"}
                    </button>

                    <button
                      disabled={updatingId === req._id}
                      onClick={() => handleStatus(req._id, "Rejected")}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
