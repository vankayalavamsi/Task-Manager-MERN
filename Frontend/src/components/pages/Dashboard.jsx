import React from "react";
import Tasklist from "../taskPages/Tasklist";

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 min-h-screen">
      <Tasklist />
    </div>
  );
};

export default Dashboard;