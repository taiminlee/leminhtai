export interface Price {
  currency: string;
  date: string;
  price: number;
}

export interface PriceWithSVG extends Price {
  svg: string;
}

export async function fetchPrices(): Promise<Price[]> {
  const result = await import("../data.json");
  const prices: Price[] = result.default;
  const mapUniqueCurrency = new Map(prices.map((p) => [p.currency, p]));
  return Array.from(mapUniqueCurrency).map((unique) => unique[1]);
}

export async function fetchPricesWithSVG(): Promise<
  PriceWithSVG[] | undefined
> {
  try {
    const res = await fetchPrices();
    return res.map((price) => {
      const svg = `./tokens/${price.currency.toUpperCase()}.svg`;
      return {
        ...price,
        svg,
      };
    });
  } catch (error) {
    console.error((error as Error).message);
  }
}
