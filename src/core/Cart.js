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
        <h6> Votre panier contient {`${items.length}`} articles</h6>
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
      title="Panier"
      description="Faites votre commande !"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3 offset-1">
          <h4 className="mb-4">Récapitulatif de la commande</h4>
          <CheckOut products={items} />
        </div>
        <div className="col-6 offset-1">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
