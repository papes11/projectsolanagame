import { useState, type FormEvent } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function BetaSignup({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [checks, setChecks] = useState({ terms: false, betaAccess: false, emailVerify: false });
  const [status, setStatus] = useState<Status>({ state: "idle" });

  if (!isOpen) return null;

  const allChecked = checks.terms && checks.betaAccess && checks.emailVerify;

  const handleClose = () => {
    onClose();
    setName(""); setEmail(""); setInviteCode("");
    setChecks({ terms: false, betaAccess: false, emailVerify: false });
    setStatus({ state: "idle" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!allChecked) {
      setStatus({ state: "error", message: "Please accept all terms to continue." });
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, inviteCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setStatus({ state: "error", message: data?.error ?? "Something went wrong." });
      } else {
        setStatus({ state: "success" });
        setTimeout(() => {
          window.location.href = "/game";
        }, 1500);
      }
    } catch (err: any) {
      setStatus({ state: "error", message: err?.message ?? "Failed to submit." });
    }
  };

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Beta signup"
      onClick={(e: any) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="popup-content beta-popup">

        {/* Header */}
        <div className="popup-dino-header">
          <span className="popup-dino-icon">🕹️</span>
          <h2>BETA ACCESS</h2>
          <p className="popup-subtitle">POKEPIXEL SUPERNET</p>
        </div>

        {/* Score bar */}
        <div className="popup-score-bar">
          <span className="popup-score-label">PHASE</span>
          <span className="popup-score-value">BETA V1 — INVITE ONLY</span>
        </div>

        {status.state === "success" ? (
          <>
            <div className="popup-success" style={{ marginBottom: 20 }}>
              ✅ BETA ACCESS CONFIRMED!<br />
              <span style={{ fontSize: "9px", display: "block", marginTop: 8, color: "#39ff14" }}>
                ENTERING GAME...
              </span>
            </div>
            <div className="popup-actions">
              <button className="popup-button" type="button" onClick={handleClose}>CLOSE</button>
            </div>
          </>
        ) : (
          <form className="popup-form" onSubmit={handleSubmit}>

            {/* Name */}
            <label className="popup-label" htmlFor="beta-name">YOUR NAME</label>
            <input
              id="beta-name"
              className="popup-input"
              type="text"
              placeholder="Ash Ketchum"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={status.state === "sending"}
              required
            />

            {/* Email */}
            <label className="popup-label" htmlFor="beta-email">EMAIL ADDRESS</label>
            <input
              id="beta-email"
              className="popup-input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status.state === "sending"}
              required
            />

            {/* Invite code */}
            <label className="popup-label" htmlFor="beta-code">INVITE CODE</label>
            <input
              id="beta-code"
              className="popup-input beta-code-input"
              type="text"
              placeholder="GET CODE FROM TELEGRAM"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value.toUpperCase())}
              disabled={status.state === "sending"}
              required
              style={{ letterSpacing: "0.2em", fontFamily: "'Press Start 2P', monospace", fontSize: 11 }}
            />
            <p className="beta-code-hint">
              🔗 Join our{" "}
              <a href="https://t.me/pokepixel" target="_blank" rel="noopener noreferrer">
                Telegram group
              </a>{" "}
              to get your invite code
            </p>

            {/* Checkboxes */}
            <div className="beta-checks">
              <label className="beta-check-row" style={{ color: "#39ff14" }}>
                <input
                  type="checkbox"
                  checked={checks.terms}
                  onChange={e => setChecks(c => ({ ...c, terms: e.target.checked }))}
                  disabled={status.state === "sending"}
                />
                <span style={{ color: "#39ff14" }}>I accept the <a href="/docs#license" target="_blank" style={{ color: "#39ff14" }}>Terms &amp; Conditions</a></span>
              </label>
              <label className="beta-check-row" style={{ color: "#39ff14" }}>
                <input
                  type="checkbox"
                  checked={checks.betaAccess}
                  onChange={e => setChecks(c => ({ ...c, betaAccess: e.target.checked }))}
                  disabled={status.state === "sending"}
                />
                <span style={{ color: "#39ff14" }}>I understand this is Beta access — bugs may occur</span>
              </label>
              <label className="beta-check-row" style={{ color: "#39ff14" }}>
                <input
                  type="checkbox"
                  checked={checks.emailVerify}
                  onChange={e => setChecks(c => ({ ...c, emailVerify: e.target.checked }))}
                  disabled={status.state === "sending"}
                />
                <span style={{ color: "#39ff14" }}>I agree to auto confirmation email--beta use</span>
              </label>
            </div>

            {status.state === "error" && (
              <div className="popup-error">⚠️ {status.message}</div>
            )}

            <div className="popup-actions">
              <button
                type="submit"
                className="popup-button"
                disabled={status.state === "sending" || !allChecked}
              >
                {status.state === "sending" ? "VERIFYING..." : "GET ACCESS ⚡"}
              </button>
              <button type="button" className="popup-button" onClick={handleClose}
                disabled={status.state === "sending"}>
                Close
              </button>
            </div>
          </form>
        )}

        <div className="popup-pixel-footer">
          <span className="popup-pixel-dot" />INVITE ONLY · BETA V1<span className="popup-pixel-dot" />
        </div>
      </div>
    </div>
  );
}
