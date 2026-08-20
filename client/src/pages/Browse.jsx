import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

import RequestModal from "../components/RequestModal";
import UserCard from "../components/UserCard";

export default function Browse() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  const [sending, setSending] = useState(false);

  const [requestData, setRequestData] = useState({
    message: "",
    contactEmail: "",
    requestType: "Learn",
  });

  const [errors, setErrors] = useState({});

  const { token } = useAuth();

  useEffect(() => {
    setLoading(true);

    API.get("/api/auth/browse", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        setApiError("Failed to load users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleRequestChange = (e) => {
    const { name, value } = e.target;

    setRequestData((curr) => ({
      ...curr,
      [name]: value,
    }));

    setErrors((curr) => ({
      ...curr,
      [name]: "",
    }));
  };

  const validateRequest = () => {
    let newErrors = {};
    if (!requestData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!requestData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/\S+@\S+\.\S+/.test(requestData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }
    return newErrors;
  };

  const resetModal = () => {
    setSelectedUser(null);
    setRequestData({
      message: "",
      contactEmail: "",
      requestType: "Learn",
    });
    setErrors({});
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    const validationErrors = validateRequest();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
      return;
    }
    try {
      setSending(true);
      await API.post(
        `/api/trade/send-request/${selectedUser._id}`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      resetModal();
      setSuccessMsg("Request sent successfully!");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (err) {
      resetModal();
      setApiError(err.response?.data?.message || "Failed to send request.");
      setTimeout(() => {
        setApiError("");
      }, 3000);
    } finally {
      setSending(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase().trim()) ||
      user.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase().trim()),
      ),
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Users</h1>

        {successMsg && (
          <p className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {successMsg}
          </p>
        )}

        {apiError && (
          <p className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {apiError}
          </p>
        )}

        <input
          type="text"
          placeholder="Search by username or skill"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 px-4 py-3 rounded-lg mb-8 focus:outline-none focus:border-purple-500"
        />

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500">
              No users found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </div>
        )}
      </div>

      <RequestModal
        selectedUser={selectedUser}
        requestData={requestData}
        errors={errors}
        sending={sending}
        handleRequestChange={handleRequestChange}
        handleSendRequest={handleSendRequest}
        resetModal={resetModal}
      />
    </div>
  );
}
