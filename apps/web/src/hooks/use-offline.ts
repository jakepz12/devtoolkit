"use client";

import { useState, useEffect } from "react";

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
}

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered:", reg);
          setRegistration(reg);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const cacheArticle = (url: string, content: any) => {
    if (registration?.active) {
      registration.active.postMessage({
        type: "CACHE_ARTICLE",
        url,
        content,
      });
    }
  };

  const getCachedArticle = (url: string) => {
    return new Promise((resolve) => {
      if (registration?.active) {
        const messageHandler = (event: MessageEvent) => {
          if (event.data.type === "CACHED_ARTICLE" && event.data.url === url) {
            navigator.serviceWorker.removeEventListener("message", messageHandler);
            resolve(event.data.content);
          }
        };
        navigator.serviceWorker.addEventListener("message", messageHandler);
        registration.active.postMessage({
          type: "GET_CACHED_ARTICLE",
          url,
        });
      } else {
        resolve(null);
      }
    });
  };

  return { registration, cacheArticle, getCachedArticle };
}
