import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const CheckOut = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
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

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

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
    setData({ loading: true });
    // to send the nonce (card type, card numb) to the server
    // nonce = data.instance.requestPaymentMethod
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(res => {
        nonce = res.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

        processPayment(userId, token, paymentData)
          .then(response => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address
            };

            createOrder(userId, token, createOrderData);
            setData({ ...data, success: response.success });

            emptyCart(() => {
              // Problem with empty car lesson 121 maybe better with order lesson
              // setData({ loading: false, success: true });
              setData({ loading: false });
              console.log("payment success and empty cart");
            });
          })
          .catch(error => {
            return console.log("error:", error), setData({ loading: false });
          });

        // console.log("send nonce and total", nonce, getTotal(products));
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
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery address</label>
            <input
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type the delivery adress here"
            />{" "}
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
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

  const showLoading = loading => loading && <h2>Loading...</h2>;
  return (
    <div>
      <h2>total : ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};
export default CheckOut;
