import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";

const Shop = () => {
  return (
    <Layout
      title="Home Page"
      description="Node React ecommerce !"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">Left sidebar</div>
        <div className="col-8">Right sidebar</div>
      </div>
    </Layout>
  );
};

export default Shop;
