import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Shield,
    LockKeyhole,
    User,
    LoaderCircle,
    WifiOff,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import {
    submitTrainingLogin,
} from "../api/trainingApi";

import "../styles/cybersecurity.css";

function TrainingLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username.trim() || !password) {
            setMessage("Please enter both User ID and Password.");
            return;
        }

        setLoading(true);
        setSubmitted(false);
        setMessage("");

        try {
            await submitTrainingLogin(username, password);

            setSubmitted(true);
            setMessage("Network Error: Unable to connect to server");
        } catch (error) {
            setSubmitted(true);
            setMessage("Network Error: Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cyber-page">

            <div className="cyber-background-grid" />

            <div className="cyber-container">

                <div className="cyber-quick-banner">
                    <div>
                        <strong>Simulated Auth Training</strong> — Test credential flows
                    </div>
                    <Link to="/" className="cyber-quick-link">
                        SQL Injection Lab <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="cyber-brand">
                    <div className="cyber-brand-icon">
                        <Shield size={26} />
                    </div>

                    <div>
                        <h1>Secure Access</h1>
                        <p>Cybersecurity Training Simulation</p>
                    </div>
                </div>

                <div className="cyber-card">

                    <div className="cyber-card-header">
                        <div className="cyber-status">
                            <span className="status-dot" />
                            LOCAL TRAINING ENVIRONMENT
                        </div>

                        <h2>Sign in</h2>

                        <p>
                            Enter dummy credentials to simulate an
                            authentication request.
                        </p>
                    </div>

                    <form
                        className="cyber-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="cyber-field">

                            <label htmlFor="username">
                                User ID
                            </label>

                            <div className="cyber-input-wrapper">

                                <User size={18} />

                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Enter training User ID"
                                    autoComplete="off"
                                />

                            </div>
                        </div>

                        <div className="cyber-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="cyber-input-wrapper">

                                <LockKeyhole size={18} />

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter training password"
                                    autoComplete="off"
                                />

                            </div>
                        </div>

                        <button
                            type="submit"
                            className="cyber-login-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <LoaderCircle
                                        className="spin"
                                        size={19}
                                    />

                                    Sending request...
                                </>
                            ) : (
                                <>
                                    <Shield size={19} />

                                    Login
                                </>
                            )}

                        </button>

                    </form>

                    {submitted && (
                        <div className="network-error">

                            <div className="network-error-icon">
                                <WifiOff size={24} />
                            </div>

                            <div>
                                <strong>
                                    Network Error
                                </strong>

                                <p>
                                    Unable to connect to server
                                </p>
                            </div>

                        </div>
                    )}

                    {!submitted && message && (
                        <div className="validation-message">
                            {message}
                        </div>
                    )}

                    <div className="training-notice">
                        <CheckCircle2 size={17} />

                        <span>
                            Local cybersecurity training only.
                            Use dummy credentials.
                        </span>
                    </div>

                </div>

                <div className="flow-panel">

                    <div className="flow-title">
                        REQUEST FLOW
                    </div>

                    <div className="flow">

                        <div className="flow-node">
                            USER
                        </div>

                        <span>↓</span>

                        <div className="flow-node">
                            React Login Form
                        </div>

                        <span>↓</span>

                        <div className="flow-node">
                            Axios POST
                        </div>

                        <span>↓</span>

                        <div className="flow-node">
                            Spring Boot
                        </div>

                        <span>↓</span>

                        <div className="flow-node">
                            Training Submission Store
                        </div>

                        <span>↓</span>

                        <div className="flow-node error-node">
                            Simulated Network Error
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default TrainingLogin;
