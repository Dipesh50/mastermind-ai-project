package com.cfs.mastermind_ai.controller;

import com.cfs.mastermind_ai.service.IndexService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/index")
@CrossOrigin("*")
public class IndexController {
    private final IndexService indexService;

    public IndexController(IndexService indexService) {
        this.indexService = indexService;
    }

    @GetMapping("/nifty50")
    public String nifty50() {
        return indexService.getNifty50();
    }

    @GetMapping("/sensex")
    public String sensex() {
        return indexService.getSensex();
    }

    @GetMapping("/banknifty")
    public String bankNifty(){
        return indexService.getBankNifty();
    }

    @GetMapping("/finnifty")
    public String finNifty() {
        return indexService.getFinNifty();
    }

    @GetMapping("/live")
    public String getLiveIndex(@RequestParam String symbol) {
        return indexService.getIndexQuotes(symbol);
    }
}
