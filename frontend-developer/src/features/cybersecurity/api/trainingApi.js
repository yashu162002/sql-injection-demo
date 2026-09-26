import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const trainingApi = axios.create({
    baseURL: `${API_URL}/api/training`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const submitTrainingLogin = (username, password) => {
    return trainingApi.post("/login", {
        username,
        password,
    });
};

export const getTrainingSubmissions = () => {
    return trainingApi.get("/submissions");
};

export const clearTrainingSubmissions = () => {
    return trainingApi.delete("/submissions");
};