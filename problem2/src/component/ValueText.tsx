import React from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import "../css/valueText.css";

export default function ValueText() {
  const { price, current, foreign } = React.useContext(ExchangeContext);

  const priceNumber = Number(price);
  if (!isNaN(priceNumber) && priceNumber > 0 && current && foreign) {
    return (
      <div className="value-text">
        <div>
          <i>
            Data is up-to-date as of <b>{current.date}</b> for{" "}
            <b>{current.currency}</b> and <b>{foreign.date}</b> for{" "}
            <b>{foreign.currency}</b>{" "}
          </i>
        </div>
        <div>
          <h3 style={{fontSize: "2rem"}}>
            {price} {current.currency} ={" "}
            {(current.price / foreign.price) * Number(price)} {foreign.currency}
          </h3>
        </div>
        <div>
          <p>
            1 {current.currency} = {current.price / foreign.price}{" "}
            {foreign.currency}
          </p>
          <p>
            1 {foreign.currency} = {foreign.price / current.price}{" "}
            {current.currency}
          </p>
        </div>
      </div>
    );
  }
  return <div></div>;
}
