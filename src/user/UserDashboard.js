import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userlinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Link</h4>
        <ul className="list-group">
          <li className="list-group-item">test</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout title="User Dashboard" description="user dashboard">
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registred user"}
          </li>
          <li className="list-group-item">{email}</li>
        </ul>
      </div>
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    </Layout>
  );
};

export default Dashboard;
