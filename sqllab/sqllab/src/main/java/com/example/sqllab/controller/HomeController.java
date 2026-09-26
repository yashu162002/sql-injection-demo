package com.example.sqllab.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ONLINE");
        response.put("service", "SQL Injection Training Lab API");
        response.put("version", "1.0.0");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("vulnerable_login", "POST /api/login/vulnerable");
        endpoints.put("secure_login", "POST /api/login/secure");
        endpoints.put("training_login", "POST /api/training/login");
        endpoints.put("submissions_get", "GET /api/training/submissions");
        endpoints.put("submissions_clear", "DELETE /api/training/submissions");

        response.put("endpoints", endpoints);
        return ResponseEntity.ok(response);
    }
}
