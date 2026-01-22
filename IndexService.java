package com.cfs.mastermind_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class IndexService {

    @Value("${rapidapi.key}")
    private String apiKey;

    @Value("${rapidapi.host}")
    private String apiHost;

    private final RestTemplate restTemplate = new RestTemplate();

    // Generic method (used internally)
    public String getIndexQuotes(String symbol) {

        try {
            String url = "https://" + apiHost +
                    "/market/get-quotes?symbols=" + symbol +
                    "&region=IN";

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", apiKey);
            headers.set("X-RapidAPI-Host", apiHost);

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();

        } catch (Exception e) {
            return "{ \"error\": \"Failed to fetch data for symbol: " + symbol + "\" }";
        }
    }

    // ✅ NIFTY 50
    public String getNifty50() {
        return getIndexQuotes("^NSEI");
    }

    // ✅ SENSEX
    public String getSensex() {
        return getIndexQuotes("^BSESN");
    }

    // ✅ BANK NIFTY
    public String getBankNifty(){
        return getIndexQuotes("^NSEBANK");
    }

    // ✅ NIFTY MIDCAP 50
    public String getFinNifty(){
        return getIndexQuotes("^NSEFIN");
    }
}
















//    public IndexService(MarketService marketService) {
//        this.marketService = marketService;
//    }
//
//    public String getNifty50() {
//        return marketService.getStockPrice("^NSEI");
//    }
//
//    public String getSensex() {
//        return marketService.getStockPrice("^BSESN");
//    }
//}
