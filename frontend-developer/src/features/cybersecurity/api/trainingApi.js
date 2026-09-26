import axios from "axios";

const trainingApi = axios.create({
    baseURL: "http://localhost:8080/api/training",
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

