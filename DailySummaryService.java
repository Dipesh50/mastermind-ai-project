package com.cfs.mastermind_ai.service;

import jakarta.annotation.PostConstruct;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class DailySummaryService {

    private final ChatClient chatClient;
    private final IndexService indexService;
    private final NewsService newsService;

    private String lastSummary = "Daily summary not generated yet.";

    // Constructor injection (REQUIRED)
    public DailySummaryService(ChatClient chatClient,
                               IndexService indexService,
                               NewsService newsService) {
        this.chatClient = chatClient;
        this.indexService = indexService;
        this.newsService = newsService;
    }

    // Runs once when application starts
    @PostConstruct
    public void init() {
        generateDailySummary();
    }

    // Called by scheduler + startup
    public void generateDailySummary() {

        String nifty = indexService.getNifty50();
        String sensex = indexService.getSensex();
        String news = newsService.getMarketNews();

        String prompt = """
        You are a stock market analyst.

        Create a DAILY MARKET SUMMARY for beginners.
        Keep it short and simple.

        Include:
        - Market mood (UP / DOWN / SIDEWAYS)
        - Mention NIFTY & SENSEX
        - Key reason from news
        - Risk note

        NIFTY DATA:
        %s

        SENSEX DATA:
        %s

        MARKET NEWS:
        %s
        """.formatted(nifty, sensex, news);

        lastSummary = chatClient.prompt(prompt).call().content();
    }

    public String getLastSummary() {
        return lastSummary;
    }
}
