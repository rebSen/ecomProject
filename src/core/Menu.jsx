import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
// import Search from "./Search";
import "./menu.scss";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#70CD6A" };
  } else {
    return { color: "#000000" };
  }
};

const Menu = ({ history }) => (
  <div className="container-fluid align-menu">
    {/* <div className="row"> */}

    <div className="col-6">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Accueil
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Tous les films
          </Link>
        </li>
      </ul>
    </div>
    <hr />
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Mon panier
            <sup>
              <small className="badge badge-dark">{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Panel utilisateur
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Panel administrateur
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Connexion
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Créer un compte
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#000000" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Deconnexion
            </span>
          </li>
        )}
      </ul>
    </div>
  </div>
);

export default withRouter(Menu);
