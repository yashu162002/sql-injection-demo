package com.example.sqllab.service;

import com.example.sqllab.model.TrainingSubmission;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class TrainingSubmissionStore {

    private final List<TrainingSubmission> submissions =
            Collections.synchronizedList(new ArrayList<>());

    private final File storageFile = new File("training_submissions.json");
    private final ObjectMapper objectMapper;

    public TrainingSubmissionStore() {
        this.objectMapper = new ObjectMapper();
        loadFromFile();
    }

    private void loadFromFile() {
        try {
            if (storageFile.exists() && storageFile.length() > 0) {
                TrainingSubmission[] loaded = objectMapper.readValue(
                        storageFile,
                        TrainingSubmission[].class
                );
                synchronized (submissions) {
                    submissions.clear();
                    if (loaded != null) {
                        submissions.addAll(Arrays.asList(loaded));
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error loading training submissions from file: " + e.getMessage());
        }
    }


    private synchronized void saveToFile() {
        try {
            List<TrainingSubmission> copy = getSubmissions();
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(storageFile, copy);
        } catch (Exception e) {
            System.err.println("Error saving training submissions to file: " + e.getMessage());
        }
    }

    public void addSubmission(String username, String password) {
        addSubmission(username, password, "SIMULATED NETWORK ERROR");
    }

    public void addSubmission(String username, String password, String status) {
        TrainingSubmission submission = new TrainingSubmission(
                LocalDateTime.now(),
                username,
                password,
                status
        );

        submissions.add(submission);
        saveToFile();
    }

    public List<TrainingSubmission> getSubmissions() {
        synchronized (submissions) {
            return new ArrayList<>(submissions);
        }
    }

    public void clearSubmissions() {
        synchronized (submissions) {
            submissions.clear();
        }
        if (storageFile.exists()) {
            try {
                boolean deleted = storageFile.delete();
                if (!deleted) {
                    saveToFile();
                }
            } catch (Exception e) {
                System.err.println("Error deleting submission storage file: " + e.getMessage());
                saveToFile();
            }
        } else {
            saveToFile();
        }
    }
}

