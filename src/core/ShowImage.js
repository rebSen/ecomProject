import React from "react";
import { API } from "../config";
import { CardImg } from "reactstrap";

const ShowImage = ({ item, url }) => (
  // <div className="product-img">
  // <div className="card-img">
  <CardImg
    src={`${API}/${url}/photo/${item._id}`}
    alt={item.name}
    //style={{ width: "100px" }} //works
    // width="40%"
    // style={{
    //   Height: "18",
    //   Width: "180",
    //   // borderRadius: "10px 0 0 10px"
    // }}
    //className="mb-3"
    // style={{
    //   maxHeight: "100%",
    //   maxWidth: "100%"
    //   // borderRadius: "10px 0 0 10px"
    // }}
  />
  //  </div>
);

export default ShowImage;
