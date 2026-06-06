"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndexCardProps {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  isLoading?: boolean;
}

export function IndexCard({
  name,
  value,
  change,
  changePercent,
  isPositive,
  isLoading,
}: IndexCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-20 rounded bg-muted"></div>
            <div className="h-8 w-32 rounded bg-muted"></div>
            <div className="h-4 w-24 rounded bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card transition-all hover:border-primary/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{name}</span>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {changePercent}
          </div>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tabular-nums">{value}</span>
        </div>
        <div className="mt-1">
          <span
            className={cn("text-sm font-medium", isPositive ? "text-primary" : "text-destructive")}
          >
            {isPositive ? "+" : ""}
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
