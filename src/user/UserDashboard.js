import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  // destructure is authenticated got access User
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userlinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Link</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profil
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfos = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registred user"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">{JSON.stringify(history)}</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="User Dashboard"
      description={`Hello ${name} ! `}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userlinks()}</div>
        <div className="col-9">
          {userInfos()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
