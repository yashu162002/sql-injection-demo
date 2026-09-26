package com.example.sqllab.model;

import java.time.LocalDateTime;

public class TrainingSubmission {

    private String time;
    private String username;
    private String password;
    private String status;

    public TrainingSubmission() {
    }

    public TrainingSubmission(
            String time,
            String username,
            String password,
            String status) {

        this.time = time;
        this.username = username;
        this.password = password;
        this.status = status;
    }

    public TrainingSubmission(
            LocalDateTime time,
            String username,
            String password,
            String status) {

        this(time != null ? time.toString() : LocalDateTime.now().toString(), username, password, status);
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


