pokepixel

Pokepixel is a Web3 pixel adventure game built with React and TypeScript, inspired by classic Pokemon Red/Blue gameplay. It recreates the nostalgic experience in the browser while integrating real on-chain rewards powered by Solana.

Pokepixel is fully web-based and also compatible with the PSG1 (Play Solana Gen-1) handheld gaming console, enabling cross-platform Web3 gameplay.

<img width="1675" alt="image" src="https://github.com/papes11/pokepixel/blob/80de266b080c9bf8ce375139cfcb8f914a4ba4bf/Screenshot%20(137).png" />
Features

🎮 Classic pixel adventure gameplay

🗺️ Multiple maps and interactive NPCs

📦 Mystery box reward system (earn SOL or Pokepixel)

⚡ On-chain reward logic powered by Solana

🎮 Compatible with PSG1 handheld console

💰 Real asset ownership (SOL & Pokepixel tokens)

📱 Responsive GameBoy-style interface

💾 Save/Load game functionality

📦 Item and inventory system

🎯 Trainer & wild encounters

📱 Mobile-friendly controls

PSG1 Integration

Pokepixel runs both in the browser and on the PSG1 (Play Solana Gen-1) Web3 gaming console.

When played on PSG1:

🎮 Native console gameplay experience

🔐 Integrated Solana wallet support

⚡ Faster interaction with on-chain rewards

🎁 Optimized / higher reward incentives for console players

This enables Pokepixel to bridge traditional gaming hardware with real blockchain rewards.

Solana Integration

Pokepixel uses Solana for:

On-chain reward distribution

Token minting

Secure transaction verification

Wallet connectivity

Real-time asset ownership

All reward logic is powered by Solana’s fast and low-fee infrastructure, ensuring smooth gameplay without disrupting the user experience.

Tech Stack

React 18

TypeScript

Next.js

Solana Web3.js

Redux Toolkit

Styled Components

Getting Started
Prerequisites

Node.js (v14 or higher)

Yarn package manager

Installation
git clone https://github.com/yourusername/.git
cd pokepixel

yarn install

yarn start


The game will be available at:

http://localhost:3000

Controls

Arrow Keys: Move character

Space: Menu / Pause

Enter: Confirm

Project Structure

/src/components – Game UI components

/src/maps – Map data & configurations

/src/state – Redux store

/src/assets – Sprites, music, assets

/src/styles – Global styles & themes

/src/solana – On-chain logic & integrations

Environment Variables

Create a .env.local file:

NEXT_PUBLIC_RECIPIENT_ADDRESS=Emo62hDD3NppK3K7A5PLF7CwEy2eJpCYnVM6zMwtjZ16
RPC_ENDPOINT=https://api.devnet.solana.com
MERKLE_TREE_ADDRESS=REPLACE_WITH_YOUR_TREE
SIGNER_SECRET_KEY=REPLACE_WITH_B58_SECRET_ON_SERVER
MINT_NAME=QN Pixel
MINT_SYMBOL=QNPIX
MINT_URI=https://qn-shared.quicknode-ipfs.com/ipfs/QmQFh6WuQaWAMLsw9paLZYvTsdL5xJESzcoSxzb6ZU3Gjx
MINT_SELLER_FEE_BPS=500


⚠️ Do NOT expose SIGNER_SECRET_KEY publicly.
On Vercel, configure secure environment variables in project settings.

Contributing

Fork the repository

Create a branch (git checkout -b feature/AmazingFeature)

Commit (git commit -m 'Add AmazingFeature')

Push (git push origin feature/AmazingFeature)

Open a Pull Request

Special Thanks

darkmurkrow (YouTube)

Brandon Smith (GameBoy Codepen)

luttje (Pokemon GameBoy CSS)

The Spriters Resource

Video Game Music

Strategy Wiki

License

MIT License – see LICENSE

Disclaimer

This is a fan-made project and is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokemon Company. All related content belongs to its respective owners.
