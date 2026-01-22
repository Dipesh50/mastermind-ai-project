package com.cfs.mastermind_ai.controller;


import com.cfs.mastermind_ai.service.ChatService;
import org.springframework.web.bind.annotation.*;
import com.cfs.mastermind_ai.model.ChatRequest;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/ask")
    public String ask(@RequestBody ChatRequest request) {
        return chatService.getStockAnswer(request.getQuestion());
    }

}