"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, RefreshCw, Loader2, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";

interface NewsItem {
  title: string;
  description?: string;
  url?: string;
  source?: string;
  publishedAt?: string;
}

export function MarketNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [rawNews, setRawNews] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const data = await api.getMarketNews();
      setRawNews(data);

      // Try to parse the news data
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setNews(parsed);
        } else if (parsed.articles && Array.isArray(parsed.articles)) {
          setNews(parsed.articles);
        } else if (parsed.news && Array.isArray(parsed.news)) {
          setNews(parsed.news);
        }
      } catch {
        // If not JSON, we'll display raw text
        setNews([]);
      }
    } catch {
      setRawNews("Unable to fetch market news. Please ensure the backend server is running.");
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            Market News
          </CardTitle>
          <Button variant="outline" size="sm" onClick={fetchNews} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading market news...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.slice(0, 5).map((item, index) => (
              <article
                key={index}
                className="group rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:border-primary/50"
              >
                <h3 className="font-medium leading-tight">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.source || "Market News"}</span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      Read more
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {rawNews}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
