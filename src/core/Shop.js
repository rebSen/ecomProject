import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import CardMain from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import "./shop.scss";
import Button from "../styles/Buttons";
import { Row, Col } from "reactstrap";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(8);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && <Button onClick={loadMore}>Load More !</Button>
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters; // pas clair pour moi

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues; // pas clair pour moi
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  return (
    <Layout title="La boutique" description="" className="container-fluid">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-lg-2 offset-lg-1 shop-menu">
            <p>Filtrer par Collections </p>
            <ul>
              <CheckBox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            </ul>
            <br />
            <div className="filter-price">
              <p>Filtrer par prix</p>
              <div>
                <RadioBox
                  prices={prices}
                  handleFilters={filters => handleFilters(filters, "price")}
                />
              </div>
            </div>
          </div>

          <div className="col-sm-8 offset-1 offset-lg-0">
            <div>
              {filteredResults &&
                filteredResults.map((product, i) => (
                  <div key={i}>
                    <Card product={product} />
                  </div>
                ))}
            </div>

            <hr />
            <div style={{ float: "right" }}>{loadMoreButton()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
