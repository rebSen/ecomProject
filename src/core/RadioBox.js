import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = e => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((p, i) => (
    <div key={i} className="list-unstyled">
      <input
        onChange={handleChange}
        type="Radio"
        value={`${p._id}`}
        // rajouter name influe sur la selection unique
        name={p}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
