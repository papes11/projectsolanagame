  import React from "react";

  type DocKey =
    | "overview"
    | "getting-started"
    | "gameplay"
    | "mystery-boxes"
    | "swap"
    | "roadmap"
    | "contract"
    | "faq"
    | "license"
    | "credit";

  const SECTIONS: { key: DocKey; label: string; icon: string; group: string }[] = [
    { key: "overview", label: "Welcome to PokéPixel", icon: "🎮", group: "WELCOME" },
    { key: "getting-started", label: "Getting Started", icon: "🚀", group: "GUIDES" },
    { key: "gameplay", label: "Gameplay", icon: "🌍", group: "GUIDES" },
    { key: "mystery-boxes", label: "Mystery Boxes", icon: "📦", group: "GUIDES" },
    { key: "swap", label: "Token Swap", icon: "🔄", group: "FEATURES" },
    { key: "roadmap", label: "Roadmap", icon: "📍", group: "FEATURES" },
    { key: "contract", label: "Official Contract", icon: "📜", group: "TOKEN & ECONOMY" },
    { key: "faq", label: "FAQ", icon: "❓", group: "SUPPORT" },
    { key: "license", label: "License", icon: "⚠️", group: "SUPPORT" },
    { key: "credit", label: "Credits", icon: "👾", group: "SUPPORT" },
  ];

  const TOC: Record<DocKey, { id: string; label: string }[]> = {
    overview: [
      { id: "about", label: "About the Game" },
      { id: "box-types", label: "Quest Box & Reward Box" },
      { id: "highlights", label: "Gameplay Highlights" },
      { id: "betanet", label: "BetaNet v1 Now Live" },
      { id: "optimizations", label: "Bug Fixes & Optimizations" },
    ],
    "getting-started": [
      { id: "desktop", label: "Desktop Users" },
      { id: "mobile", label: "Mobile Users" },
      { id: "swap-intro", label: "Exchanging Boxes for Tokens" },
    ],
    gameplay: [
      { id: "exploration", label: "Exploration" },
      { id: "interaction", label: "NPC Interaction" },
      { id: "progression", label: "Progression" },
    ],
    "mystery-boxes": [
      { id: "tiers", label: "Box Tiers" },
      { id: "how-to-find", label: "How to Find Boxes" },
      { id: "rewards", label: "Rewards by Tier" },
      { id: "pro-tips", label: "Pro Tips" },
    ],
    swap: [
      { id: "access", label: "How to Access" },
      { id: "rates", label: "Swap Rates" },
      { id: "benefits", label: "Swap Benefits" },
      { id: "notes", label: "Important Notes" },
    ],
    roadmap: [
      { id: "alpha", label: "Alpha Phase" },
      { id: "betav1", label: "Beta Phase v1" },
      { id: "betav2", label: "Beta Phase v2" },
      { id: "super", label: "Super Phase" },
    ],
    contract: [{ id: "address", label: "Contract Address" }],
    faq: [
      { id: "what-is", label: "What is PokéPixel?" },
      { id: "how-play", label: "How do I play?" },
      { id: "cost", label: "Is there a cost?" },
      { id: "mobile-faq", label: "Mobile Play" },
      { id: "rewards-faq", label: "What rewards can I earn?" },
    ],
    license: [
      { id: "disclaimer", label: "Disclaimer" },
      { id: "notice", label: "Important Notice" },
    ],
    credit: [
      { id: "dev-team", label: "Development Team" },
      { id: "community", label: "Community" },
      { id: "thanks", label: "Special Thanks" },
    ],
  };

  const XIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const TelegramIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );

  export default function DocsPage() {
    const [active, setActive] = React.useState<DocKey>("overview");
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [activeHeading, setActiveHeading] = React.useState("");
    const contractAddress = "coming soon";
    const [copied, setCopied] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const copyContract = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(contractAddress);
        } else {
          const t = document.createElement("textarea");
          t.value = contractAddress;
          t.style.position = "fixed";
          t.style.left = "-9999px";
          document.body.appendChild(t);
          t.focus();
          t.select();
          document.execCommand("copy");
          document.body.removeChild(t);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch {}
    };

    const goto = (key: DocKey) => {
      setActive(key);
      setActiveHeading("");
      setSidebarOpen(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    };

    const groups = Array.from(new Set(SECTIONS.map((s) => s.group)));

    return (
      <div className="docs-root">
        {/* ── TOP BAR ── */}
        <nav className="docs-topbar">
          <div className="topbar-left">
            <button className="hamburger" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
            <div className="brand-logo">
              <img src="/logo512.png" alt="PokéPixel" />
              <span className="brand-name">PokéPixel</span>
              <span className="brand-tag">Docs</span>
            </div>
          </div>
          <div className="topbar-right">
            <a href="#" className="social-btn" aria-label="X / Twitter"><XIcon /></a>
            <a href="#" className="social-btn telegram" aria-label="Telegram"><TelegramIcon /></a>
          </div>
        </nav>

        <div className="docs-body">
          {/* ── LEFT SIDEBAR ── */}
          <aside className={`docs-sidebar ${sidebarOpen ? "open" : ""}`}>
            <div className="sidebar-inner">
              {groups.map((g) => (
                <div className="sidebar-group" key={g}>
                  <div className="sidebar-group-label">{g}</div>
                  {SECTIONS.filter((s) => s.group === g).map((s) => (
                    <button
                      key={s.key}
                      className={`sidebar-item ${active === s.key ? "active" : ""}`}
                      onClick={() => goto(s.key)}
                      style={{ color: active === s.key ? '#39ff14' : '#ffffff' }}
                    >
                      <span className="sidebar-icon">{s.icon}</span>
                      <span style={{ color: active === s.key ? '#39ff14' : '#ffffff' }}>{s.label}</span>
                      {active === s.key && <span className="active-bar" />}
                    </button>
                  ))}
                </div>
              ))}
              <div className="sidebar-footer">
                <div className="powered-by">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#39ff14"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  <span>Powered by PokéPixel</span>
                </div>
              </div>
            </div>
          </aside>

          {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

          {/* ── MAIN CONTENT ── */}
          <main className="docs-main" ref={contentRef}>
            <div className="docs-content">


              {/* ─── OVERVIEW ─── */}
              {active === "overview" && (
                <section>
                  <div className="section-badge">WELCOME</div>
                  <h1 id="about">🎮 Welcome to PokéPixel</h1>
                  <p className="lead-text">PokéPixel is a free-to-play pixel adventure game built on Solana, where you can explore, earn rewards, and level up — no tokens required to start!</p>
                  <p>During the <strong>BetaNet v1</strong>, everyone can play for free. In future updates, some features may require holding a small amount of PokéPixel tokens to unlock special gameplay options.</p>
                  <p><strong>Your main mission?</strong> Find hidden boxes, open them directly on Solana using your wallet, and immediately receive rewards.</p>

                  <div className="hero-banner">
                    <span className="hero-badge">🚀 BetaNet v1 Now Live!</span>
                    <p>Everything is free and experimental. Join the early beta and be part of the next wave.</p>
                  </div>

                  <h2 id="box-types">📦 Quest Box &amp; Reward Box</h2>
                  <div className="card-grid cols-2">
                    <div className="card card-accent"><h3>Quest Box</h3><p>Unlocks as you complete in-game quests and gain experience (EXP). Tied to your progression and achievements.</p></div>
                    <div className="card card-accent"><h3>Reward Box</h3><p>Randomly appears across the map. Open these on-chain using your Solana wallet for exclusive rewards. Respawns periodically.</p></div>
                  </div>

                  <h2 id="highlights">🚀 Gameplay Highlights</h2>
                  <div className="card-grid cols-3">
                    {[
                      { icon: "⛓️", title: "Built on Solana", desc: "Fast, secure blockchain transactions." },
                      { icon: "👛", title: "Multi-Wallet Support", desc: "Phantom, Solflare, Trust, and more." },
                      { icon: "📈", title: "Level Up & Earn", desc: "Gain EXP and unlock better rewards." },
                      { icon: "🎁", title: "Hidden Rewards", desc: "Hidden boxes spawn and respawn over time." },
                      { icon: "✨", title: "UI/UX Improvements", desc: "Enhanced visual elements and experience." },
                      { icon: "🔄", title: "Box to Token Swap", desc: "Exchange boxes for SOL or POKE tokens." },
                      { icon: "🏆", title: "Three-Tier Boxes", desc: "Silver, Gold, and Diamond tiers." },
                    ].map((f) => (
                      <div className="card" key={f.title}>
                        <div className="card-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="callout callout-green" id="betanet">
                    <div className="callout-icon">🚀</div>
                    <div><h3>BetaNet v1 Features</h3>
                      <ul>
                        <li>Enhanced three-tier box system (Silver, Gold, Diamond)</li>
                        <li>New Swap Page feature for trading</li>
                        <li>UI/UX improvements and bug fixes</li>
                        <li>Reward NFTs and Solana-based collectibles</li>
                        <li>Enhanced play-to-earn systems</li>
                      </ul>
                    </div>
                  </div>

                  <div className="callout callout-blue" id="optimizations">
                    <div className="callout-icon">🔧</div>
                    <div><h3>BetaNet v1 Bug Fixes</h3>
                      <ul>
                        <li>Optimized box spawning algorithm</li>
                        <li>Fixed transaction confirmation on mobile</li>
                        <li>Improved wallet connection stability</li>
                        <li>Resolved box respawning timer issues</li>
                        <li>Fixed UI rendering on various screen sizes</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* ─── GETTING STARTED ─── */}
              {active === "getting-started" && (
                <section>
                  <div className="section-badge">GUIDES</div>
                  <h1>Getting Started</h1>
                  <p className="lead-text">Everything you need to begin your PokéPixel adventure on desktop or mobile.</p>

                  <h2 id="desktop">💻 Desktop Users</h2>
                  <div className="steps-list">
                    {[
                      { n: 1, title: "Install a Solana Wallet", desc: "Download Phantom, Solflare, or any compatible Solana wallet extension." },
                      { n: 2, title: "Connect Your Wallet", desc: 'Open the game and click "Connect Wallet" to link your wallet securely.' },
                      { n: 3, title: "Acquire Required SPL Tokens", desc: "Ensure you hold at least one of the required SPL tokens." },
                      { n: 4, title: "Start Playing", desc: "Use keyboard arrows or on-screen D-pad to move and interact." },
                    ].map((s) => (
                      <div className="step-row" key={s.n}>
                        <div className="step-num">{s.n}</div>
                        <div className="step-body"><h3>{s.title}</h3><p>{s.desc}</p></div>
                      </div>
                    ))}
                  </div>

                  <h2 id="mobile">📱 Mobile Users</h2>
                  <div className="callout callout-orange">
                    <div className="callout-icon">🚨</div>
                    <div><strong>Important:</strong> To complete transactions on mobile, you <strong>must</strong> use your wallet app's built-in browser.</div>
                  </div>
                  <div className="steps-list">
                    {[
                      { n: 1, title: "Install a Mobile Wallet", desc: "Download Phantom, Solflare, or Trust Wallet from your app store." },
                      { n: 2, title: "Open Built-in Browser", desc: 'Launch your wallet app and find the "Browser" or "DApp" section.' },
                      { n: 3, title: "Navigate to PokéPixel", desc: "Type or paste the PokéPixel website URL into the browser." },
                      { n: 4, title: "Connect & Play", desc: 'Click "Connect Wallet" — your wallet connects automatically.' },
                      { n: 5, title: "Ensure Token Holdings", desc: "Verify you hold the required SPL tokens to open boxes." },
                    ].map((s) => (
                      <div className="step-row" key={s.n}>
                        <div className="step-num">{s.n}</div>
                        <div className="step-body"><h3>{s.title}</h3><p>{s.desc}</p></div>
                      </div>
                    ))}
                  </div>

                  <div className="callout callout-green" id="swap-intro">
                    <div className="callout-icon">💡</div>
                    <div>
                      <h3>Why use the wallet browser?</h3>
                      <p>Mobile browsers (Safari, Chrome) don't support wallet extensions. Wallet apps provide built-in browsers specifically designed for blockchain apps like PokéPixel.</p>
                    </div>
                  </div>
                </section>
              )}

              {/* ─── GAMEPLAY ─── */}
              {active === "gameplay" && (
                <section>
                  <div className="section-badge">GUIDES</div>
                  <h1>Gameplay</h1>
                  <p className="lead-text">Explore the PokéPixel world, interact with characters, and earn rewards through play.</p>
                  <div className="card-grid cols-2">
                    {[
                      { icon: "🌍", id: "exploration", title: "Exploration", desc: "Walk around towns, routes, and caves to discover hidden areas and secrets." },
                      { icon: "💬", id: "interaction", title: "NPC Interaction", desc: "Talk to characters throughout the world to receive quests and valuable information." },
                      { icon: "🎁", id: "", title: "Item Collection", desc: "Gather items and resources that contribute to your progression and future rewards." },
                      { icon: "📈", id: "progression", title: "Progression", desc: "Level up your account to unlock better rewards and increased mystery box spawn rates." },
                    ].map((g) => (
                      <div className="card" key={g.title} id={g.id || undefined}>
                        <div className="card-icon">{g.icon}</div>
                        <h3>{g.title}</h3>
                        <p>{g.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── MYSTERY BOXES ─── */}
              {active === "mystery-boxes" && (
                <section>
                  <div className="section-badge">GUIDES</div>
                  <h1>Mystery Boxes</h1>
                  <p className="lead-text">Mystery boxes are special in-game items found and opened for rewards. BetaNet v1 introduces a three-tier system.</p>

                  <div className="card-grid cols-3" id="tiers">
                    <div className="card card-silver"><div className="card-icon">🥉</div><h3>Silver Boxes</h3><p>Common, respawn frequently. Basic rewards like small SOL or common items.</p></div>
                    <div className="card card-gold"><div className="card-icon">🥇</div><h3>Gold Boxes</h3><p>Uncommon, better rewards. Higher value items, tokens, and occasional NFTs.</p></div>
                    <div className="card card-diamond"><div className="card-icon">💎</div><h3>Diamond Boxes</h3><p>Rare, highest rewards. Exclusive NFTs, large SOL amounts, rare collectibles.</p></div>
                  </div>

                  <h2 id="how-to-find">How to Find and Open Boxes</h2>
                  <p>Explore different areas of the game world. When you walk over a box, interact with it using your Solana wallet. Each box can only be opened once — you immediately receive your rewards.</p>

                  <div className="table-wrapper" id="rewards">
                    <h2>Rewards by Box Tier</h2>
                    <table className="rewards-table">
                      <thead><tr><th>Box Tier</th><th>SOL Reward</th><th>Tokens</th><th>Extras</th></tr></thead>
                      <tbody>
                        <tr><td><span className="tier-badge silver">🥉 Silver</span></td><td>0.01–0.05 SOL</td><td>Basic POKE</td><td>Common items</td></tr>
                        <tr><td><span className="tier-badge gold">🥇 Gold</span></td><td>0.05–0.15 SOL</td><td>Moderate POKE</td><td>Occasional NFTs</td></tr>
                        <tr><td><span className="tier-badge diamond">💎 Diamond</span></td><td>0.15–0.5 SOL</td><td>Large POKE</td><td>Exclusive NFTs &amp; cNFTs</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="callout callout-green" id="pro-tips">
                    <div className="callout-icon">💡</div>
                    <div><h3>Pro Tips</h3>
                      <ul>
                        <li>Explore different areas regularly to find new boxes</li>
                        <li>Higher level accounts get access to better rewards</li>
                        <li>Complete quests to unlock special Quest Boxes</li>
                        <li>Diamond boxes are rare — keep exploring!</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* ─── SWAP ─── */}
              {active === "swap" && (
                <section>
                  <div className="section-badge">FEATURES</div>
                  <h1>🔄 Box to Token Swap</h1>
                  <p className="lead-text">BetaNet v1 introduces the Box to Token Swap — exchange mystery boxes for SOL or PokéPixel tokens directly in-game.</p>

                  <h2 id="access">How to Access the Swap Page</h2>
                  <div className="steps-list">
                    {[
                      { n: 1, title: "Connect Your Wallet", desc: "Ensure your Solana wallet is connected to the game." },
                      { n: 2, title: "Navigate to Swap", desc: 'Click "Swap" in the main menu or visit /swap directly.' },
                      { n: 3, title: "Select Box Type", desc: "Choose which type of box (Silver, Gold, or Diamond)." },
                      { n: 4, title: "Select Token", desc: "Choose SOL or PokéPixel tokens in return." },
                      { n: 5, title: "Enter Amount & Confirm", desc: "Specify the number of boxes and confirm the transaction." },
                    ].map((s) => (
                      <div className="step-row" key={s.n}>
                        <div className="step-num">{s.n}</div>
                        <div className="step-body"><h3>{s.title}</h3><p>{s.desc}</p></div>
                      </div>
                    ))}
                  </div>

                  <div className="table-wrapper" id="rates">
                    <h2>Swap Rates</h2>
                    <table className="rewards-table">
                      <thead><tr><th>Box</th><th>SOL Value</th><th>POKE Value</th></tr></thead>
                      <tbody>
                        <tr><td><span className="tier-badge silver">🥈 Silver</span></td><td>0.1 SOL</td><td>1,000 POKE</td></tr>
                        <tr><td><span className="tier-badge gold">🥇 Gold</span></td><td>0.25 SOL</td><td>2,500 POKE</td></tr>
                        <tr><td><span className="tier-badge diamond">💎 Diamond</span></td><td>0.5 SOL</td><td>5,000 POKE</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="card-grid cols-2">
                    <div className="callout callout-green" id="benefits">
                      <div className="callout-icon">✅</div>
                      <div><h3>Swap Benefits</h3><ul><li>Convert boxes to liquid tokens</li><li>Low 0.5% transaction fee</li><li>Instant processing</li><li>No intermediaries</li></ul></div>
                    </div>
                    <div className="callout callout-orange" id="notes">
                      <div className="callout-icon">⚠️</div>
                      <div><h3>Important Notes</h3><ul><li>You must have boxes in inventory</li><li>Swaps are irreversible once confirmed</li><li>Network fees paid in SOL</li><li>Minimum: 1 box per swap</li></ul></div>
                    </div>
                  </div>
                </section>
              )}

              {/* ─── ROADMAP ─── */}
              {active === "roadmap" && (
                <section>
                  <div className="section-badge">FEATURES</div>
                  <h1>📍 Roadmap</h1>
                  <p className="lead-text">Our journey from Alpha to a full ecosystem expansion.</p>
                  <div className="roadmap">
                    {[
                      { id: "alpha", phase: "Alpha Phase", status: "completed", label: "Completed", desc: "Core gameplay live, early community building and testing." },
                      { id: "betav1", phase: "Beta Phase v1", status: "current", label: "Current", desc: "Enhanced gameplay with three-tier box system, token swap features, and social features rollout." },
                      { id: "betav2", phase: "Beta Phase v2", status: "upcoming", label: "Upcoming", desc: "Advanced trading features, expanded quests, and additional box types." },
                      { id: "super", phase: "Super Phase", status: "future", label: "Future", desc: "Full ecosystem expansion, Rewards program, and enhanced play-to-earn systems." },
                    ].map((r) => (
                      <div className={`roadmap-item ${r.status}`} key={r.phase} id={r.id}>
                        <div className="roadmap-dot" />
                        <div className="roadmap-content">
                          <div className="roadmap-header">
                            <h3>{r.phase}</h3>
                            <span className={`status-pill ${r.status}`}>{r.label}</span>
                          </div>
                          <p>{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── CONTRACT ─── */}
              {active === "contract" && (
                <section>
                  <div className="section-badge">TOKEN &amp; ECONOMY</div>
                  <h1>📜 Official Contract</h1>
                  <p className="lead-text">The official PokéPixel token contract address on Solana.</p>
                  <div className="contract-block" id="address">
                    <div className="contract-label">Contract Address</div>
                    <div className="contract-row">
                      <code className="contract-code">{contractAddress}</code>
                      <button className="copy-button" onClick={copyContract}>
                        {copied
                          ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Copied!</>
                          : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> Copy</>}
                      </button>
                    </div>
                    <p className="contract-note">⚠️ Always verify this address before making any transactions.</p>
                  </div>
                </section>
              )}

              {/* ─── FAQ ─── */}
              {active === "faq" && (
                <section>
                  <div className="section-badge">SUPPORT</div>
                  <h1>❓ Frequently Asked Questions</h1>
                  <div className="faq-list">
                    {[
                      { id: "what-is", q: "What is PokéPixel?", a: "A free-to-play pixel adventure game built on Solana where you explore, complete quests, and earn rewards. Inspired by classic monster-catching games but operates as an independent Web3 project." },
                      { id: "how-play", q: "How do I play?", a: "Connect your Solana wallet, explore the map using keyboard arrows or on-screen controls, and interact with objects to find mystery boxes. Walk over a box and press the action button to open it and receive rewards immediately." },
                      { id: "cost", q: "Is there a cost to play?", a: "PokéPixel is completely free to play during BetaNet. You only need a Solana wallet. Opening reward boxes requires a small on-chain transaction fee (paid in SOL)." },
                      { id: "mobile-faq", q: "📱 Can I play on mobile?", a: "Yes! But you must use your wallet app's built-in browser (not Safari or Chrome). Download Phantom, Solflare, or Trust Wallet, open their built-in browser, and navigate to PokéPixel." },
                      { id: "rewards-faq", q: "What rewards can I earn?", a: "Players can earn NFTs, cNFTs, SOL rewards, rare items, and PokéPixel tokens by opening boxes and progressing through the game." },
                      { id: "", q: "How do mystery boxes work?", a: "Quest Boxes are earned through quests. Reward Boxes appear randomly and respawn periodically. Each box can only be opened once, yielding SOL, tokens, or NFTs immediately." },
                      { id: "", q: "Can I swap my boxes for tokens?", a: "Yes! BetaNet v1 introduces Box to Token Swap. Exchange Silver, Gold, or Diamond boxes for SOL or POKE tokens." },
                      { id: "", q: "Is this affiliated with Pokémon?", a: "No. PokéPixel is an independent fan-made project. We are not affiliated with Nintendo, Game Freak, or The Pokémon Company." },
                    ].map((f, i) => (
                      <details className="faq-item" key={i} id={f.id || undefined}>
                        <summary className="faq-question">
                          <span>{f.q}</span>
                          <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                        </summary>
                        <div className="faq-answer"><p>{f.a}</p></div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* ─── LICENSE ─── */}
              {active === "license" && (
                <section>
                  <div className="section-badge">SUPPORT</div>
                  <h1>⚠️ License &amp; Disclaimer</h1>
                  <p className="lead-text" id="disclaimer">PokéPixel is an independent fan-made project inspired by the classic monster-catching genre.</p>
                  <p>We are <strong>not affiliated, connected, or endorsed</strong> by Nintendo, Game Freak, The Pokémon Company, or any related entity.</p>
                  <p>Our team consists of passionate Web3 developers and artists creating new, blockchain-based gaming experiences.</p>
                  <div className="callout callout-blue" id="notice">
                    <div className="callout-icon">📜</div>
                    <div><h3>Important Notice</h3>
                      <ul>
                        <li>This is a fan-made, independent Web3 project</li>
                        <li>No official connection to Nintendo or The Pokémon Company</li>
                        <li>All game assets are original or properly licensed</li>
                        <li>Built on Solana blockchain for transparency</li>
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* ─── CREDITS ─── */}
              {active === "credit" && (
                <section>
                  <div className="section-badge">SUPPORT</div>
                  <h1>👾 Credits</h1>
                  <div className="card-grid cols-1">
                    <div className="card card-accent" id="dev-team"><h3>Development Team</h3><p>Developed by <strong>[RB_pokepixel], [PS_pokepixel]</strong> — a passionate team of Web3 developers and pixel artists bringing blockchain gaming to life.</p></div>
                    <div className="card card-accent" id="community"><h3>Community</h3><p>Thank you for playing and supporting the early PokéPixel Alpha — your journey is just beginning! 🌟</p></div>
                    <div className="card card-accent" id="thanks"><h3>Special Thanks</h3><p>To all early alpha testers, community members, and supporters who believed in this project from the start.</p></div>
                  </div>
                </section>
              )}

              {/* Prev / Next */}
              <div className="next-nav">
                {(() => {
                  const idx = SECTIONS.findIndex((s) => s.key === active);
                  const prev = SECTIONS[idx - 1];
                  const next = SECTIONS[idx + 1];
                  return (
                    <>
                      {prev && (
                        <button className="next-btn prev-btn" onClick={() => goto(prev.key)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                          <div><div className="next-label">Previous</div><div className="next-title">{prev.label}</div></div>
                        </button>
                      )}
                      {next && (
                        <button className="next-btn" onClick={() => goto(next.key)}>
                          <div><div className="next-label">Next</div><div className="next-title">{next.label}</div></div>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </main>

          {/* ── RIGHT TOC ── */}
          <aside className="docs-toc">
            <div className="toc-inner">
              <div className="toc-label">On this page</div>
              {TOC[active]?.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={`toc-item ${activeHeading === item.id ? "active" : ""}`} onClick={() => setActiveHeading(item.id)}>
                  {item.label}
                </a>
              ))}
            </div>
          </aside>
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :global(html, body) {
            background: #0c0f0c;
            color: #c8d8c8;
            font-family: 'DM Sans', sans-serif;
            overflow-x: hidden;
          }

          .docs-root { display: flex; flex-direction: column; min-height: 100vh; background: #0c0f0c; }

          /* TOPBAR */
          .docs-topbar {
            height: 60px;
            border-bottom: 1px solid #1c2e1c;
            background: rgba(12,15,12,0.97);
            backdrop-filter: blur(12px);
            position: sticky; top: 0; z-index: 50;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 20px;
          }
          .topbar-left { display: flex; align-items: center; gap: 12px; }
          .hamburger { display: none; flex-direction: column; gap: 5px; background: transparent; border: none; cursor: pointer; padding: 4px; }
          .hamburger span { display: block; width: 20px; height: 2px; background: #8aaa8a; border-radius: 2px; transition: background 0.2s; }
          .hamburger:hover span { background: #39ff14; }
          .brand-logo { display: flex; align-items: center; gap: 8px; }
          .brand-logo img { width: 28px; height: 28px; border-radius: 6px; }
          .brand-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; color: #39ff14; letter-spacing: -0.02em; }
          .brand-tag { font-size: 11px; font-weight: 600; background: #1a3a1a; color: #5aaa5a; padding: 2px 7px; border-radius: 4px; border: 1px solid #2a4a2a; }
          .topbar-right { display: flex; align-items: center; gap: 8px; }
          .social-btn {
            display: flex; align-items: center; justify-content: center;
            width: 34px; height: 34px; border-radius: 8px;
            background: #111811; border: 1px solid #1c2e1c;
            color: #7a9a7a; text-decoration: none; transition: all 0.2s;
          }
          .social-btn:hover { background: #0f1f0f; border-color: #39ff14; color: #39ff14; }
          .social-btn.telegram:hover { border-color: #29b6f6; color: #29b6f6; }

          /* BODY LAYOUT */
          .docs-body { display: grid; grid-template-columns: 320px 1fr 320px; flex: 1; min-height: calc(100vh - 60px); gap: 0; }

          /* LEFT SIDEBAR */
          .docs-sidebar {
            border-right: 1px solid #1c2e1c; background: #0e120e;
            position: sticky; top: 60px; height: calc(100vh - 60px);
            overflow-y: auto; overflow-x: hidden;
          }
          .docs-sidebar::-webkit-scrollbar { width: 4px; }
          .docs-sidebar::-webkit-scrollbar-thumb { background: #1c2e1c; border-radius: 4px; }
          .sidebar-inner { padding: 12px 0 20px; }
          .sidebar-group { margin-bottom: 2px; }
          .sidebar-group-label { font-size: 17px; font-weight: 700; letter-spacing: 0.08em; color: #3a5a3a; padding: 8px 20px 2px; text-transform: uppercase; }
          .sidebar-item {
            display: flex; align-items: center; gap: 10px;
            width: 100%; text-align: left; background: transparent; border: none;
            padding: 6px 20px; color: #ffffff !important; cursor: pointer;
            font-family: 'DM Sans', sans-serif; font-size: 20px;
            transition: all 0.15s; position: relative;
          }
          .sidebar-item:hover { background: #111811; color: #ffffff !important; }
          .sidebar-item.active { color: #39ff14 !important; font-weight: 600; background: #0f1f0f; }
          .sidebar-icon { font-size: 24px; width: 20px; text-align: center; flex-shrink: 0; }
          .active-bar { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 60%; background: #39ff14; border-radius: 2px 0 0 2px; }
          .sidebar-footer { margin-top: 16px; padding: 12px 20px 0; border-top: 1px solid #1c2e1c; }
          .powered-by { display: flex; align-items: center; gap: 8px; color: #3a5a3a !important; font-size: 12px; }
          .powered-by span { color: #3a5a3a !important; }

          /* MAIN */
          .docs-main { overflow-y: auto; overflow-x: hidden; background: #0c0f0c; }
          .docs-main::-webkit-scrollbar { width: 6px; }
          .docs-main::-webkit-scrollbar-thumb { background: #1c2e1c; border-radius: 4px; }
          .docs-content { max-width: 780px; padding: 30px 36px 60px; margin: 0 auto; }

          .docs-content h1 { font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800; color: #ffffff !important; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em; }
          .docs-content h2 { font-family: 'Syne', sans-serif; font-size: 21px; font-weight: 700; color: #ffffff !important; margin: 40px 0 16px; letter-spacing: -0.01em; }
          .docs-content h3 { font-size: 15px; font-weight: 600; color: #ffffff !important; margin-bottom: 8px; }
          p { font-size: 15px; line-height: 1.75; color: #8aaa8a; margin-bottom: 16px; }
          strong { color: #e0f0e0; }
          ul, ol { padding-left: 20px; }
          li { font-size: 15px; line-height: 1.7; color: #8aaa8a; margin-bottom: 6px; }
          .lead-text { font-size: 17px; color: #9aba9a; line-height: 1.7; margin-bottom: 32px; }

          /* CARDS */
          .card-grid { display: grid; gap: 14px; margin: 20px 0; }
          .card-grid.cols-2 { grid-template-columns: repeat(2,1fr); }
          .card-grid.cols-3 { grid-template-columns: repeat(3,1fr); }
          .card-grid.cols-1 { grid-template-columns: 1fr; }
          .card { background: #0e120e; border: 1px solid #1c2e1c; border-radius: 10px; padding: 20px; transition: border-color 0.2s, transform 0.2s; }
          .card:hover { border-color: #2a4a2a; transform: translateY(-1px); }
          .card-accent { border-left: 3px solid #39ff14; }
          .card-silver { border-top: 3px solid #aaa; }
          .card-gold   { border-top: 3px solid #ffd700; }
          .card-diamond{ border-top: 3px solid #88eeff; }
          .card-icon { font-size: 24px; margin-bottom: 10px; }
          .card h3 { margin-bottom: 8px; }
          .card p { margin: 0; font-size: 14px; color: #6a8a6a; }

          /* CALLOUTS */
          .callout { display: flex; gap: 14px; padding: 18px 20px; border-radius: 10px; border: 1px solid; margin: 20px 0; }
          .callout-green  { background: #0a150a; border-color: #1a3a1a; border-left: 3px solid #39ff14; }
          .callout-blue   { background: #080e1a; border-color: #0e1a3a; border-left: 3px solid #4488ff; }
          .callout-orange { background: #150a00; border-color: #3a1800; border-left: 3px solid #ff8c1a; }
          .callout-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
          .callout h3 { margin-bottom: 8px; }
          .callout p  { margin: 0; }
          .callout ul { margin: 8px 0 0; }

          /* STEPS */
          .steps-list { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
          .step-row { display: flex; gap: 16px; align-items: flex-start; background: #0e120e; border: 1px solid #1c2e1c; border-radius: 10px; padding: 16px 20px; transition: border-color 0.2s; }
          .step-row:hover { border-color: #2a4a2a; }
          .step-num { width: 30px; height: 30px; background: #39ff14; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; flex-shrink: 0; font-family: 'Syne',sans-serif; box-shadow: 0 0 10px rgba(57,255,20,0.25); }
          .step-body h3 { margin-bottom: 4px; font-size: 14px; }
          .step-body p  { margin: 0; font-size: 14px; }

          /* ROADMAP */
          .roadmap { position: relative; padding-left: 36px; margin: 24px 0; }
          .roadmap::before { content: ''; position: absolute; left: 10px; top: 20px; bottom: 20px; width: 2px; background: linear-gradient(to bottom, #39ff14, #1a3a1a 80%); }
          .roadmap-item { display: flex; gap: 20px; margin-bottom: 20px; position: relative; }
          .roadmap-dot { width: 20px; height: 20px; border-radius: 50%; background: #1a2e1a; border: 2px solid #2a4a2a; position: absolute; left: -46px; top: 18px; }
          .roadmap-item.completed .roadmap-dot { background: #1a4a1a; border-color: #39ff14; }
          .roadmap-item.current   .roadmap-dot { background: #39ff14; border-color: #39ff14; box-shadow: 0 0 16px rgba(57,255,20,0.5); }
          .roadmap-content { background: #0e120e; border: 1px solid #1c2e1c; border-radius: 10px; padding: 20px; width: 100%; }
          .roadmap-item.current .roadmap-content { border-color: #2a5a2a; }
          .roadmap-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px; }
          .roadmap-header h3 { margin: 0; }
          .status-pill { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; border: 1px solid; white-space: nowrap; }
          .status-pill.completed { background: #1a3a1a; color: #5a9a5a; border-color: #2a5a2a; }
          .status-pill.current   { background: #1a3a1a; color: #39ff14; border-color: #39ff14; }
          .status-pill.upcoming,
          .status-pill.future    { background: #111811; color: #4a6a4a; border-color: #1c2e1c; }

          /* TABLE */
          .table-wrapper { margin: 24px 0; overflow-x: auto; }
          .rewards-table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 380px; }
          .rewards-table th { text-align: left; padding: 10px 14px; background: #0e120e; color: #5a7a5a; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #1c2e1c; }
          .rewards-table td { padding: 11px 14px; border-bottom: 1px solid #141e14; color: #8aaa8a; }
          .rewards-table tr:last-child td { border-bottom: none; }
          .rewards-table tr:hover td { background: #0e120e; }
          .tier-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 6px; font-size: 12px; font-weight: 600; }
          .tier-badge.silver  { background: #1a1a1a; color: #bbb;    border: 1px solid #333; }
          .tier-badge.gold    { background: #1a1500; color: #ffd700; border: 1px solid #3a3000; }
          .tier-badge.diamond { background: #001520; color: #88eeff; border: 1px solid #003040; }

          /* CONTRACT */
          .contract-block { background: #0e120e; border: 1px solid #1c2e1c; border-radius: 12px; padding: 24px; margin: 24px 0; }
          .contract-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #4a7a4a; margin-bottom: 12px; }
          .contract-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
          .contract-code { flex: 1; min-width: 0; background: #080c08; border: 1px solid #1c2e1c; border-radius: 8px; padding: 12px 14px; font-family: 'Courier New',monospace; font-size: 14px; color: #39ff14; word-break: break-all; display: block; }
          .copy-button { display: flex; align-items: center; gap: 6px; background: #39ff14; color: #000; border: none; border-radius: 8px; padding: 10px 16px; font-weight: 700; font-size: 13px; cursor: pointer; font-family: 'DM Sans',sans-serif; white-space: nowrap; transition: opacity 0.15s, transform 0.15s; flex-shrink: 0; }
          .copy-button:hover { opacity: 0.85; transform: translateY(-1px); }
          .contract-note { font-size: 13px; color: #4a6a4a; margin: 0; }

          /* FAQ */
          .faq-list { display: flex; flex-direction: column; gap: 6px; margin: 24px 0; }
          .faq-item { background: #0e120e; border: 1px solid #1c2e1c; border-radius: 10px; overflow: hidden; transition: border-color 0.2s; }
          .faq-item:hover { border-color: #2a4a2a; }
          .faq-item[open] { border-color: #2a5a2a; }
          .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 15px 20px; cursor: pointer; font-size: 12px; font-weight: 600; color: #3a5a3a !important; list-style: none; user-select: none; gap: 12px; }
          .faq-question span { color: #3a5a3a !important; }
          .faq-question::-webkit-details-marker { display: none; }
          .faq-chevron { transition: transform 0.2s; flex-shrink: 0; color: #4a7a4a; }
          .faq-item[open] .faq-chevron { transform: rotate(180deg); }
          .faq-answer { padding: 0 20px 16px; border-top: 1px solid #1c2e1c; }
          .faq-answer p { margin: 12px 0 0; }

          /* HERO */
          .hero-banner { background: linear-gradient(135deg,#0a1a0a,#0f200f); border: 1px solid #1a3a1a; border-radius: 12px; padding: 24px; margin: 28px 0; position: relative; overflow: hidden; }
          .hero-banner::before { content: ''; position: absolute; top: -50%; right: -20%; width: 280px; height: 280px; background: radial-gradient(circle,rgba(57,255,20,0.06),transparent 70%); pointer-events: none; }
          .hero-badge { display: inline-block; font-size: 12px; font-weight: 700; color: #39ff14; background: rgba(57,255,20,0.08); border: 1px solid rgba(57,255,20,0.2); border-radius: 20px; padding: 4px 12px; margin-bottom: 10px; }
          .hero-banner p { color: #8aaa8a; margin: 0; font-size: 15px; }

          /* NEXT/PREV */
          .next-nav { display: flex; gap: 12px; margin-top: 64px; padding-top: 28px; border-top: 1px solid #1c2e1c; flex-wrap: wrap; }
          .next-btn { flex: 1; min-width: 140px; display: flex; align-items: center; gap: 12px; background: #0e120e; border: 1px solid #1c2e1c; border-radius: 10px; padding: 14px 18px; cursor: pointer; font-family: 'DM Sans',sans-serif; color: #c8e8c8; transition: all 0.2s; text-align: left; }
          .next-btn:hover { border-color: #39ff14; background: #0f1f0f; }
          .next-btn:last-child { justify-content: flex-end; text-align: right; }
          .next-label { font-size: 12px; color: #4a7a4a; margin-bottom: 3px; }
          .next-title { font-size: 14px; font-weight: 600; color: #ffffff; }

          /* RIGHT TOC */
          .docs-toc { border-left: 1px solid #1c2e1c; background: #0e120e; position: sticky; top: 60px; height: calc(100vh - 60px); overflow-y: auto; overflow-x: hidden; }
          .docs-toc::-webkit-scrollbar { width: 0px; display: none; }
          .docs-toc { scrollbar-width: none; -ms-overflow-style: none; }
          .toc-inner { padding: 20px 14px; }
          .toc-label { font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #3a5a3a; margin-bottom: 12px; }
          .toc-item { display: block; font-size: 17px; color: #5a7a5a; text-decoration: none; padding: 3px 0 3px 12px; border-left: 2px solid transparent; transition: all 0.15s; line-height: 1.4; }
          .toc-item:hover { color: #b8d8b8; border-left-color: #2a4a2a; }
          .toc-item.active { color: #39ff14; border-left-color: #39ff14; }

          /* BACKDROP */
          .backdrop { position: fixed; inset: 60px 0 0 0; background: rgba(0,0,0,0.65); z-index: 30; backdrop-filter: blur(2px); }

          /* RESPONSIVE */
          @media (max-width: 1100px) {
            .docs-toc { display: none; }
            .docs-body { grid-template-columns: 320px 1fr; }
          }

          @media (max-width: 768px) {
            .hamburger { display: flex; }
            .brand-tag { display: none; }
            .docs-body { grid-template-columns: 1fr; }
            .docs-sidebar {
              position: fixed; top: 60px; left: 0; bottom: 0;
              width: 280px; z-index: 40;
              transform: translateX(-100%);
              transition: transform 0.25s ease;
              height: auto;
            }
            .docs-sidebar.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0,0,0,0.6); }
            .docs-content { padding: 24px 20px 60px; }
            h1 { font-size: 26px; }
            h2 { font-size: 18px; }
            .card-grid.cols-2,
            .card-grid.cols-3 { grid-template-columns: 1fr; }
            .roadmap { padding-left: 28px; }
            .roadmap-dot { left: -38px; }
          }

          @media (max-width: 480px) {
            .docs-content { padding: 16px 14px 60px; }
            h1 { font-size: 22px; }
            .card { padding: 14px; }
            .step-row { padding: 13px 14px; }
            .faq-question { padding: 13px 16px; font-size: 14px; }
            .callout { padding: 14px 16px; }
          }
        `}</style>
      </div>
    );
  }