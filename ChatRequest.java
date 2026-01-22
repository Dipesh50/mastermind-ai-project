package com.cfs.mastermind_ai.model;


import lombok.Data;

@Data
public class ChatRequest {
    private String question;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
