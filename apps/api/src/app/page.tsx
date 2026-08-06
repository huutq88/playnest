import { NextResponse } from "next/server";

export default function ApiHealthPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "3rem", background: "#090d16", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ color: "#a78bfa" }}>⚡ PlayNest Standalone Backend API Gateway (v1.0.0)</h1>
      <p style={{ color: "#9ca3af" }}>Server Status: <strong>ONLINE</strong> (Port 3002 / api.playnest.zone)</p>
      <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "2rem 0" }} />
      <h3>Available REST API Endpoints:</h3>
      <ul>
        <li><code>GET /api/v1/videos</code> - List Social Videos</li>
        <li><code>POST /api/v1/videos/oembed</code> - Auto-fetch oEmbed metadata</li>
        <li><code>GET /api/v1/apps</code> - List App Store Showcase items</li>
        <li><code>GET /api/v1/games</code> - List Web Games Catalog</li>
        <li><code>GET /api/v1/stats</code> - Platform Telemetry Statistics</li>
      </ul>
      <p style={{ marginTop: "2rem", color: "#6b7280", fontSize: "0.875rem" }}>
        Contact: contact@playnest.zone • PlayNest Monorepo Architecture
      </p>
    </div>
  );
}
