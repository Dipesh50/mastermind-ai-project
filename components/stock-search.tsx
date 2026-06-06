"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface StockData {
  symbol: string;
  rawData: string;
}

const POPULAR_STOCKS = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "SBIN"];

export function StockSearch() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStock = async (stockSymbol: string) => {
    if (!stockSymbol.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.getStockPrice(stockSymbol.toUpperCase());
      setStockData({
        symbol: stockSymbol.toUpperCase(),
        rawData: data,
      });
    } catch {
      setError("Unable to fetch stock data. Please ensure the backend is running.");
      setStockData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStock(symbol);
  };

  const parseStockInfo = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      return {
        price: parsed.price || parsed.lastPrice || "—",
        change: parsed.change || parsed.priceChange || 0,
        changePercent: parsed.changePercent || parsed.pChange || 0,
        high: parsed.dayHigh || parsed.high || "—",
        low: parsed.dayLow || parsed.low || "—",
        volume: parsed.volume || parsed.totalTradedVolume || "—",
      };
    } catch {
      return null;
    }
  };

  const stockInfo = stockData ? parseStockInfo(stockData.rawData) : null;
  const isPositive = stockInfo ? stockInfo.change >= 0 : true;

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Stock Lookup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., TCS)"
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !symbol.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Popular:</span>
          {POPULAR_STOCKS.map((stock) => (
            <button
              key={stock}
              onClick={() => {
                setSymbol(stock);
                fetchStock(stock);
              }}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
            >
              {stock}
            </button>
          ))}
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}

        {stockInfo && stockData && (
          <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{stockData.symbol}</h3>
                <p className="text-xs text-muted-foreground">NSE</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
                  isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(stockInfo.changePercent).toFixed(2)}%
              </div>
            </div>

            <div>
              <span className="text-3xl font-bold tabular-nums">
                {typeof stockInfo.price === "number"
                  ? `₹${stockInfo.price.toLocaleString("en-IN")}`
                  : stockInfo.price}
              </span>
              <span
                className={cn(
                  "ml-2 text-sm font-medium",
                  isPositive ? "text-primary" : "text-destructive"
                )}
              >
                {isPositive ? "+" : ""}
                {stockInfo.change}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Day High</p>
                <p className="font-medium tabular-nums">{stockInfo.high}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Day Low</p>
                <p className="font-medium tabular-nums">{stockInfo.low}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-medium tabular-nums">
                  {typeof stockInfo.volume === "number"
                    ? stockInfo.volume.toLocaleString("en-IN")
                    : stockInfo.volume}
                </p>
              </div>
            </div>
          </div>
        )}

        {!stockInfo && !error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Search className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Search for a stock symbol to view real-time data
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
