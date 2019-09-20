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

  const loadCatgories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCatgories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({
        search: search || undefined,
        category: category || undefined
      }).then(response => {
        if (response.error) {
          console.log("ICI?", response.error);
        } else {
          console.log("RES", response);
          setData({ ...data, results: response, search: true });
        }
      });
    }
  };
  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="row">
        {results &&
          results.map((product, i) => {
            return <Card key={i} product={product} />;
          })}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={e => searchSubmit(e)}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="all">Pick Category</option>
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
