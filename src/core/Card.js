import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import "./card.scss";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCardButton = true,
  cartUpdate = false,
  showRemovedProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-dark mt-2 mb-2">
            Fiche du film
          </button>
        </Link>
      )
    );
  };

  const showAddToCard = showAddToCardButton => {
    return (
      showAddToCardButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-secondary mt-2 mb-2 mr-2"
        >
          Ajouter au panier
        </button>
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
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-warning mt-2 mb-2 mr-2"
        >
          Remove article
        </button>
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
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-2">
          <Link to={`/product/${product._id}`}>
            <ShowImage item={product} url="product" />
          </Link>
          {/* <img src="..." class="card-img" alt="..."> */}
        </div>

        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">{product.description.substring(0, 250)}...</p>

            <p> {product.subtitle}</p>
            {/* <p class="card-text">
              <small class="text-muted"></small>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
