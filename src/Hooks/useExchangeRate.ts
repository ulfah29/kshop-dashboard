import { useEffect, useState, useCallback } from "react";

export function useExchangeRate(from = 'KRW', to = 'IDR') {
  const cacheKey = `exchange-rate-${from}-${to}`;

  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRate = useCallback(async (force = false) => {
    try {
      setLoading(true);

      const today = new Date().toISOString().split("T")[0];

      const cached = localStorage.getItem(cacheKey);

      if (!force && cached) {
        const { rate, date } = JSON.parse(cached);

        if (date === today) {
          setRate(rate);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(
        `https://api.frankfurter.dev/v2/rate/${from}/${to}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const data = await response.json();
      const latestRate = data.rate;

      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          rate: latestRate,
          date: today,
        })
      );

      setRate(latestRate);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [from, to, cacheKey]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  return {
    rate,
    loading,
    error,
    refresh: () => fetchRate(true),
  };
}


