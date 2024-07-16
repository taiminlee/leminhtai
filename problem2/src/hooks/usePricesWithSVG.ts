import { fetchPricesWithSVG, PriceWithSVG } from "../api/prices";
import useFetch, { Fetch } from "./useFetch";

export default function usePricesWithSVG(): Fetch<PriceWithSVG[] | undefined> {
  return useFetch<PriceWithSVG[] | undefined>(() => fetchPricesWithSVG());
}
