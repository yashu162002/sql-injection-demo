import axios from "axios";

const trainingApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/training`,
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