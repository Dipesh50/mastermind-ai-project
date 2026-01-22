package com.cfs.mastermind_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.SplittableRandom;

@Service
public class MarketService {

    @Value("${alphavantage.api.key}")
    private String apikey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getStockPrice(String symbol){

        String url = "https://www.alphavantage.co/query" +
                "?function=GLOBAL_QUOTE" +
                "&symbol=" + symbol +
                "&apikey=" + apikey;

        return restTemplate.getForObject(url, String.class);
    }


}
