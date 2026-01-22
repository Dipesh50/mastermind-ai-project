package com.cfs.mastermind_ai.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {
    @Value("${newsapi.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getMarketNews() {

        String url = "https://newsapi.org/v2/everything" +
                "?q=stock market OR sensex OR nifty OR finance" +
                "&language=en" +
                "&sortBy=publishedAt" +
                "&pageSize=5" +
                "&apiKey=" + apiKey;

        return restTemplate.getForObject(url, String.class);
    }
}
