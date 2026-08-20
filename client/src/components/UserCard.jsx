export default function UserCard({ user, setSelectedUser }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
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
  );
}