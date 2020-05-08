import React from "react";
import PropTypes from "prop-types";
import { IndexLink, Link } from "react-router";
import "./PageLayout.scss";

export const PageLayout = ({ children }) => (
  <div className="container text-center">
    <IndexLink to="/" activeClassName="page-layout__nav-item--active">
      Practice
    </IndexLink>
    {" · "}
    <Link to="/blackjack" activeClassName="page-layout__nav-item--active">
      BlackJack
    </Link>
    <div className="page-layout__viewport">{children}</div>
  </div>
);
PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
