import React from "react";
import { ExchangeContext } from "../context/ExchangeContext";
import "../css/base.css";
import "../css/form.css";
import usePricesWithSVG from "../hooks/usePricesWithSVG";
import Input from "../ui/Input";
import InputAutoComplete from "../ui/InputAutoComplete";

export default function Form() {
  const { data, error, loading } = usePricesWithSVG();
  const { current, setCurrent, foreign, setForeign } =
    React.useContext(ExchangeContext);

  return loading ? (
    <div className="simple-flex">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <img
          src="./loading.svg"
          alt="loading"
          style={{ width: "50px", height: "50px" }}
        />
      )}
    </div>
  ) : (
    <div className="form">
      <Input title="Amount" />
      <InputAutoComplete key="from" title="From" options={data} />
      <button
        style={{
          border: "2px solid #ccc",
          borderRadius: "25px",
          padding: "8px",
        }}
        onClick={() => {
          setCurrent(foreign);
          setForeign(current);
        }}
      >
        <img
          src="./swap-svgrepo-com.svg"
          className="App-logo"
          alt="logo"
          style={{ width: "15px", height: "15px" }}
        />
      </button>

      <InputAutoComplete title="To" options={data} />
    </div>
  );
}
