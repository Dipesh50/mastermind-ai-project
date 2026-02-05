const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = {
  // Chat API
  async askQuestion(question: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/chat/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) throw new Error("Failed to get response");
    return response.text();
  },

  // Market Data API
  async getStockPrice(symbol: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/market/stock/${symbol}`);
    if (!response.ok) throw new Error("Failed to fetch stock price");
    return response.text();
  },

  // Index APIs
  async getNifty50(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/index/nifty50`);
    if (!response.ok) throw new Error("Failed to fetch NIFTY 50");
    return response.text();
  },

  async getSensex(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/index/sensex`);
    if (!response.ok) throw new Error("Failed to fetch Sensex");
    return response.text();
  },

  async getBankNifty(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/index/banknifty`);
    if (!response.ok) throw new Error("Failed to fetch Bank Nifty");
    return response.text();
  },

  async getFinNifty(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/index/finnifty`);
    if (!response.ok) throw new Error("Failed to fetch Fin Nifty");
    return response.text();
  },

  async getLiveIndex(symbol: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/index/live?symbol=${encodeURIComponent(symbol)}`);
    if (!response.ok) throw new Error("Failed to fetch live index");
    return response.text();
  },

  // News APIs
  async getMarketNews(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/news/market`);
    if (!response.ok) throw new Error("Failed to fetch market news");
    return response.text();
  },

  async getDailyMarketSummary(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/market/news/summary`);
    if (!response.ok) throw new Error("Failed to fetch market summary");
    return response.text();
  },

  // Daily Summary API
  async getTodaySummary(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/market/daily/summary`);
    if (!response.ok) throw new Error("Failed to fetch today's summary");
    return response.text();
  },
};
