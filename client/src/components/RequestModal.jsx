export default function RequestModal({
  selectedUser,
  requestData,
  errors,
  sending,
  handleRequestChange,
  handleSendRequest,
  resetModal,
}) {
  if (!selectedUser) return null;

  return (
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
              rows="1"
              value={requestData.contactEmail}
              onChange={handleRequestChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500"
            />

            {errors.contactEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
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
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold  hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
