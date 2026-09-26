import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Terminal,
    RefreshCw,
    ShieldCheck,
    Database,
    ArrowRight,
    Trash2,
    AlertTriangle,
    CheckCircle2,
    HardDrive,
} from "lucide-react";

import {
    getTrainingSubmissions,
    clearTrainingSubmissions,
} from "../api/trainingApi";

import "../styles/cybersecurity.css";

function DeveloperDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [clearing, setClearing] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const loadSubmissions = async () => {
        setLoading(true);
        try {
            const response = await getTrainingSubmissions();
            setSubmissions(response.data);
        } catch (error) {
            console.error(
                "Unable to load training submissions",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClearData = async () => {
        setClearing(true);
        try {
            await clearTrainingSubmissions();
            await loadSubmissions();
            setAlertMessage("All stored training submission data cleared successfully.");
            setShowClearConfirm(false);
            setTimeout(() => setAlertMessage(""), 4000);
        } catch (error) {
            console.error("Failed to clear data", error);
            alert("Failed to clear stored data. Please check backend status.");
        } finally {
            setClearing(false);
        }
    };

    useEffect(() => {
        loadSubmissions();
    }, []);

    return (
        <div className="developer-page">

            <div className="cyber-quick-banner" style={{ maxWidth: "1250px", margin: "0 auto 25px" }}>
                <div>
                    <strong>Developer Monitoring</strong> — View real-time training submissions
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <Link to="/" className="cyber-quick-link">
                        SQL Injection Lab <ArrowRight size={14} />
                    </Link>
                    <Link to="/training" className="cyber-quick-link">
                        Training Login <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {alertMessage && (
                <div className="action-alert">
                    <CheckCircle2 size={18} />
                    <span>{alertMessage}</span>
                </div>
            )}

            <div className="developer-header">

                <div className="developer-title">

                    <div className="developer-icon">
                        <Terminal size={25} />
                    </div>

                    <div>
                        <div className="developer-label">
                            DEVELOPER VIEW
                        </div>

                        <h1>
                            Training Submissions
                        </h1>

                        <p>
                            Permanent cybersecurity simulation log
                        </p>
                    </div>

                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <button
                        className="refresh-button"
                        onClick={loadSubmissions}
                        disabled={loading || clearing}
                    >
                        <RefreshCw
                            size={17}
                            className={loading ? "spin" : ""}
                        />
                        Refresh
                    </button>

                    <button
                        className="clear-button"
                        onClick={() => setShowClearConfirm(true)}
                        disabled={loading || clearing || submissions.length === 0}
                        title="Clear all stored submission data"
                    >
                        <Trash2 size={17} />
                        Clear Stored Data
                    </button>
                </div>

            </div>

            <div className="developer-warning">

                <ShieldCheck size={20} />

                <div>

                    <strong>
                        Developer Training Data — Permanent Storage Active
                    </strong>

                    <p>
                        User-entered data is saved permanently on disk. To delete submissions, use the "Clear Stored Data" option.
                    </p>

                </div>

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <Database size={20} />

                    <span>
                        Submissions Captured
                    </span>

                    <strong>
                        {submissions.length}
                    </strong>

                </div>

                <div className="stat-card">

                    <HardDrive size={20} style={{ color: "#38bdf8" }} />

                    <span>
                        Storage Mode
                    </span>

                    <strong style={{ color: "#38bdf8" }}>
                        PERMANENT (JSON + Memory)
                    </strong>

                </div>

            </div>

            <div className="submission-card">

                <div className="table-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div>
                        <h2>
                            Training Requests
                        </h2>

                        <p>
                            HTTP requests received by Spring Boot
                        </p>
                    </div>

                    {submissions.length > 0 && (
                        <button
                            className="clear-button"
                            onClick={() => setShowClearConfirm(true)}
                            disabled={clearing}
                            style={{ padding: "7px 12px", fontSize: "12px" }}
                        >
                            <Trash2 size={14} /> Clear All ({submissions.length})
                        </button>
                    )}

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Time</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {submissions.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="4"
                                        className="empty-state"
                                    >
                                        No training submissions stored yet.
                                    </td>
                                </tr>

                            ) : (

                                submissions
                                    .slice()
                                    .reverse()
                                    .map((submission, index) => (

                                        <tr key={index}>

                                            <td>
                                                {new Date(
                                                    submission.time
                                                ).toLocaleString()}
                                            </td>

                                            <td className="username-cell">
                                                {submission.username}
                                            </td>

                                            <td className="password-cell">
                                                {submission.password}
                                            </td>

                                            <td>
                                                <span className="status-badge">
                                                    {submission.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Clear Confirmation Modal */}
            {showClearConfirm && (
                <div className="confirm-modal-overlay">
                    <div className="confirm-modal">
                        <div className="confirm-modal-header">
                            <div className="confirm-modal-icon">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h3>Confirm Data Deletion</h3>
                            </div>
                        </div>

                        <p>
                            Are you sure you want to permanently clear all <strong>{submissions.length}</strong> stored submission(s)?
                            This will delete data from both memory and disk storage.
                        </p>

                        <div className="confirm-modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setShowClearConfirm(false)}
                                disabled={clearing}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-danger"
                                onClick={handleClearData}
                                disabled={clearing}
                            >
                                {clearing ? (
                                    <>
                                        <RefreshCw size={16} className="spin" />
                                        Clearing Data...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        Yes, Clear Data
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default DeveloperDashboard;
