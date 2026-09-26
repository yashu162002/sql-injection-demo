package com.example.sqllab.controller;

import com.example.sqllab.model.TrainingSubmission;
import com.example.sqllab.service.TrainingSubmissionStore;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/training")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"})
public class TrainingController {

    private final TrainingSubmissionStore submissionStore;

    public TrainingController(TrainingSubmissionStore submissionStore) {
        this.submissionStore = submissionStore;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> trainingLogin(
            @RequestBody Map<String, String> request) {

        String username = request.getOrDefault("username", "");
        String password = request.getOrDefault("password", "");

        submissionStore.addSubmission(username, password, "SIMULATED NETWORK ERROR");

        Map<String, Object> response = new HashMap<>();

        response.put("success", false);
        response.put("message", "Network Error");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/submissions")
    public List<TrainingSubmission> getSubmissions() {
        return submissionStore.getSubmissions();
    }

    @DeleteMapping("/submissions")
    public ResponseEntity<Map<String, Object>> clearSubmissionsDelete() {
        submissionStore.clearSubmissions();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "All stored data cleared successfully");
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/clear", method = {RequestMethod.DELETE, RequestMethod.POST})
    public ResponseEntity<Map<String, Object>> clearSubmissions() {
        submissionStore.clearSubmissions();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "All stored data cleared successfully");
        return ResponseEntity.ok(response);
    }
}

