import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import "./product.scss";

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]); // each time props change > useEffect (when view product in relatedProduct)

  return (
    <Layout
      className="container"
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <div className="container">
           
        <div className="row">
          <div className="col-12">
            {product && product.description && (
              // remplacer par page film
              <Card
                product={product}
                showViewProductButton={false}
                isSingle={true}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="related-title">De la même collection :</div>
            <div className="related">
              {relatedProduct.map((p, i) => (
                <div key={i} className="col-md-4 mb-3">
                  <Card product={p} isRelated={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
                  
      </div>
         
    </Layout>
  );
};

export default Product;
