package com.cfs.mastermind_ai.controller;


import com.cfs.mastermind_ai.service.MarketSentimentService;
import com.cfs.mastermind_ai.service.NewsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/market/news")
@CrossOrigin("*")
public class MarketNewsController {

    private final NewsService newsService;
    private final MarketSentimentService sentimentService;

    public MarketNewsController(NewsService newsService, MarketSentimentService sentimentService) {
        this.newsService = newsService;
        this.sentimentService = sentimentService;
    }

    @GetMapping("/summary")
    public String getDailyMarketSummary() {

        String news = newsService.getMarketNews();
        return sentimentService.analyzeMarket(news);

    }
}
