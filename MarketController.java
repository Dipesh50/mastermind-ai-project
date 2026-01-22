package com.cfs.mastermind_ai.controller;


import com.cfs.mastermind_ai.service.MarketService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/market")
@CrossOrigin("*")
public class MarketController {
    private final MarketService marketService;

    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @GetMapping("/stock/{symbol}")
    public String getStock(@PathVariable String symbol){
        return marketService.getStockPrice(symbol);
    }
}
