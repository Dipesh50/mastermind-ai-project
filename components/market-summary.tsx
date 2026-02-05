"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw, Loader2, Calendar } from "lucide-react";
import { api } from "@/lib/api";

export function MarketSummary() {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTodaySummary();
      setSummary(data);
      setLastFetched(new Date());
    } catch {
      setSummary(
        "Unable to fetch daily market summary. Please ensure the backend server is running and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const formatDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Daily Market Summary
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchSummary} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate()}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading market summary...</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {summary}
            </div>
            {lastFetched && (
              <p className="mt-4 text-xs text-muted-foreground">
                Last updated: {lastFetched.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
