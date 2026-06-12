const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API error: ${response.status}`);
    }

    if (response.status === 204) return undefined as T;
    return response.json();
  }

  // Auth
  async register(data: {
    email: string;
    username: string;
    password: string;
  }) {
    return this.request("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{
      access_token: string;
      user: any;
    }>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Portfolio
  async getPortfolios() {
    return this.request<any[]>("/api/v1/portfolio/");
  }

  async getPortfolioBySlug(slug: string) {
    return this.request<any>(`/api/v1/portfolio/slug/${slug}`);
  }

  async createPortfolio(data: any) {
    return this.request<any>("/api/v1/portfolio/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id: string, data: any) {
    return this.request<any>(`/api/v1/portfolio/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id: string) {
    return this.request<void>(`/api/v1/portfolio/${id}`, {
      method: "DELETE",
    });
  }

  // Articles
  async getArticles() {
    return this.request<any[]>("/api/v1/articles/");
  }

  async addArticle(url: string) {
    return this.request<any>("/api/v1/articles/", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  }

  async updateArticleProgress(id: string, progress: number) {
    return this.request<any>(`/api/v1/articles/${id}/progress`, {
      method: "PUT",
      body: JSON.stringify({ progress }),
    });
  }

  async deleteArticle(id: string) {
    return this.request<void>(`/api/v1/articles/${id}`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string }>("/health");
  }
}

export const api = new ApiClient(API_BASE);
