import { Header } from "@/components/header";
import { MarketIndices } from "@/components/market-indices";
import { ChatInterface } from "@/components/chat-interface";
import { StockSearch } from "@/components/stock-search";
import { MarketSummary } from "@/components/market-summary";
import { MarketNews } from "@/components/market-news";
import { SentimentAnalysis } from "@/components/sentiment-analysis";
import { Brain, TrendingUp, Newspaper, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Live Market Data</span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your AI-Powered
              <span className="text-primary"> Stock Market</span> Advisor
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Get real-time market data, AI-driven stock analysis, sentiment insights, and
              personalized investment advice for the Indian stock market.
            </p>
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: TrendingUp, label: "Live Indices", desc: "Real-time market data" },
            { icon: Brain, label: "AI Analysis", desc: "Intelligent insights" },
            { icon: Newspaper, label: "Market News", desc: "Latest updates" },
            { icon: BarChart3, label: "Sentiment", desc: "Market mood tracking" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/50"
            >
              <feature.icon className="h-6 w-6 text-primary" />
              <span className="font-medium">{feature.label}</span>
              <span className="text-xs text-muted-foreground">{feature.desc}</span>
            </div>
          ))}
        </section>

        {/* Market Indices */}
        <section id="dashboard" className="mb-8">
          <MarketIndices />
        </section>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <ChatInterface />
            <StockSearch />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <SentimentAnalysis />
            <MarketSummary />
            <MarketNews />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-semibold">Mastermind AI</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            AI-powered stock market advisory system for Indian markets
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Disclaimer: This is for informational purposes only. Not financial advice.
          </p>
        </footer>
      </main>
    </div>
  );
}
