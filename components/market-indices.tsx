"use client";

import { useEffect, useState } from "react";
import { IndexCard } from "./index-card";
import { api } from "@/lib/api";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IndexData {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

function parseIndexData(name: string, rawData: string): IndexData {
  // Default fallback for demo/error scenarios
  const defaultData: IndexData = {
    name,
    value: "—",
    change: "0.00",
    changePercent: "0.00%",
    isPositive: true,
  };

  try {
    // Attempt to parse JSON if the response is JSON
    const data = JSON.parse(rawData);
    const value = data.price || data.value || data.lastPrice || "—";
    const change = data.change || data.priceChange || "0.00";
    const changeNum = parseFloat(change);

    return {
      name,
      value: typeof value === "number" ? value.toLocaleString("en-IN") : value,
      change: Math.abs(changeNum).toFixed(2),
      changePercent: `${Math.abs(data.changePercent || data.pChange || 0).toFixed(2)}%`,
      isPositive: changeNum >= 0,
    };
  } catch {
    // If not JSON, try to extract numbers from the string
    const numbers = rawData.match(/[\d,]+\.?\d*/g);
    if (numbers && numbers.length > 0) {
      return {
        ...defaultData,
        value: numbers[0],
      };
    }
    return defaultData;
  }
}

export function MarketIndices() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchIndices = async () => {
    setIsLoading(true);
    try {
      const [nifty50, sensex, bankNifty, finNifty] = await Promise.all([
        api.getNifty50().catch(() => "{}"),
        api.getSensex().catch(() => "{}"),
        api.getBankNifty().catch(() => "{}"),
        api.getFinNifty().catch(() => "{}"),
      ]);

      setIndices([
        parseIndexData("NIFTY 50", nifty50),
        parseIndexData("SENSEX", sensex),
        parseIndexData("BANK NIFTY", bankNifty),
        parseIndexData("FIN NIFTY", finNifty),
      ]);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch indices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Market Indices</h2>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={fetchIndices} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && indices.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <IndexCard
                key={i}
                name=""
                value=""
                change=""
                changePercent=""
                isPositive={true}
                isLoading={true}
              />
            ))
          : indices.map((index) => (
              <IndexCard
                key={index.name}
                name={index.name}
                value={index.value}
                change={index.change}
                changePercent={index.changePercent}
                isPositive={index.isPositive}
              />
            ))}
      </div>
    </section>
  );
}
