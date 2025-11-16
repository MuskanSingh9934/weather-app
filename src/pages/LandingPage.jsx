import { Link } from "react-router-dom";
import Card from "../components/Card";
import BGURL from "../assets/neon-bg.jpg";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${BGURL})` }}
    >
      <Card className="max-w-md w-full text-center py-10 px-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">WeatherAlert</h1>

        <p className="text-gray-600">
          Track real-time weather conditions and get notified when alerts affect
          your region. Your safety matters.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LandingPage;
