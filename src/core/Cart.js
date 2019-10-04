import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import CheckOut from "./CheckOut";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  // à l'implementation  du map des articles ajoutés à la cart
  // pour prémunir d'une boucle
  useEffect(() => {
    setItems(getCart());
  }, [run]);

  // useEffect(() => {
  //   setItems(getCart());
  // }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2> Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCardButton={false}
            cartUpdate={true}
            showRemovedProductButton={true}
            setRun={setRun}
            run={run}
          />
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
          <h2 className="mb-4">Your cart summary</h2>
          <CheckOut products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
