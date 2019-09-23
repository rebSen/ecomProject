import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import Card from "./Card";

const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getCart);
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2> Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} showAddToCardButton={false} />
        ))}
      </div>
    );
  };
  const noItemsMessage = () => (
    <Fragment>
      <h2> Your cart is empty</h2>
      <br />
      <Link to="/shop">Continue shopping</Link>{" "}
    </Fragment>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage Your card items."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          Show checkout options / shipping adress / etc...
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
