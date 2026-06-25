import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-2xl mx-auto bg-white p-10 shadow-md rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <Link
            to="/editProfile"
            className="bg-purple-700 px-5 py-2 text-white rounded-lg font-semibold hover:bg-purple-800"
          >
            Edit Profile
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Username</p>
          <p className="text-lg text-gray-800 font-medium">{user.username}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="text-lg text-gray-800 font-medium">{user.email}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Bio</p>
          <p className="text-lg text-gray-800">
            {user.bio || "Tell others about yourself and your skills."}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Skills Offered</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.length > 0 ? (
              user.skillsOffered.map((skill, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-lg text-gray-800">No skills offered yet</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Skills Wanted</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.length > 0 ? (
              user.skillsWanted.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-lg text-gray-800">No skills wanted yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
