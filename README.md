# 🎮 POKEPIXEL

**Pokepixel** is a Web3 pixel adventure game built with React and TypeScript, inspired by classic Pokemon Red/Blue gameplay. It recreates the nostalgic experience in the browser while integrating real on-chain rewards powered by Solana.

Pokepixel is fully web-based and compatible with the **PSG1 (Play Solana Gen-1)** handheld gaming console.

---

## ✨ Features

- 🎮 Classic pixel adventure gameplay
- 🗺️ Multiple maps and interactive NPCs
- 📦 Mystery box reward system (earn SOL or Pokepixel)
- ⚡ On-chain reward logic powered by Solana
- 🎮 Compatible with PSG1 handheld console
- 💰 Real asset ownership (SOL & Pokepixel tokens)
- 📱 Responsive GameBoy-style interface
- 💾 Save/Load game functionality
- 📦 Item and inventory system
- 🎯 Trainer & wild encounters
- 📱 Mobile-friendly controls

---

## 🎮 PSG1 Integration

Pokepixel is designed to run on the **PSG1 (Play Solana Gen-1)** handheld gaming console, the first Solana-powered gaming device.

### About PSG1:

The PSG1 is a retro-futuristic handheld console that serves as the physical gateway to the Play Solana ecosystem, featuring:
- **Built-in hardware wallet** with fingerprint authentication
- **8GB RAM**, 128GB Flash storage
- **Touch LCD display** optimized for gaming
- **WiFi & Bluetooth** connectivity
- **Octa-core ARM CPU**

### Web-Based Integration:

As a web-based game built with Next.js and React, Pokepixel can run on PSG1 through:

**Browser Access:**
- 🌐 PSG1's built-in browser loads the game via URL
- 📱 Responsive design adapts to PSG1's display
- 🔗 Automatic wallet connection through PSG1's hardware wallet
- 💾 On-chain save data syncs across all devices

**Control Mapping:**
- **D-Pad** → Arrow Keys (Movement)
- **A Button** → Enter/Space (Confirm)
- **B Button** → Escape (Back/Cancel)
- **Start** → Menu
- **Select** → Options

### Play Solana SuperHUB:

Pokepixel integrates with the Play Solana ecosystem through:

1. **Play<Gate>** - Submit to the Play Solana Gaming Library for distribution
2. **Play<ID>** - On-chain identity and progression tracking
3. **Play<DEX>** - In-game token swaps and DeFi integration
4. **$PLAY Token** - Ecosystem rewards and governance

### Cross-Platform Play:

| Feature | Desktop Browser | Mobile Browser | PSG1 Console |
|---------|----------------|----------------|--------------|
| Full Game Access | ✅ | ✅ | ✅ |
| Wallet Integration | Manual Connect | Manual Connect | Auto-Connect |
| Controls | Keyboard | Touch | Physical Buttons |
| Save Progress | On-Chain | On-Chain | On-Chain |
| Hardware Wallet | ❌ | ❌ | ✅ Built-in |
| Portability | ❌ | ✅ | ✅ |
| **Reward Multiplier** | **1x** | **1x** | **3x** |

### Reward System:

Pokepixel features a tiered reward system that incentivizes PSG1 console players:

- 🖥️ **Desktop Browser** - 1x base rewards
- 📱 **Mobile Browser** - 1x base rewards  
- 🎮 **PSG1 Console** - 3x enhanced rewards

**Why PSG1 gets 3x rewards?**
- Supports the Play Solana ecosystem
- Uses dedicated gaming hardware
- Built-in hardware wallet security
- Contributes to network growth
- Early adopter benefits

**Rewards include:**
- SOL from mystery boxes
- Pokepixel tokens
- Rare in-game items
- Exclusive NFT drops
- Achievement bonuses

### Future Integration Plans:

- **Unity Port** - Native PSG1 app using [PlaySolana-Unity.SDK](https://developers.playsolana.com)
- **Play<Gate> Submission** - Official listing in Play Solana Gaming Library
- **PSG1 Optimization** - Enhanced graphics and controls for console
- **Exclusive Rewards** - Special items and events for PSG1 players

> **Learn More:** [Play Solana Litepaper](https://www.playsolana.com/litepaper) | [Developer Docs](https://developers.playsolana.com)

---

## ⚡ Solana Integration

Pokepixel uses Solana for:

- On-chain reward distribution
- Token minting
- Secure transaction verification
- Wallet connectivity
- Real-time asset ownership

All reward logic is powered by Solana's fast and low-fee infrastructure, ensuring smooth gameplay without disrupting the user experience.

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Next.js**
- **Solana Web3.js**
- **Redux Toolkit**
- **Styled Components**

---

## 🚀 Getting Started

💰 Real asset ownership (SOL & Pokepixel tokens)

📱 Responsive GameBoy-style interface

💾 Save/Load game functionality

```bash
git clone https://github.com/yourusername/pokepixel.git
cd pokepixel
yarn install
yarn start

The game will be available at: **http://localhost:3000**

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** | Move character |
| **Space** | Menu / Pause |
| **Enter** | Confirm |

---

## 📁 Project Structure

```
/src/components  – Game UI components
/src/maps        – Map data & configurations
/src/state       – Redux store
/src/assets      – Sprites, music, assets
/src/styles      – Global styles & themes
/src/solana      – On-chain logic & integrations
```

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_RECIPIENT_ADDRESS=Emo62hDD3NppK3K7A5PLF7CwEy2eJpCYnVM6zMwtjZ16
RPC_ENDPOINT=https://api.devnet.solana.com
MERKLE_TREE_ADDRESS=REPLACE_WITH_YOUR_TREE
SIGNER_SECRET_KEY=REPLACE_WITH_B58_SECRET_ON_SERVER
MINT_NAME=QN Pixel
MINT_SYMBOL=QNPIX
MINT_URI=https://qn-shared.quicknode-ipfs.com/ipfs/QmQFh6WuQaWAMLsw9paLZYvTsdL5xJESzcoSxzb6ZU3Gjx
MINT_SELLER_FEE_BPS=500

⚠️ **Do NOT expose `SIGNER_SECRET_KEY` publicly.**  
On Vercel, configure secure environment variables in project settings.

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Special Thanks

- **darkmurkrow** (YouTube)
- **Brandon Smith** (GameBoy Codepen)
- **luttje** (Pokemon GameBoy CSS)
- **The Spriters Resource**
- **Video Game Music**
- **Strategy Wiki**

---

## 📄 License

**MIT License** – see [LICENSE](LICENSE)

---

## ⚠️ Disclaimer

This is a fan-made project and is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokemon Company. All related content belongs to its respective owners.
