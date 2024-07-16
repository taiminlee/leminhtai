import { fetchPrices, Price } from "../api/prices";
import useFetch, { Fetch } from "./useFetch";

export default function usePrices(): Fetch<Price[]> {
  return useFetch<Price[]>(() => fetchPrices());
}
