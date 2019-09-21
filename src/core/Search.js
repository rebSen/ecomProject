import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
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
        category: category
      }).then(response => {
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
  const searchSubmit = e => {
    e.preventDefault();
    searchData(); // search data deconne > recherche plante
  };

  const handleChange = name => event => {
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

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="all">All</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3"> Search bar {searchForm()}</div>
      <div className="container -fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
