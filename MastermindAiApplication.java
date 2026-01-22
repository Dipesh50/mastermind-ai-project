package com.cfs.mastermind_ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MastermindAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MastermindAiApplication.class, args);
	}

}
