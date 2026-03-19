// app/page.tsx
// Remember to install a proper font like 'Press Start 2P' or 'Roboto' 
// and configure them in your global CSS file for the exact look.
import "./styles.css"
import Image from 'next/image';
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from 'react'; // Importing types for event handling
import ClaimPopup from "../src/components/ClaimPopup";

export default function HomePage(): JSX.Element {

  // State for image slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClaimPopupOpen, setIsClaimPopupOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    { state: "idle" } | { state: "sending" } | { state: "success"; message: string } | { state: "error"; message: string }
  >({ state: "idle" });
  
  const slides = [
    { src: "/looo.png", alt: "Game Screenshot 1" },
    { src: "/full.png", alt: "Game Screenshot 2" },
    { src: "/3.png", alt: "Game Screenshot 3" },
    { src: "/4.png", alt: "Game Screenshot 4" },
    { src: "/5.png", alt: "Game Screenshot 5" },
    { src: "/log.png", alt: "Game Screenshot 6" },
  ];

  

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Typed handler for wallet connection
  const handleNavigation = (url: string, external: boolean = false, newTab: boolean = false) => {
    if (external || newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  };

  // Typed handler for the hamburger menu (though the CSS handles the visual part)
  const handleMenuToggle = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(`Menu state changed to: ${e.target.checked ? 'Open' : 'Closed'}`);
    // State management for navigation could be added here if needed
  };

  const isValidEmail = (value: string): boolean => {
    const v = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const sendEmail = async (): Promise<void> => {
    const email = emailTo.trim();
    if (!isValidEmail(email)) {
      setEmailStatus({ state: "error", message: "Please enter a valid email address." });
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
        setEmailStatus({ state: "error", message: data?.error ?? "Failed to send email." });
        return;
      }

      setEmailStatus({ state: "success", message: "You're on the list!do tuned." });
    } catch (err: any) {
      setEmailStatus({ state: "error", message: err?.message ?? "Failed to send email." });
    }
  };

  const closeEmailPopup = (): void => {
    setIsEmailPopupOpen(false);
    setEmailStatus({ state: "idle" });
  };

  // Typed handler for wallet connection
  return (
    <div className="page-container">
      
      {/* 🚀 Navigation Bar */}
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
        
        {/* Checkbox and Label for the Hamburger Menu (CSS Hack) */}
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

        {/* Navigation Links */}
        <nav className="nav-links">
          <button className="btn secondary-btn silver-text" onClick={() => setIsClaimPopupOpen(true)}>AIRDROP</button>
          <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('/docs', false, true)}>DOCS</button>
          <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('/swap', false, true)}>SWAP</button>
          <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('https://x.com/pokepixelsolana', true, true)}>X</button>
          <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('https://x.com/pokepixelsolana', true, true)}>TELEGRAM</button>
          <button className="btn primary-btn" onClick={() => handleNavigation('/game')}>ENTER GAME</button>
        </nav>
      </header>

      {/* 🎮 Hero Section */}
      <main className="hero-section">
        <div className="content-left">
          <h1 className="silver-text">PLAY. EARN. OWN. THE FUTURE OF WEB3 GAMING</h1>
          <p className="silver-text">Dive into POKEPIXEL, a decentralized adventure powered by Solana. Connect your wallet, find hidden treasure, open loot boxes, collect items, battle, trade, and earn crypto rewards.</p>
          <div className="hero-actions">
            <button className="btn primary-btn" onClick={() => handleNavigation('/game')}>TRY BETAV1</button>
            <button className="btn secondary-btn orange-text" onClick={() => { setEmailStatus({ state: "idle" }); setIsEmailPopupOpen(true); }}>
              waitlist
            </button>
            <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('/docs', false, true)}>LEARN MORE</button>
          </div>
        </div>
        
        {/* Game Console Image */}
        <div className="console-container">
          {/* Using Next.js Image for optimization */}
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
      
      {/* 🎮 Game Highlight Section */}
      {/* Promise Cards */}
      <section className="promise-section" aria-labelledby="promiseTitle">
        <div className="promise-inner">
          <h2 id="promiseTitle" className="promise-lede silver-text">
            A pixel-first adventure where gameplay meets ownership, rewards, and real utility.
          </h2>

          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-card-title">Own What You Earn</div>
              <div className="promise-card-body silver-text">
                Collect items, open loot boxes, and keep your progress.
              </div>
            </div>

            <div className="promise-card">
              <div className="promise-card-title">Trade &amp; Upgrade</div>
              <div className="promise-card-body silver-text">
                Swap, trade, and build your loadout for battles and quests.
              </div>
            </div>

            <div className="promise-card">
              <div className="promise-card-title">Fast, Low-Fee</div>
              <div className="promise-card-body silver-text">
                Powered by Solana for smooth on-chain actions and rewards.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="game-highlight">
        <h2 className="highlight-title silver-text">SUPERNET HIGHLIGHTS</h2>
        <div className="highlight-content">
          <div className="image-slider">
            <div className="slider-container">
              {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.src} alt={slide.alt} className="slide-image" />
                </div>
              ))}
            </div>
            <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
              &#10095;
            </button>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentSlide ? 'active' : ''}`} 
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <h2 className="highlight-title silver-text">Alpha&Beta Highlights</h2>
          <div className="video-container">
            <iframe 
              src="https://www.youtube.com/embed/IF01-Uk0wnM" 
              title="Pokepixel Game Highlights" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="youtube-video"
            ></iframe>
          </div>
      </section>
      <button className="btn secondary-btn silver-text" onClick={() => handleNavigation('/', false)}>Supernet Loading...</button>

      {/* 📝 Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link href="/docs#license">Terms</Link>
          <Link href="/docs#license">Privacy</Link>
          <Link href="/docs#credit">Contact</Link>
        </div>
        <div className="copyright silver-text">
          &copy; 2026 POKEPIXEL
        </div>
      </footer>

      {/* Claim Popup */}
      <ClaimPopup 
        isOpen={isClaimPopupOpen} 
        onClose={() => setIsClaimPopupOpen(false)} 
      />

      {/* Email Popup */}
      {isEmailPopupOpen ? (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Send email">
          <div className="popup-content">
            <h2>Get SURPERNET EARLY UPDATES</h2>
            <p className="popup-message">
              Enter your email and we’ll send a quick message to confirm.
            </p>

            <form
              className="popup-form"
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                void sendEmail();
              }}
            >
              <label className="popup-label" htmlFor="emailTo">
                Email
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
                disabled={emailStatus.state === "sending"}
                required
              />

              {emailStatus.state === "error" ? (
                <div className="popup-error">{emailStatus.message}</div>
              ) : null}
              {emailStatus.state === "success" ? (
                <div className="popup-success">{emailStatus.message}</div>
              ) : null}

              <div className="popup-actions">
                <button
                  type="submit"
                  className="popup-button"
                  disabled={emailStatus.state === "sending"}
                >
                  {emailStatus.state === "sending" ? "SENDING..." : "SEND"}
                </button>
                <button
                  type="button"
                  className="popup-button"
                  onClick={closeEmailPopup}
                  disabled={emailStatus.state === "sending"}
                >
                  CLOSE
                </button>
              </div>

            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

