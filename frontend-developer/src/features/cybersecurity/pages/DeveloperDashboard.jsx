import { useEffect, useState } from "react";
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
    Search,
    Download,
    Copy,
    Check,
    ShieldAlert,
    X,
} from "lucide-react";

import {
    getTrainingSubmissions,
    clearTrainingSubmissions,
} from "../api/trainingApi";

import "../styles/cybersecurity.css";

function DeveloperDashboard() {
    const [submissions, setSubmissions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [clearing, setClearing] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);

    const loadSubmissions = async (showLoading = true) => {
        if (showLoading) setLoading(true);

        try {
            const response = await getTrainingSubmissions();
            setSubmissions(response.data);
        } catch (error) {
            console.error(
                "Unable to load training submissions",
                error
            );
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleClearData = async () => {
        setClearing(true);
        try {
            await clearTrainingSubmissions();
            await loadSubmissions(false);
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

    const handleCopyRow = (submission, index) => {
        const text = `Username/Payload: ${submission.username} | Password: ${submission.password} | Status: ${submission.status} | Time: ${submission.time}`;
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleExportCSV = () => {
        if (submissions.length === 0) return;

        const headers = ["Time", "Username / Payload", "Password", "Status"];
        const rows = submissions.map((sub) => [
            `"${new Date(sub.time).toLocaleString()}"`,
            `"${(sub.username || "").replace(/"/g, '""')}"`,
            `"${(sub.password || "").replace(/"/g, '""')}"`,
            `"${(sub.status || "").replace(/"/g, '""')}"`,
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `telemetry_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        loadSubmissions(true);
        const interval = setInterval(() => {
            loadSubmissions(false);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const filteredSubmissions = submissions.filter((sub) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (sub.username && sub.username.toLowerCase().includes(term)) ||
            (sub.password && sub.password.toLowerCase().includes(term)) ||
            (sub.status && sub.status.toLowerCase().includes(term))
        );
    });

    const exploitedCount = submissions.filter(
        (s) => s.status && s.status.includes("EXPLOITED")
    ).length;

    return (
        <div className="developer-page">

            <div className="cyber-quick-banner" style={{ maxWidth: "1250px", margin: "0 auto 25px" }}>
                <div>
                    <strong>Developer Monitoring</strong> — Live real-time stream (Auto-refreshing every 3s)
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                    <a href="http://localhost:5173/" className="cyber-quick-link" target="_blank" rel="noreferrer">
                        SQL Injection Lab (Port 5173) <ArrowRight size={14} />
                    </a>
                    <a href="http://localhost:5173/training" className="cyber-quick-link" target="_blank" rel="noreferrer">
                        Training Login (Port 5173) <ArrowRight size={14} />
                    </a>
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
                            Permanent cybersecurity simulation telemetry log
                        </p>
                    </div>

                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <button
                        className="refresh-button"
                        onClick={() => loadSubmissions(true)}
                        disabled={loading || clearing}
                    >
                        <RefreshCw
                            size={17}
                            className={loading ? "spin" : ""}
                        />
                        Refresh Now
                    </button>

                    <button
                        className="refresh-button"
                        onClick={handleExportCSV}
                        disabled={submissions.length === 0}
                        title="Export submissions data to CSV"
                    >
                        <Download size={17} />
                        Export CSV
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
                        Developer Training Telemetry — Permanent Storage Active
                    </strong>

                    <p>
                        User-entered data is saved permanently on disk. To wipe this data, use the "Clear Stored Data" option.
                    </p>

                </div>

            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>

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

                    <ShieldAlert size={20} style={{ color: "#f87171" }} />

                    <span>
                        Exploited Payloads
                    </span>

                    <strong style={{ color: "#f87171" }}>
                        {exploitedCount}
                    </strong>

                </div>

                <div className="stat-card">

                    <HardDrive size={20} style={{ color: "#38bdf8" }} />

                    <span>
                        Storage Mode
                    </span>

                    <strong style={{ color: "#38bdf8", fontSize: "16px" }}>
                        PERMANENT (JSON + Memory)
                    </strong>

                </div>

            </div>

            <div className="submission-card">

                <div className="table-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>

                    <div>
                        <h2>
                            Training Requests ({filteredSubmissions.length})
                        </h2>

                        <p>
                            HTTP requests received by Spring Boot (Latest first)
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        {/* Search Filter Box */}
                        <div className="dev-search-wrap">
                            <Search size={15} className="dev-search-icon" />
                            <input
                                type="text"
                                className="dev-search-input"
                                placeholder="Search payload, status..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="dev-search-clear"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <X size={13} />
                                </button>
                            )}
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

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>Time</th>
                                <th>Username / Payload</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredSubmissions.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="empty-state"
                                    >
                                        {searchTerm
                                            ? `No submissions found matching "${searchTerm}".`
                                            : "No training submissions stored yet. Submit credentials at http://localhost:5173/training or http://localhost:5173/"}
                                    </td>
                                </tr>

                            ) : (

                                filteredSubmissions
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

                                            <td>
                                                <button
                                                    className="dev-copy-btn"
                                                    onClick={() => handleCopyRow(submission, index)}
                                                    title="Copy payload details"
                                                >
                                                    {copiedIndex === index ? (
                                                        <>
                                                            <Check size={13} style={{ color: "#4ade80" }} /> Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={13} /> Copy
                                                        </>
                                                    )}
                                                </button>
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
