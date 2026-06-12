"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const data = await api.getArticles();
      setArticles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (url: string) => {
    try {
      const article = await api.addArticle(url);
      setArticles((prev) => [article, ...prev]);
      return article;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await api.deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    articles,
    isLoading,
    error,
    addArticle,
    deleteArticle,
    refetch: fetchArticles,
  };
}
