import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

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

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchTask = async () => {
    try {
      const { data } = await API.get("/task/alltasks");
      const validTasks = Array.isArray(data.tasks)
        ? data.tasks.filter((t) => t && t._id)
        : [];
      setTasks(validTasks);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const formatDate = (d) => {
    if (!d) return "No due date";
    const date = new Date(d);
    return isNaN(date) ? d : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-slate-400 text-sm mt-1">
            {tasks.length} task{tasks.length !== 1 && "s"} total
          </p>
        </div>
        <Link to="/createTask" className="btn-primary !py-2 !px-5 text-sm">
          + New Task
        </Link>
      </div>

      {error && <div className="alert-error mb-6">{error}</div>}

      {tasks.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {tasks.map((task, i) => (
            <div
              key={task._id}
              className="glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-indigo-500/10 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold text-slate-100 leading-snug">
                  {task.title}
                </h3>
                <span className={`badge shrink-0 ${statusStyles[task.status] || "bg-white/5 text-slate-300 border-white/10"}`}>
                  {task.status}
                </span>
              </div>

              <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                {task.description || "No description"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className={`badge ${priorityStyles[task.priority] || "bg-white/5 text-slate-300 border-white/10"}`}>
                    {task.priority}
                  </span>
                  <span>·</span>
                  <span>📅 {formatDate(task.dueDate)}</span>
                </div>
                <Link
                  to={`/task/${task._id}`}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <div className="glass-card p-12 text-center animate-fade-up">
            <div className="text-5xl mb-4">🗒️</div>
            <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
            <p className="text-slate-400 text-sm mb-6">
              Create your first task and start being productive.
            </p>
            <Link to="/createTask" className="btn-primary inline-block">Create Task</Link>
          </div>
        )
      )}
    </div>
  );
};

export default Tasklist;