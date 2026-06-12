"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      const data = await api.getPortfolios();
      setPortfolios(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return { portfolios, isLoading, error, refetch: fetchPortfolios };
}

export function usePortfolio(slug: string) {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const data = await api.getPortfolioBySlug(slug);
        setPortfolio(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchPortfolio();
  }, [slug]);

  return { portfolio, isLoading, error };
}
