import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "./card.scss";
import Button from "../styles/Buttons";
// import styled from "styled-components";
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

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCardButton = true,
  cartUpdate = false,
  showRemovedProductButton = false,
  setRun = f => f, // default value of function
  run = undefined, // default value of undefined
  isSingle = false,
  isRelated = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <Button>Fiche du film</Button>
        </Link>
      )
    );
  };

  const showAddToCard = showAddToCardButton => {
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

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showRemovedButton = showRemovedProductButton => {
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

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">{`${quantity} dvd yet in Stock`}</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
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
    // <div className="card">
    //   <div className="card-header name">{product.name}</div>
    //   <div className="card-body description">
    //     {shouldRedirect(redirect)}
    //     <Link to={`/product/${product._id}`}>
    //       <ShowImage item={product} url="product" />
    //     </Link>
    //     <p className="mt-2">
    //       <p>{product.description.substring(0, 100)}</p>
    //     </p>

    //     <p className="black-10">${product.price}</p>
    //     <p className="black-9">
    //       Category : {product.category && product.category.name}
    //     </p>
    //     <p className="black-8">
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>
    //     {showStock(product.quantity)}
    //     <br />
    //     {showViewButton(showViewProductButton)}
    //     {showAddToCard(showAddToCardButton)}
    //     {showRemovedButton(showRemovedProductButton)}
    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

    // style={{ maxWidth: "540px" }}
    <div class="card mb-3 radius">
      {/* <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "#282928" }}
      > */}
      <div class="row no-gutters">
        <div className={isRelated ? "test" : "col-md-2"}>
          {/* TODO:condition si single */}
          <ShowImage item={product} url="product" />
        </div>
        {/* <img src="..." class="card-img" alt="..."> */}
        {/* </div> */}

        <div className={isRelated ? "col-md-12" : "col-md-10 "}>
          {/* col-lg-9 */}
          <div class="card-body">
            {shouldRedirect(redirect)}
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">
              <medium class="text-muted">{product.subtitle}</medium>
            </p>

            <p class="card-text">
              {isSingle
                ? product.description
                : product.description.substring(0, 250)}
              ...
            </p>

            {product.vimeo && isSingle ? (
              <div
                className="video"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0
                }}
              >
                <iframe
                  src={product.vimeo}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>
              </div>
            ) : (
              <div></div>
            )}

            <div className="row place-button">
              <div>{showViewButton(showViewProductButton)}</div>
              <div>{showAddToCard(showAddToCardButton)}</div>
              <div>{showRemovedButton(showRemovedProductButton)}</div>
              {/* <div>{showCartUpdateOptions(cartUpdate)}</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Card;
