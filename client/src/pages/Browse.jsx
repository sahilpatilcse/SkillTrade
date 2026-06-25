import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

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
        console.log(err);
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
      console.log(err);

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
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase()),
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
              <div key={user._id} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {user.username}
                </h3>

                <p className="text-sm text-gray-500 mb-1">Offers</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {user.skillsOffered.length > 0 ? (
                    user.skillsOffered.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">None listed</span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-1">Wants</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {user.skillsWanted.length > 0 ? (
                    user.skillsWanted.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">None listed</span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedUser(user)}
                  className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800"
                >
                  Send Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Request to{" "}
              <span className="text-purple-700">{selectedUser.username}</span>
            </h2>

            <form onSubmit={handleSendRequest}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  placeholder="Write your message"
                  value={requestData.message}
                  onChange={handleRequestChange}
                  rows="3"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
                />

                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Your Contact Email
                </label>

                <input
                  type="email"
                  name="contactEmail"
                  placeholder="you@example.com"
                  value={requestData.contactEmail}
                  onChange={handleRequestChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
                />

                {errors.contactEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactEmail}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Request Type
                </label>

                <select
                  name="requestType"
                  value={requestData.requestType}
                  onChange={handleRequestChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Learn">📚 Learn</option>
                  <option value="Teach">🎓 Teach</option>
                  <option value="Exchange">🤝 Exchange</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send"}
                </button>

                <button
                  type="button"
                  onClick={resetModal}
                  disabled={sending}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
