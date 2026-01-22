package com.cfs.mastermind_ai.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }
    public String getStockAnswer(String userQuestion) {


        String prompt= """
               You are a professional Indian stock market analyst.
                
               Analyze the following REAL stock data and give advice
               ONLY based on this data.
                STOCK DATA:
                %s
                
                Rules:
                - Mention current price
                - Mention trend (Bullish / Bearish / Sideways)
                - Give short-term outlook
                - Give risk warning
                - DO NOT hallucinate numbers
                - DO NOT give guaranteed returns
                
                Answer in simple language.
                """.formatted(userQuestion);

        return chatClient.prompt(prompt).call().content();
    }
}
