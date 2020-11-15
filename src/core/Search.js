import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import "./search.scss";
import styled from "styled-components";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const Button = styled.button`
    background-color: #ffffff;
    font-size: 1em;
    padding: 0.44em 1em;
    border-radius: 3px;
    font-size: 0.9em;
    border: 1px solid #c9c9c9;
    font-family: Raleway, sans-serif;
    margin-right: -30px;
    &:hover {
      background: #bababa;
    }
  `;

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      console.log(search, category);

      // list in apicore deconne donc res = error O.o
      list({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          console.log("ICI?", response.error);
        } else {
          console.log("RES", response);
          setData({ ...data, results: response, searched: true });
        }
      });
    } else {
      alert("veuillez remplir la recherche");
    }
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData(); // search data deconne > recherche plante
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, result) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} product`;
    }
    if (searched && results.length < 1) {
      return `No product found > Match only full title !!`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h6 className="mt-4 mb-4">{searchMessage(searched, results)} </h6>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  //+++++++++++++++++++++

  //+++++++++++++++++++++

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="container">
        <div className="row">
          <div className="col">
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="recherche par titre - précis pour le moment !"
            />
          </div>

          {/* <div className="col-5">
            <select
              className="custom-select"
              onChange={handleChange("category")}
            >
              <option value="all">Collections</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="col">
            {/* <button className="btn btn-outline-secondary">Search</button> */}
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    // <div className="container search-bar">
    <div className="search-bar">
      <div>{searchedProducts(results)}</div>
      <div>{searchForm()}</div>
      {/* <div className="container mb-3">{searchForm()}</div>
      <div className="container -fluid mb-3">{searchedProducts(results)}</div> */}
    </div>
  );
};

export default Search;
