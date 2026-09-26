package com.example.sqllab.controller;

import com.example.sqllab.dto.LoginRequest;
import com.example.sqllab.service.LoginService;
import com.example.sqllab.service.TrainingSubmissionStore;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"})
public class LoginController {

    private final LoginService loginService;
    private final TrainingSubmissionStore submissionStore;

    public LoginController(LoginService loginService, TrainingSubmissionStore submissionStore) {
        this.loginService = loginService;
        this.submissionStore = submissionStore;
    }

    /**
     * Helper method to print received credentials to console for HTTP request flow inspection.
     * Where Spring Boot receives them: Spring MVC binds incoming JSON payload to LoginRequest DTO.
     */
    private void logLoginRequest(String mode, String username, String password) {
        System.out.println("========================================");
        System.out.println("USER LOGIN REQUEST (" + mode.toUpperCase() + ")");
        System.out.println("Username: " + (username != null ? username : ""));
        System.out.println("Password: " + (password != null ? password : ""));
        System.out.println("========================================");
    }

    /**
     * Helper method to build a masked password for development verification.
     */
    private String maskPassword(String password) {
        if (password == null || password.isEmpty()) {
            return "";
        }
        if (password.length() <= 2) {
            return "*".repeat(password.length());
        }
        return password.charAt(0) + "*".repeat(password.length() - 2) + password.charAt(password.length() - 1);
    }

    @PostMapping("/vulnerable")
    public Map<String, Object> vulnerableLogin(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Step 3 & 4: Capture submitted parameters & print to console
        logLoginRequest("Vulnerable", username, password);

        // Process request via vulnerable query concatenation
        List<Map<String, Object>> users = loginService.vulnerableLogin(username, password);

        String status = users.isEmpty() ? "VULNERABLE (FAILED)" : "VULNERABLE (EXPLOITED - " + users.size() + " USERS FOUND)";
        submissionStore.addSubmission(username, password, status);

        // Step 5: Return development response containing submitted username & masked password
        Map<String, Object> response = new HashMap<>();
        response.put("status", users.isEmpty() ? "FAILED" : "SUCCESS");
        response.put("submittedUsername", username);
        response.put("maskedPassword", maskPassword(password));
        response.put("usersFound", users.size());
        response.put("data", users);
        return response;
    }

    @PostMapping("/secure")
    public Map<String, Object> secureLogin(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Step 3 & 4: Capture submitted parameters & print to console
        logLoginRequest("Secure", username, password);

        // Process request via secure parameterized query
        List<Map<String, Object>> users = loginService.secureLogin(username, password);

        String status = users.isEmpty() ? "SECURE (FAILED)" : "SECURE (SUCCESS)";
        submissionStore.addSubmission(username, password, status);

        // Step 5: Return development response containing submitted username & masked password
        Map<String, Object> response = new HashMap<>();
        response.put("status", users.isEmpty() ? "FAILED" : "SUCCESS");
        response.put("submittedUsername", username);
        response.put("maskedPassword", maskPassword(password));
        response.put("usersFound", users.size());
        response.put("data", users);
        return response;
    }
}