import { Outlet } from "react-router-dom";
import "../features/cybersecurity/styles/cybersecurity.css";

function Layout() {
  return (
    <div className="cyber-page-wrapper">
      <main className="cyber-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
