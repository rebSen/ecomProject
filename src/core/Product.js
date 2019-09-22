import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Product = props => {
  const [product, setProduct] = useState();
  const [error, setError] = useState();

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      className="container-fluid"
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <h2 className="mb-4">Single Product</h2>       
      <div className="row">
        {product && product.description && (
          <Card product={product} showViewProductButton={false} />
        )}{" "}
              
      </div>
          
    </Layout>
  );
};

export default Product;
