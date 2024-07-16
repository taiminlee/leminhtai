import React from "react";
import "../css/input.css";
import { PriceWithSVG } from "../api/prices";
import { ExchangeContext } from "../context/ExchangeContext";
import FallbackImage from "./FallbackImage";

interface InputAutoCompleteProps {
  title: "From" | "To";
  options: PriceWithSVG[] | undefined;
}

export default function InputAutoComplete(props: InputAutoCompleteProps) {
  const { current, setCurrent, foreign, setForeign } =
    React.useContext(ExchangeContext);

  const [currency, setCurrency] = React.useState<string>(
    (props.title === "From" ? current?.currency : foreign?.currency) || ""
  );
  const [search, setSearch] = React.useState<boolean>(false);

  // function handleOnBlur() {
  //   console.log("trigger")
  //   setSearch(false);
  //   setCurrency(
  //     (props.title === "From" ? current?.currency : foreign?.currency) || ""
  //   );
  // }

  function handleOnClick(priceWithSVG: PriceWithSVG) {
    setSearch(false);
    setCurrency(priceWithSVG.currency);
    props.title === "From"
      ? setCurrent(priceWithSVG)
      : setForeign(priceWithSVG);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "28%",
        position: "relative",
      }}
    >
      <h1>{props.title}</h1>
      <input
        type="text"
        value={currency}
        className="auto-complete"
        placeholder="Type to search..."
        style={{ padding: "14px" }}
        onClick={() => {
          setSearch(true);
          setCurrency("");
        }}
        onChange={(e) => setCurrency(e.target.value)}
        
      />
      <ul
        style={{
          width: "100%",
          display: search ? "block" : "none",
          position: "absolute",
          top: 105,
          height: "400px",
          overflow: "auto",
          backgroundColor: "#fff"
        }}
        className="list-dropdown"
      >
        {props?.options
          ?.filter((a) =>
            a.currency.toLowerCase().includes(currency.toLocaleLowerCase())
          )
          .map((a, idx) => (
            <li key={idx} onClick={() => handleOnClick(a)}>
              <FallbackImage src={a.svg} alt="Token Icon" />
              {a.currency}
            </li>
          ))}
      </ul>
    </div>
  );
}
