import React from "react";
import { PriceWithSVG } from "../api/prices";
import { ExchangeContext } from "../context/ExchangeContext";

interface DropdownProps {
  title: "From" | "To";
  options: PriceWithSVG[] | undefined;
}

export default function Dropdown(props: DropdownProps) {
  const { current, setCurrent, foreign, setForeign } =
    React.useContext(ExchangeContext);

  function valueSelected(): string {
    return props.title === "From"
      ? JSON.stringify(current)
      : JSON.stringify(foreign);
  }
  function setValue(option: PriceWithSVG) {
    if (props.title === "From") {
      setCurrent(option);
    } else {
      setForeign(option);
    }
  }

  return (
    <div className="simple-flex-col">
      <h1>{props.title}</h1>
      <select
        className="custom-select"
        onChange={(e) => setValue(e.target.value && JSON.parse(e.target.value))}
        value={valueSelected()}
      >
        <option value={undefined}></option>
        {props?.options?.map((o) => (
          <option key={o.currency} value={JSON.stringify(o)}>
            {o.currency}
          </option>
        ))}
      </select>
    </div>
  );
}
