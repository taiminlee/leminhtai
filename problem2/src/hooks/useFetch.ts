import React from "react";

export interface Fetch<T> {
  data: T | undefined;
  error: string;
  loading: boolean;
}

export default function useFetch<T>(callback: () => Promise<T>): Fetch<T> {
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      async function fetchData() {
        try {
          const response = await callback();
          setData(response);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return { data, error, loading };
}
