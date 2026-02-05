"use client";

import { Brain, TrendingUp } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">Mastermind AI</span>
            <span className="text-xs text-muted-foreground">Stock Market Advisor</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#dashboard"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            <span className="text-xs font-medium text-primary">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
