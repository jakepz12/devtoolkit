const API_BASE = "/api";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || error.error || `API error: ${response.status}`);
    }

    return response.json();
  }

  // Auth (Supabase handles this)
  async register(data: { email: string; username: string; password: string }) {
    return this.request("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ access_token: string; user: any }>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Portfolio
  async getPortfolios() {
    return this.request<any[]>("/v1/portfolio");
  }

  async getPortfolioBySlug(slug: string) {
    return this.request<any>(`/v1/portfolio/slug/${slug}`);
  }

  async createPortfolio(data: any) {
    return this.request<any>("/v1/portfolio", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id: string, data: any) {
    return this.request<any>(`/v1/portfolio/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id: string) {
    return this.request<void>(`/v1/portfolio/${id}`, {
      method: "DELETE",
    });
  }

  // Articles
  async getArticles() {
    return this.request<any[]>("/v1/articles");
  }

  async addArticle(url: string) {
    return this.request<any>("/v1/articles", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  }

  async updateArticleProgress(id: string, progress: number) {
    return this.request<any>(`/v1/articles/${id}/progress`, {
      method: "PUT",
      body: JSON.stringify({ progress }),
    });
  }

  async deleteArticle(id: string) {
    return this.request<void>(`/v1/articles/${id}`, {
      method: "DELETE",
    });
  }

  // Tags
  async getTags() {
    return this.request<any[]>("/v1/tags");
  }

  async createTag(name: string, color: string) {
    return this.request<any>("/v1/tags", {
      method: "POST",
      body: JSON.stringify({ name, color }),
    });
  }

  async deleteTag(id: string) {
    return this.request<void>(`/v1/tags/${id}`, {
      method: "DELETE",
    });
  }

  // Folders
  async getFolders() {
    return this.request<any[]>("/v1/folders");
  }

  async createFolder(name: string) {
    return this.request<any>("/v1/folders", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  async deleteFolder(id: string) {
    return this.request<void>(`/v1/folders/${id}`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string }>("/health");
  }
}

export const api = new ApiClient(API_BASE);
