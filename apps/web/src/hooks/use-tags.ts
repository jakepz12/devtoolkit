"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useTags() {
  const [tags, setTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTags();
      setTags(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTag = async (name: string, color: string) => {
    try {
      const tag = await api.createTag(name, color);
      setTags((prev) => [...prev, tag]);
      return tag;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTag = async (id: string) => {
    try {
      await api.deleteTag(id);
      setTags((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    tags,
    isLoading,
    error,
    createTag,
    deleteTag,
    refetch: fetchTags,
  };
}
