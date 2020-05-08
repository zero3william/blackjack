import React from "react";
import PropTypes from "prop-types";
import Demo from "../../../components/Demo";

export const Counter = (props) => (
  <div style={{ margin: "0 auto" }}>
    <Demo data={props} />
  </div>
);
Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
};

export default Counter;
