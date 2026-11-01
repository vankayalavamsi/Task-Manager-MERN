import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await API.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="glass-card w-full max-w-md p-8 animate-fade-up">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-float">
          <span className="text-2xl">🚀</span>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Create account</h2>
        <p className="text-sm text-slate-400 text-center mb-7">
          Start organizing your tasks today
        </p>

        {error && <div className="alert-error mb-5">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              className="input-dark" placeholder="John Doe" required />
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className="input-dark" placeholder="you@example.com" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="input-dark" placeholder="••••••••" required />
            </div>
            <div>
              <label className="label">Confirm</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                className="input-dark" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;