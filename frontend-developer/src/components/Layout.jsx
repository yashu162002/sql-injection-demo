import { Outlet, NavLink, Link } from "react-router-dom";
import { Terminal, ExternalLink, Shield } from "lucide-react";
import "../features/cybersecurity/styles/cybersecurity.css";

function Layout() {
  return (
    <div className="cyber-page-wrapper">
      <header className="cyber-nav">
        <div className="nav-container">
          <Link to="/developer" className="nav-brand">
            <div className="nav-brand-icon" style={{ background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8" }}>
              <Terminal size={22} />
            </div>
            <div className="nav-brand-text">
              <span className="brand-title">DEVELOPER PORTAL</span>
              <span className="brand-subtitle">Real-time Telemetry & Training Submissions</span>
            </div>
          </Link>

          <nav className="nav-links">
            <NavLink
              to="/developer"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Terminal size={16} />
              <span>Dev Dashboard</span>
            </NavLink>

            <a
              href="http://localhost:5173/training"
              target="_blank"
              rel="noreferrer"
              className="nav-item external-dev-link"
              style={{ color: "#a78bfa", borderLeft: "1px solid rgba(255, 255, 255, 0.1)", paddingLeft: "16px" }}
            >
              <Shield size={16} />
              <span>User Training Portal (Port 5173)</span>
              <ExternalLink size={14} />
            </a>
          </nav>
        </div>
      </header>

      <main className="cyber-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
