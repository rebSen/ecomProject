import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const CheckOut = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    loading: null,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  // be careful before result was data
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(result => {
      if (result.error) {
        setData({ ...data, error: result.error });
      } else {
        setData({ ...data, clientToken: result.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const buy = () => {
    // to send the nonce (card type, card numb) to the server
    // nonce = data.instance.requestPaymentMethod
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(data => {
        // console.log(data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            //console.log(response)
            setData({ ...data, success: response.success });

            emptyCart(() => {
              // Problem with empty car lesson 121 maybe better with order lesson
              setData({ loading: false, success: true });
              console.log("payment success and empty cart");
            });
            // empty card
            // create order
          })
          .catch(
            error => console.log("error:", error),
            setData({ loading: false })
          );

        // console.log("send nnxe and total", nonce, getTotal(products));
      })
      .catch(error => {
        console.log("dropIn error:", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    // to erase error message when user typing again > onBlur
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            // threeDSecure is for cvv case  options : threeDSecure: true
            options={{ authorization: data.clientToken }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks your payment was succesfull
    </div>
  );
  return (
    <div>
      <h2>total : ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};
export default CheckOut;
