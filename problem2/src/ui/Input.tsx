import React from "react";
import { ExchangeContext } from "../context/ExchangeContext";

interface InputProps {
  title: string;
}

export default function Input(props: InputProps) {
  const { price, setPrice } = React.useContext(ExchangeContext);
  const [error, setError] = React.useState<string>("");

  return (
    <div className="simple-flex-col">
      <h1>{props.title}</h1>
      <input
        className="custom-input"
        name=""
        id=""
        value={price}
        onChange={(e) => {
          const val = e.target.value;
          setPrice(val);
          const isString = isNaN(Number(val));
          if (isString) {
            setError("Please enter a valid amount");
          } else {
            if (Number(val) <= 0) {
              setError("Please enter an amount greater than 0");
            } else {
              setError("");
            }
          }
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
