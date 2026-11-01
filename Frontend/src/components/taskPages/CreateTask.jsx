import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Medium",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/task/create", formData);
      toast.success("Task created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 min-h-screen">
      <div className="glass-card p-8 animate-fade-up">
        <h2 className="text-2xl font-bold mb-1">Create New Task</h2>
        <p className="text-slate-400 text-sm mb-7">
          Fill in the details below to add a task.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="input-dark" placeholder="What needs to be done?" required />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="input-dark resize-none" rows="3" placeholder="Add more details..." required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}
                className="input-dark" required />
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-dark">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="input-dark">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? "Creating..." : "Create Task"}
            </button>
            <button type="button" onClick={() => navigate("/dashboard")} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;