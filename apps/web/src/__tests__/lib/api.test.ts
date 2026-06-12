import { api } from "@/lib/api";

// Mock fetch
global.fetch = vi.fn();

describe("API Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("makes GET request", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await api.getPortfolios();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/portfolio/"),
      expect.objectContaining({ method: "GET" })
    );
  });

  it("makes POST request", async () => {
    const mockData = { id: 1, name: "Created" };
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await api.createPortfolio({ name: "Test" });
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/portfolio/"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("throws error on failed request", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ detail: "Not found" }),
    });

    await expect(api.getPortfolios()).rejects.toThrow("Not found");
  });

  it("includes auth token in requests", async () => {
    localStorage.setItem("token", "test-token");
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await api.getPortfolios();
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test-token",
        }),
      })
    );
  });
});
