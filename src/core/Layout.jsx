import React from "react";
import Menu from "./Menu";
// import Title from "./Title";

import "../styles.css";

const Layout = ({
  title = "title",
  description = "description",
  className,
  children
}) => (
  <div className="main">
    {/* <Title /> */}
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);
export default Layout;
