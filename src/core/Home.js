import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
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
      <div className="container">
        <h3 className="mb-4">Nouveautés</h3>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-sm mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h3 className="mb-4">Meilleures ventes</h3>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-sm mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
