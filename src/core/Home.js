import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import CardMain from "./Card";
import Search from "./Search";
import { Container, Row, Col } from "reactstrap";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Cinéma Documentaire"
      description="Retrouvez ici tous les films édités par La Famille Digitale et les films produits par Réel Factory."
      className="container-fluid"
    >
      <Search />
      {/* <div className="container-fluid"> */}
      {/* <div className="row"> */}
      {/* <h3 className="mb-4">::::: Nouveautés</h3> */}

      {/* md={4} sm={4} xs={12} */}

      <h3>::::: Nouveautés</h3>
      <div className="card-deck">
        {productsByArrival.map((product, i) => (
          // col-sm mb-3
          // <div key={i}>
          <CardMain key={i} product={product} />
          // </div>
        ))}
      </div>
      {/* </div> */}

      {/* <div className="row"> */}
      {/* //<h3 className="mb-4">::::: Meilleures ventes</h3> */}
      <h3>::::: Meilleures ventes</h3>
      <div className="card-deck">
        {productsBySell.map((product, i) => (
          // <div key={i} className="mb-3">
          <CardMain key={i} product={product} />
          // </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
