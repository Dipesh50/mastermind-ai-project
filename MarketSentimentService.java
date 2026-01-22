package com.cfs.mastermind_ai.service;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class MarketSentimentService {
    private final ChatClient chatClient;

    public MarketSentimentService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String analyzeMarket(String newsJson) {

        String prompt = """
        You are a stock market analyst.

        Based on the following news, decide:
        1. Is the overall market sentiment UP or DOWN today?
        2. Give a short reason in simple words.

        News Data:
        %s
        """.formatted(newsJson);

        return chatClient.prompt(prompt).call().content();
    }
}
