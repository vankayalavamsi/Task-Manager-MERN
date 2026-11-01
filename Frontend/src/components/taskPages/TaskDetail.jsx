import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";

const priorityStyles = {
  Low: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Medium: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  High: "bg-rose-500/10 text-rose-300 border-rose-400/20",
};
const statusStyles = {
  Pending: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  "In Progress": "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Completed: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", dueDate: "", status: "", priority: "",
  });

  const fetchTaskDetails = async () => {
    try {
      const { data } = await API.get(`/task/task/${id}`);
      setTask(data.task);
      setFormData({
        title: data.task.title,
        description: data.task.description,
        dueDate: data.task.dueDate ? data.task.dueDate.slice(0, 10) : "",
        status: data.task.status,
        priority: data.task.priority,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load task");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/task/update/${id}`, formData); // PUT (was POST)
      setEdit(false);
      fetchTaskDetails();
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating task");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/task/delete/${id}`); // DELETE (was GET)
        toast.success("Task deleted successfully");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.response?.data?.message || "Error deleting task");
      }
    }
  };

  const formatDate = (d) => {
    if (!d) return "No due date";
    const date = new Date(d);
    return isNaN(date) ? d : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 min-h-screen">
      {edit ? (
        <form onSubmit={handleUpdate} className="glass-card p-8 space-y-5 animate-fade-up">
          <h2 className="text-2xl font-bold mb-1">Edit Task</h2>
          <p className="text-slate-400 text-sm mb-5">Update the details below.</p>

          <div>
            <label className="label">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange}
              className="input-dark" required />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}
              className="input-dark resize-none" rows="3" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange}
                className="input-dark" required />
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="input-dark">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleInputChange} className="input-dark">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">Save Changes</button>
            <button type="button" onClick={() => setEdit(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="glass-card p-8 animate-fade-up">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold leading-snug">{task.title}</h1>
            <span className={`badge shrink-0 ${statusStyles[task.status] || "bg-white/5 text-slate-300 border-white/10"}`}>
              {task.status}
            </span>
          </div>

          <div className="space-y-4 text-sm mb-8">
            <div>
              <p className="text-slate-500 mb-1">Description</p>
              <p className="text-slate-200">{task.description || "No description"}</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-slate-500 mb-1">Priority</p>
                <span className={`badge ${priorityStyles[task.priority] || "bg-white/5 text-slate-300 border-white/10"}`}>
                  {task.priority}
                </span>
              </div>
              <div>
                <p className="text-slate-500 mb-1">Due Date</p>
                <p className="text-slate-200">📅 {formatDate(task.dueDate)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setEdit(true)} className="btn-primary !py-2 !px-5 text-sm">
              ✏️ Edit Task
            </button>
            <button onClick={handleDelete}
              className="py-2 px-5 rounded-xl text-sm font-semibold text-rose-300 bg-rose-500/10 border border-rose-400/20 hover:bg-rose-500/20 hover:-translate-y-0.5 transition-all duration-200">
              🗑️ Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;