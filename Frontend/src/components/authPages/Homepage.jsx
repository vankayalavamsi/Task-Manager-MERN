import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl animate-fade-up">
        <span className="badge bg-indigo-500/10 text-indigo-300 border-indigo-400/20 mb-6">
          ✦ Organize your work
        </span>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Manage your tasks{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            like a pro
          </span>
        </h1>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          A clean, fast and simple task management system. Create tasks,
          track progress and never miss a deadline again.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/login" className="btn-primary">Get Started</Link>
          <Link to="/register" className="btn-secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;