import { Home, Clock, FileText, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Floating icons illustration */}
      <div className="relative w-64 h-48 mb-6 select-none">
        {/* Big 404 text */}
        <span className="absolute inset-0 flex items-center justify-center text-[120px] font-black text-gray-200 leading-none tracking-tighter">
          404
        </span>

        {/* Floating card - center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-xl shadow-sm p-3 z-10">
          <FileText size={28} className="text-gray-500" />
        </div>

        {/* Floating clock - top right */}
        <div className="absolute top-4 right-6 bg-white rounded-xl p-2.5 shadow-sm z-10">
          <Clock size={20} className="text-gray-300" />
        </div>

        {/* Floating link - bottom left */}
        <div className="absolute bottom-6 left-8 bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm z-10">
          <Link size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Oops! This page went on a vacation.
      </h1>
      <p className="text-gray-400 text-sm text-center max-w-xs leading-relaxed mb-8">
        The financial data you're looking for seems to have drifted off the
        ledger. Let's get your budget back on track.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer gap-2 bg-[#16332D] hover:bg-[#1e4a42] transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg"
      >
        <Home size={16} />
        Return to Dashboard
      </button>
    </div>
  );
}