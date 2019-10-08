import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  return (
    <Layout
      title="Manage Product"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      manage
    </Layout>
  );
};

export default ManageProducts;
