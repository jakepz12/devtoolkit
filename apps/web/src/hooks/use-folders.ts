"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useFolders() {
  const [folders, setFolders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      const data = await api.getFolders();
      setFolders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const createFolder = async (name: string) => {
    try {
      const folder = await api.createFolder(name);
      setFolders((prev) => [...prev, folder]);
      return folder;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFolder = async (id: string) => {
    try {
      await api.deleteFolder(id);
      setFolders((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    folders,
    isLoading,
    error,
    createFolder,
    deleteFolder,
    refetch: fetchFolders,
  };
}
