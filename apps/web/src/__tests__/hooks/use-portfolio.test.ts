import { renderHook, waitFor } from "@testing-library/react";
import { usePortfolios } from "@/hooks/use-portfolio";
import { api } from "@/lib/api";

vi.mock("@/lib/api");

describe("usePortfolios", () => {
  it("fetches portfolios on mount", async () => {
    const mockPortfolios = [
      { id: "1", title: "Portfolio 1" },
      { id: "2", title: "Portfolio 2" },
    ];
    (api.getPortfolios as any).mockResolvedValueOnce(mockPortfolios);

    const { result } = renderHook(() => usePortfolios());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.portfolios).toEqual(mockPortfolios);
    expect(result.current.error).toBeNull();
  });

  it("handles errors", async () => {
    (api.getPortfolios as any).mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => usePortfolios());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("API error");
    expect(result.current.portfolios).toEqual([]);
  });
});
