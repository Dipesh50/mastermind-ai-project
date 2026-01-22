package com.cfs.mastermind_ai.schedular;

import com.cfs.mastermind_ai.service.DailySummaryService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DailyMarketScheduler {
    private final DailySummaryService dailySummaryService;

    public DailyMarketScheduler(DailySummaryService dailySummaryService) {
        this.dailySummaryService = dailySummaryService;
    }

    @Scheduled(cron = "0 0 9 * * ?", zone = "Asia/Kolkata")
    public void runDailySummary() {
        dailySummaryService.generateDailySummary();
        System.out.println("✅ Daily market summary generated");
    }
}
