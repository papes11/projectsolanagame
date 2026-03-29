import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import ClaimPopup from "../src/components/ClaimPopup";
import BetaSignup from "../src/components/BetaSignup";
import { Send, X } from "lucide-react";

export default function HomePage(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClaimPopupOpen, setIsClaimPopupOpen] = useState(false);
  const [isBetaSignupOpen, setIsBetaSignupOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    | { state: "idle" }
    | { state: "sending" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const slides = [
    { src: "/looo.png", alt: "Game Screenshot 1" },
    { src: "/full.png", alt: "Game Screenshot 2" },
    { src: "/3.png", alt: "Game Screenshot 3" },
    { src: "/4.png", alt: "Game Screenshot 4" },
    { src: "/5.png", alt: "Game Screenshot 5" },
    { src: "/log.png", alt: "Game Screenshot 6" },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  const handleNavigation = (url: string, external = false, newTab = false) => {
    if (external || newTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const handleMenuToggle = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(`Menu state: ${e.target.checked ? "Open" : "Closed"}`);
  };

  const isValidEmail = (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const sendEmail = async (): Promise<void> => {
    const email = emailTo.trim();
    if (!isValidEmail(email)) {
      setEmailStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    setEmailStatus({ state: "sending" });
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: any = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setEmailStatus({
          state: "error",
          message: data?.error ?? "Failed to send email.",
        });
        return;
      }
      setEmailStatus({ state: "success", message: "You're on the list!" });
    } catch (err: any) {
      setEmailStatus({
        state: "error",
        message: err?.message ?? "Failed to send email.",
      });
    }
  };

  const closeEmailPopup = (): void => {
    setIsEmailPopupOpen(false);
    setEmailStatus({ state: "idle" });
    setEmailTo("");
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <header className="navbar">
        <Link href="/" className="logo">
          <Image
            src="/log.png"
            alt="POKEPIXEL Logo"
            width={120}
            height={40}
            className="logo-image"
          />
        </Link>
        <input
          type="checkbox"
          className="menu-toggle"
          id="menuToggle"
          onChange={handleMenuToggle}
        />
        <label htmlFor="menuToggle" className="hamburger-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className="nav-links">
          <button
            className="btn secondary-btn silver-text"
            onClick={() => setIsClaimPopupOpen(true)}
          >
            AIRDROP
          </button>
          <button
            className="btn secondary-btn silver-text"
            onClick={() => handleNavigation("/docs", false, true)}
          >
            DOCS
          </button>
          <button
            className="btn secondary-btn silver-text"
            onClick={() => handleNavigation("/swap", false, true)}
          >
            SWAP
          </button>
          <button
            className="btn secondary-btn silver-text"
            onClick={() =>
              handleNavigation("https://x.com/pokepixelsolana", true, true)
            }
          >
            X
          </button>
          {/* FIX: was pointing to Twitter URL instead of Telegram */}
          <button
            className="btn secondary-btn silver-text"
            onClick={() =>
              handleNavigation("https://t.me/pokepixelsolana", true, true)
            }
          >
            TELEGRAM
          </button>
          {/* <button
            className="btn primary-btn"
            onClick={() => handleNavigation("/game")}
          >
            ENTER GAME
          </button> */}
        </nav>
      </header>

      {/* Hero */}
      <main className="hero-section">
        <div className="content-left">
          <h1 className="silver-text">
            PLAY. EARN. OWN. THE FUTURE OF WEB3 GAMING
          </h1>
          <p className="silver-text">
            Dive into POKEPIXEL, a decentralized adventure powered by Solana.
            Connect your wallet, find hidden treasure, open loot boxes, collect
            items, battle, trade, and earn crypto rewards.
          </p>
          <div className="hero-actions">
            <button
              className="btn primary-btn"
              onClick={() => setIsBetaSignupOpen(true)}
            >
              BETA ENTER
            </button>
            <button
              className="btn secondary-btn orange-text"
              onClick={() => {
                setEmailStatus({ state: "idle" });
                setIsEmailPopupOpen(true);
              }}
            >
              WAITLIST
            </button>
            <button
              className="btn secondary-btn silver-text"
              onClick={() => handleNavigation("/docs", false, true)}
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Game Console Image */}
        <div className="console-container">
          <div className="image-wrapper">
            <Image
              src="/solboy.png"
              alt="SolBOY Game Console"
              fill={true}
              objectFit="contain"
              priority
              className="solboy-console-img"
            />
          </div>
        </div>
      </main>

      {/* Promise Cards */}
      <section className="promise-section" aria-labelledby="promiseTitle">
        <div className="promise-inner">
          <div className="promise-eyebrow">WHY POKEPIXEL</div>
          <h2 id="promiseTitle" className="promise-lede">
            Built different. Play free. Earn real.
          </h2>
          <p className="promise-sub">
            A pixel RPG on Solana where every action has on-chain value — no
            gatekeeping, no pay-to-win.
          </p>

          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">🎁</div>
                <div className="promise-card-title">Own What You Earn</div>
                <div className="promise-card-body">
                  Every box you open, every item you collect — it&apos;s yours
                  on-chain. No middlemen, no expiry.
                </div>
              </div>
              <div className="promise-card-art">🏆💰✨</div>
            </div>
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">⚔️</div>
                <div className="promise-card-title">Battle &amp; Progress</div>
                <div className="promise-card-body">
                  Fight trainers, level up your team, and unlock better rewards
                  as you explore the world.
                </div>
              </div>
              <div className="promise-card-art">⚔️🛡️🧙</div>
            </div>
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">🔄</div>
                <div className="promise-card-title">Swap &amp; Trade</div>
                <div className="promise-card-body">
                  Exchange mystery boxes for SOL or POKE tokens directly
                  in-game. Liquid rewards, instantly.
                </div>
              </div>
              <div className="promise-card-art">🌀💎🪙</div>
            </div>
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">⚡</div>
                <div className="promise-card-title">Solana Speed</div>
                <div className="promise-card-body">
                  Sub-second transactions, near-zero fees. On-chain actions feel
                  like regular gameplay.
                </div>
              </div>
              <div className="promise-card-art">⚡🕐�</div>
            </div>
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">📦</div>
                <div className="promise-card-title">3-Tier Box System</div>
                <div className="promise-card-body">
                  Silver, Gold, Diamond — each tier drops bigger rewards. Hunt
                  rare boxes across the map.
                </div>
              </div>
              <div className="promise-card-art">🥈🥇💎</div>
            </div>
            <div className="promise-card">
              <div className="promise-card-text">
                <div className="promise-card-icon">🌍</div>
                <div className="promise-card-title">Free to Play</div>
                <div className="promise-card-body">
                  No token required to start. Jump in, explore, and earn —
                  wallet optional for basic play.
                </div>
              </div>
              <div className="promise-card-art">🌍🔓🎮</div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Highlights */}
      <section className="game-highlight">
        <h2 className="highlight-title silver-text">SUPERNET HIGHLIGHTS</h2>
        <div className="highlight-content">
          <div className="image-slider">
            <div className="slider-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="slide-image"
                  />
                </div>
              ))}
            </div>
            <button
              className="slider-arrow slider-arrow-left"
              onClick={prevSlide}
            >
              &#10094;
            </button>
            <button
              className="slider-arrow slider-arrow-right"
              onClick={nextSlide}
            >
              &#10095;
            </button>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <h2 className="highlight-title silver-text">
          Alpha &amp; Beta Highlights
        </h2>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/IF01-Uk0wnM"
            title="Pokepixel Game Highlights"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-video"
          />
        </div>
      </section>

      <button
        className="btn secondary-btn silver-text"
        onClick={() => handleNavigation("/", false)}
      >
        Supernet Loading...
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/log.png" alt="PokéPixel" width={100} height={100} />
            <p>
              A pixel RPG on Solana. Play free, earn real rewards, own your
              progress on-chain.
            </p>
            <div className="footer-socials">
              <a
                href="https://x.com/pokepixelsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <X size={20} />
              </a>

              <a
                href="https://t.me/pokepixelsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <Send size={20} />
              </a>
            </div>
          </div>
          <div className="footer-links-group">
            <div className="footer-col">
              <div className="footer-col-title">GAME</div>
              <Link href="/game">Play Now</Link>
              <Link href="/docs#gameplay">How to Play</Link>
              <Link href="/docs#mystery-boxes">Mystery Boxes</Link>
              <Link href="/swap">Token Swap</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">INFO</div>
              <Link href="/docs">Docs</Link>
              <Link href="/docs#roadmap">Roadmap</Link>
              <Link href="/docs#contract">Contract</Link>
              <Link href="/docs#faq">FAQ</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">LEGAL</div>
              <Link href="/docs#license">Terms</Link>
              <Link href="/docs#license">Privacy</Link>
              <Link href="/docs#credit">Credits</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-badge">
            {" "}
            <span className="footer-sol">
              &copy; 2026 PokéPixel. All rights reserved.◎ Solana
            </span>
          </span>
        </div>
      </footer>

      {/* Claim Popup */}
      <ClaimPopup
        isOpen={isClaimPopupOpen}
        onClose={() => setIsClaimPopupOpen(false)}
      />

      {/* Beta Signup Popup */}
      <BetaSignup
        isOpen={isBetaSignupOpen}
        onClose={() => setIsBetaSignupOpen(false)}
      />

      {/* Email / Waitlist Popup */}
      {isEmailPopupOpen && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Join waitlist"
          onClick={(e: any) => {
            if (e.target === e.currentTarget) closeEmailPopup();
          }}
        >
          <div className="popup-content">
            <div className="popup-dino-header">
              <span className="popup-dino-icon">🎮</span>
              <h2>JOIN WAITLIST</h2>
              <p className="popup-subtitle">POKEPIXEL SUPERNET</p>
            </div>
            <div className="popup-score-bar">
              <span className="popup-score-label">STATUS</span>
              <span className="popup-score-value">BETA V1 LIVE</span>
            </div>
            <p className="popup-message">
              Be first to know when the next phase drops. Enter your email and
              we will keep you in the loop.
            </p>
            <form
              className="popup-form"
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                void sendEmail();
              }}
            >
              <label className="popup-label" htmlFor="emailTo">
                YOUR EMAIL
              </label>
              <input
                id="emailTo"
                className="popup-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                disabled={
                  emailStatus.state === "sending" ||
                  emailStatus.state === "success"
                }
                required
              />
              {emailStatus.state === "error" && (
                <div className="popup-error">⚠️ {emailStatus.message}</div>
              )}
              {emailStatus.state === "success" && (
                <div className="popup-success">
                  ✅ YOU ARE ON THE LIST! CHECK YOUR INBOX.
                </div>
              )}

              {emailStatus.state !== "success" ? (
                <div className="popup-actions">
                  <button
                    type="submit"
                    className="popup-button"
                    disabled={emailStatus.state === "sending"}
                  >
                    {emailStatus.state === "sending" ? "SENDING..." : "JOIN ⚡"}
                  </button>
                  <button
                    type="button"
                    className="popup-button"
                    onClick={closeEmailPopup}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="popup-actions">
                  <button
                    type="button"
                    className="popup-button"
                    onClick={closeEmailPopup}
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </form>
            <div className="popup-pixel-footer">
              <span className="popup-pixel-dot" />
              PLAY · EARN · OWN
              <span className="popup-pixel-dot" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
