import React from "react";
import { Price } from "../api/prices";

type ExchangeContextType = {
    current: Price | undefined;
    setCurrent: React.Dispatch<React.SetStateAction<Price | undefined>>;
    foreign: Price | undefined;
    setForeign: React.Dispatch<React.SetStateAction<Price | undefined>>;
    price: string;
    setPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const ExchangeContext = React.createContext<ExchangeContextType>({
    current: undefined,
    setCurrent: function (value: React.SetStateAction<Price | undefined>): void {
        throw new Error("Function not implemented.");
    },
    foreign: undefined,
    setForeign: function (value: React.SetStateAction<Price | undefined>): void {
        throw new Error("Function not implemented.");
    },
    price: "",
    setPrice: function (value: React.SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    }
});