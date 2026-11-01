import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = async () => {
    try {
      await API.get("/logout"); // clears cookie on backend (optional)
    } catch (_) { /* ignore */ }
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const link = "text-slate-300 hover:text-white transition-colors duration-200";
  const btn = "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25 hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-lg">✓</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className={link}>Dashboard</Link>
            <Link to="/createTask" className={link}>Create Task</Link>
            <button onClick={handleLogout} className={btn}>Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/login" className={link}>Login</Link>
            <Link to="/register" className={btn}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;