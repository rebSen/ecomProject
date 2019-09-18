import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices }) => {
  const [value, setValue] = useState(0);

  const handleChange = () => {
    //
  };

  return prices.map((p, i) => (
    <div key={i} className="list-unstyled">
      <input
        onChange={handleChange}
        type="Radio"
        value={`${p._id}`}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));

  // (
  //   <Fragment>
  //     {/* {JSON.stringify(prices)} */}
  //     <input type="radio" className="mr-2 ml-4" />
  //     <label className="form-check-label">Name</label>
  //     {}
  //   </Fragment>
  // );
};

export default RadioBox;
