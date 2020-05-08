import React from "react";
import Blackjack from "../../../components/Blackjack";

export const View = (props) => (
  <div style={{ margin: "0 auto" }}>
    <Blackjack data={props} />
  </div>
);

export default View;
