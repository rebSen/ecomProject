import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import "./admin.scss";

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
        <h4 className="card-header ">User Link</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link admin-link" to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link admin-link" to={`/profile/${_id}`}>
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

  const purchaseHistory = history => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product unity price: ${p.price}</h6>
                        <h6>Product quantity: {p.count}</h6>
                        {/* <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6> this is not what we want her is the date when product is created*/}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
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
        <div className="col-md-8 offset-md-2 mb-3">{userlinks()}</div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 ">{purchaseHistory(history)}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
