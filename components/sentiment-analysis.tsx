"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, RefreshCw, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

type Sentiment = "bullish" | "bearish" | "neutral";

export function SentimentAnalysis() {
  const [analysis, setAnalysis] = useState<string>("");
  const [sentiment, setSentiment] = useState<Sentiment>("neutral");
  const [isLoading, setIsLoading] = useState(true);

  const fetchSentiment = async () => {
    setIsLoading(true);
    try {
      const data = await api.getDailyMarketSummary();
      setAnalysis(data);

      // Detect sentiment from the response
      const lowerData = data.toLowerCase();
      if (
        lowerData.includes("bullish") ||
        lowerData.includes("positive") ||
        lowerData.includes("uptrend")
      ) {
        setSentiment("bullish");
      } else if (
        lowerData.includes("bearish") ||
        lowerData.includes("negative") ||
        lowerData.includes("downtrend")
      ) {
        setSentiment("bearish");
      } else {
        setSentiment("neutral");
      }
    } catch {
      setAnalysis(
        "Unable to analyze market sentiment. Please ensure the backend server is running."
      );
      setSentiment("neutral");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSentiment();
  }, []);

  const sentimentConfig = {
    bullish: {
      icon: TrendingUp,
      label: "Bullish",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    bearish: {
      icon: TrendingDown,
      label: "Bearish",
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    neutral: {
      icon: Minus,
      label: "Neutral",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  };

  const config = sentimentConfig[sentiment];
  const SentimentIcon = config.icon;

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Market Sentiment
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchSentiment} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Analyzing market sentiment...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={cn(
                  "flex items-center gap-3 rounded-full px-6 py-3",
                  config.bg
                )}
              >
                <SentimentIcon className={cn("h-6 w-6", config.color)} />
                <span className={cn("text-xl font-semibold", config.color)}>{config.label}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="mb-2 font-medium">Analysis</h4>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {analysis}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(["bullish", "neutral", "bearish"] as const).map((s) => {
                const sConfig = sentimentConfig[s];
                const Icon = sConfig.icon;
                return (
                  <div
                    key={s}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors",
                      sentiment === s
                        ? `border-2 ${sConfig.bg}`
                        : "border-border bg-muted/20"
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5", sentiment === s ? sConfig.color : "text-muted-foreground")}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium capitalize",
                        sentiment === s ? sConfig.color : "text-muted-foreground"
                      )}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
