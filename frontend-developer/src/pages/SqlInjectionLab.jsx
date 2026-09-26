import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Database,
  ShieldAlert,
  ShieldCheck,
  User,
  LockKeyhole,
  Eye,
  EyeOff,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  LoaderCircle,
} from "lucide-react";
import "../features/cybersecurity/styles/cybersecurity.css";

const API_BASE = import.meta.env.VITE_API_URL;

const PAYLOAD_EXAMPLES = [
  { label: "Auth bypass", username: "' OR '1'='1' --", password: "anything" },
  { label: "Comment out password check", username: "admin' --", password: "" },
  { label: "Always-true OR", username: "' OR 1=1 --", password: "x" },
];

function SqlInjectionLab() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(null);

  const login = async (type) => {
    if (loading) return;

    setError("");
    setResult(null);
    setMode(type);
    setLoading(true);
    const start = performance.now();

    try {
      const response = await axios.post(
        `${API_BASE}/api/login/${type}`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (typeof err.response?.data === "string" ? err.response.data : null) ||
          err.message ||
          "Request failed"
      );
    } finally {
      setElapsedMs(Math.round(performance.now() - start));
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(mode || "vulnerable");
  };

  const fillExample = (example) => {
    setUsername(example.username);
    setPassword(example.password);
  };

  return (
    <div className="cyber-page">
      <div className="cyber-background-grid" />

      <div className="cyber-container" style={{ width: "min(680px, calc(100% - 32px))" }}>
        {/* Navigation Quick Banner */}
        <div className="cyber-quick-banner">
          <div>
            <strong>Interactive Security Sandbox</strong> — SQL Injection Vulnerability Testing
          </div>
          <Link to="/training" className="cyber-quick-link">
            Training Login <ArrowRight size={14} />
          </Link>
        </div>

        <div className="cyber-brand">
          <div className="cyber-brand-icon">
            <Database size={26} />
          </div>
          <div>
            <h1>SQL Injection Training Lab</h1>
            <p>Spring Boot + PostgreSQL + React Interactive Sandbox</p>
          </div>
        </div>

        <div className="cyber-card">
          <div className="cyber-card-header">
            <div className="cyber-status">
              <span className="status-dot" />
              SANDBOX ENVIRONMENT ACTIVE
            </div>

            <h2>Test Authentication Logic</h2>
            <p>
              Compare how raw SQL concatenation handles input vs parametrized secure queries.
            </p>
          </div>

          <div className="cyber-warning-banner">
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>Educational Demonstration Only</strong> — Do not expose this app or its backend outside a sandboxed environment.
            </div>
          </div>

          <form className="cyber-form" onSubmit={handleSubmit} noValidate>
            <div className="cyber-field">
              <label htmlFor="username">Username / SQL Payload</label>
              <div className="cyber-input-wrapper">
                <User size={18} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter username or payload (e.g. ' OR '1'='1' --)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="cyber-field">
              <label htmlFor="password">Password</label>
              <div className="cyber-input-wrapper">
                <LockKeyhole size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="payload-examples-section">
              <span className="payload-title">Quick Attack Payloads:</span>
              <div className="payload-chips">
                {PAYLOAD_EXAMPLES.map((ex) => (
                  <button
                    type="button"
                    key={ex.label}
                    onClick={() => fillExample(ex)}
                    className="payload-chip"
                  >
                    <Zap size={13} style={{ color: "#38bdf8" }} />
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="login-action-buttons">
              <button
                type="submit"
                onClick={() => setMode("vulnerable")}
                disabled={loading}
                className="btn-vulnerable"
              >
                {loading && mode === "vulnerable" ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Executing Payload...
                  </>
                ) : (
                  <>
                    <ShieldAlert size={18} />
                    Vulnerable Login
                  </>
                )}
              </button>

              <button
                type="submit"
                onClick={() => setMode("secure")}
                disabled={loading}
                className="btn-secure"
              >
                {loading && mode === "secure" ? (
                  <>
                    <LoaderCircle className="spin" size={18} />
                    Verifying Securely...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Secure Login
                  </>
                )}
              </button>
            </div>
          </form>

          {mode && (
            <div className="request-details-box">
              <div className="request-details-header">
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700, letterSpacing: "0.08em" }}>
                  HTTP REQUEST EXECUTED
                </div>
                {elapsedMs !== null && (
                  <div className="timing-badge">
                    <Clock size={13} />
                    {elapsedMs} ms
                  </div>
                )}
              </div>
              <code className="request-endpoint-code">
                POST {API_BASE}/api/login/{mode}
              </code>
            </div>
          )}

          {result && (
            <div className="response-box">
              <h3>
                <CheckCircle2 size={18} style={{ color: "#4ade80" }} />
                Server Response
              </h3>
              <pre className="response-json">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="network-error" role="alert" style={{ marginTop: 20 }}>
              <div className="network-error-icon">
                <ShieldAlert size={24} />
              </div>
              <div>
                <strong>Authentication Request Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="training-notice" style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <CheckCircle2 size={17} />
            <span>
              Local SQL injection lab. Powered by Spring Boot backend at <code>{API_BASE}</code>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SqlInjectionLab;
