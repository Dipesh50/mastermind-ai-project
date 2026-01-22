package com.cfs.mastermind_ai.controller;


import com.cfs.mastermind_ai.service.DailySummaryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/market/daily")
@CrossOrigin("*")
public class DailySummaryController {

    private final DailySummaryService dailySummaryService;

    public DailySummaryController(DailySummaryService dailySummaryService) {
        this.dailySummaryService = dailySummaryService;
    }

    @GetMapping("/summary")
    public String todaySummary() {
        return dailySummaryService.getLastSummary();
    }
}
