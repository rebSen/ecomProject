import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
//import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "./card.scss";
import Button from "../styles/Buttons";
// import styled from "styled-components";
import {
  Card,
  // CardImg,
  CardText,
  CardBody,
  // CardLink,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import "../_variable.scss";

// const Button = styled.button`
//   background-color: #ffffff;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border-radius: 3px;
//   font-size: 0.9em;
//   border: 1px solid #c9c9c9;
//   font-family: Raleway, sans-serif;
//   &:hover {
//     background: #bababa;
//   }
// `;

const CardMain = ({
  product,
  showViewProductButton = true,
  showAddToCardButton = true,
  cartUpdate = false,
  showRemovedProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
  isSingle = false,
  isRelated = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <Button>Fiche du film</Button>
        </Link>
      )
    );
  };

  const showAddToCard = (showAddToCardButton) => {
    return (
      showAddToCardButton && (
        <Button onClick={addToCart}>Ajouter au panier</Button>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showRemovedButton = (showRemovedProductButton) => {
    return (
      showRemovedProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
        >
          Supprimer l'article
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">{`${quantity} dvd yet in Stock`}</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <Card>
      <CardBody>
        {shouldRedirect(redirect)}
        <CardTitle style={{ color: "red" }}>{product.name}</CardTitle>
        <CardSubtitle>{product.subtitle}</CardSubtitle>
      </CardBody>
      {/* <img width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}

      <CardBody>
        <ShowImage item={product} url="product" />
        <CardText>
          {" "}
          {isSingle
            ? product.description
            : product.description.substring(0, 250)}
          ...
        </CardText>
        {product.vimeo && isSingle ? (
          <div
            className="video"
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 */,
              paddingTop: 25,
              height: 0,
            }}
          >
            <iframe
              title={product.name}
              src={product.vimeo}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
        ) : (
          <div></div>
        )}
        <div>{showViewButton(showViewProductButton)}</div>

        <div>{showAddToCard(showAddToCardButton)}</div>

        <div>{showRemovedButton(showRemovedProductButton)}</div>
      </CardBody>
    </Card>
  );
};

export default CardMain;
