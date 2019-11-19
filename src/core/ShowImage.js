import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  // <div className="product-img">
  <div className="card-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      //className="mb-3"
      style={{
        maxHeight: "100%",
        maxWidth: "100%"
        // borderRadius: "10px 0 0 10px"
      }}
    />
  </div>
);

export default ShowImage;
