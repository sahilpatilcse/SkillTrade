import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    bio: "",
    skillsOffered: "",
    skillsWanted: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const user = res.data.user;

        setFormData({
          bio: user.bio || "",
          skillsOffered: user.skillsOffered.join(", "),
          skillsWanted: user.skillsWanted.join(", "),
        });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleInputChange = (e) => {
    setFormData((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const updatedData = {
      bio: formData.bio.trim(),

      skillsOffered: formData.skillsOffered
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      skillsWanted: formData.skillsWanted
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    API.put("/api/auth/update-profile", updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setSuccessMsg("Profile updated successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update profile.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-center text-3xl text-gray-800 font-bold mb-8">
          Edit Profile
        </h1>

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </p>
        )}

        {successMsg && (
          <p className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {successMsg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label  className="block font-medium mb-2 text-gray-700">Bio</label>

            <textarea
              className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:outline-none focus:border-purple-500"
              name="bio"
              rows="4"
              placeholder="Tell others about yourself, your experience, and your skills..."
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-2 text-gray-700">
              Skills Offered
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:outline-none focus:border-purple-500"
              type="text"
              name="skillsOffered"
              placeholder="React, Node.js, MongoDB, JavaScript"
              value={formData.skillsOffered}
              onChange={handleInputChange}
            />

            <p className="text-xs text-gray-400 mt-1">
              Separate skills with commas
            </p>
          </div>

          <div className="mb-8">
            <label className="block font-medium mb-2 text-gray-700">
              Skills Wanted
            </label>

            <input
              className="w-full border rounded-lg px-4 py-3 border-gray-300 focus:outline-none focus:border-purple-500"
              type="text"
              name="skillsWanted"
              placeholder="UI/UX Design, Python, DevOps"
              value={formData.skillsWanted}
              onChange={handleInputChange}
            />

            <p className="text-xs text-gray-400 mt-1">
              Separate skills with commas
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <Link
              to="/dashboard"
              className="flex-1 text-center border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
