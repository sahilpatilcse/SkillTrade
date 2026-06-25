import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero sec. */}
      <div className=" bg-purple-700 text-white px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Trade Skills. Grow Together.
        </h1>
        <p className="text-xl text-purple-200 mb-10 max-w-2xl mx-auto">
          Connect with people who have the skills you want. Share the skills you
          have. Learn and grow together.
        </p>

        <div className="flex justify-center gap-4">
          {user ? (
            <Link
              to="/browse"
              className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100"
            >
              Browse Skills
            </Link>
          ) : (
            <>
              <Link
                to="/signUp"
                className="bg-white text-purple-500 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-purple-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features sec. */}
      <div className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl text-gray-800 mb-12 text-center">
          How SkillTrade Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Create Profile
            </h3>
            <p className="text-gray-600">
              List the skills you can teach and the skills you want to learn.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Browse Users
            </h3>
            <p className="text-gray-600">
              Find people whose skills match what you are looking for.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Start Trading
            </h3>
            <p className="text-gray-600">
              Send a trade request and start learning from each other.
            </p>
          </div>
        </div>
      </div>

      {/* CTA sec. */}
      <div className="bg-purple-700 text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start trading skills?
        </h2>
        <p className="text-purple-200 mb-8 max-w-xl mx-auto">
          Start your skill trading journey today.
        </p>
        <Link
          to="/signup"
          className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
}
