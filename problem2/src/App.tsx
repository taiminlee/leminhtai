import React from "react";
import { Price } from "./api/prices";
import "./App.css";
import Form from "./component/Form";
import ValueText from "./component/ValueText";
import { ExchangeContext } from "./context/ExchangeContext";

function App() {
  const [current, setCurrent] = React.useState<Price | undefined>(undefined);
  const [foreign, setForeign] = React.useState<Price | undefined>(undefined);
  const [price, setPrice] = React.useState<string>("");

  return (
    <ExchangeContext.Provider
      value={{ current, setCurrent, foreign, setForeign, price, setPrice }}
    >
      <h1 style={{textAlign: "center", fontSize: "2rem", marginTop: "20px"}}>Convert</h1>
      <Form />
      <ValueText />
    </ExchangeContext.Provider>
  );
}

export default App;
