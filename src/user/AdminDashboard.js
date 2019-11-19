import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "./admin.scss";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const adminlinks = () => {
    return (
      <div className="card">
        <h4 className="card-header black-6">Gérer la boutique</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link admin-link" to="/create/product">
              Enregistrer un nouveau film
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link admin-link" to="/admin/orders">
              Voir les commandes
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link admin-link" to="/admin/products">
              Gérer les articles
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link admin-link" to="/create/category">
              Créer une Catégorie
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfos = () => {
    return (
      <div className="card">
        <h4 className="card-header black-6">Infos Utilisateur</h4>
        <ul className="list-group">
          <li className="list-group-item">{`Identifiant : ${name}`}</li>
          <li className="list-group-item">{`Email : ${email}`}</li>
          <li className="list-group-item">
            Role : {role === 1 ? "Administrateur" : "Utilisateur enregistré"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Admin Dashboard"
      description={`Hello ${name} ! `}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-3">{adminlinks()}</div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 ">{adminInfos()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
