import React from "react";

interface ClaimPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimPopup: React.FC<ClaimPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay airdrop-popup">
      <div className="popup-content airdrop-content">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(0, 255, 127, 0.3),
                          0 0 40px rgba(0, 255, 127, 0.2),
                          0 0 60px rgba(0, 255, 127, 0.1);
            }
            50% { 
              box-shadow: 0 0 30px rgba(0, 255, 127, 0.5),
                          0 0 60px rgba(0, 255, 127, 0.3),
                          0 0 90px rgba(0, 255, 127, 0.2);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .airdrop-popup {
            animation: fadeInUp 0.4s ease-out;
          }
          
          .airdrop-content {
            position: relative;
            overflow: hidden;
          }
          
          .airdrop-content::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 30%,
              rgba(0, 255, 127, 0.05) 50%,
              transparent 70%
            );
            animation: shimmer 3s infinite;
          }
          
          .airdrop-icon {
            animation: float 3s ease-in-out infinite;
            filter: drop-shadow(0 0 20px rgba(0, 255, 127, 0.6));
          }
          
          .coming-soon-text {
            background: linear-gradient(
              90deg,
              #00ff7f 0%,
              #4a90e2 50%,
              #00ff7f 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 2s linear infinite;
            font-family: var(--font-heading);
            font-size: 2rem;
            margin: 20px 0;
            text-align: center;
          }
          
          .airdrop-badge {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(0, 255, 127, 0.1);
            border: 2px solid var(--primary-color);
            border-radius: 20px;
            color: var(--primary-color);
            font-weight: bold;
            animation: glow 2s ease-in-out infinite;
            margin: 10px 0;
          }
          
          .pixel-border {
            border: 3px solid;
            border-image: linear-gradient(45deg, #00ff7f, #4a90e2, #00ff7f) 1;
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            color: '#f5ececff',
            fontFamily: 'var(--font-heading)',
            fontSize: '2.8rem',
            margin: '0 0 10px 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
             AIRDROP 
          </h2>
          
          <div className="airdrop-badge">
            SEASON 1
          </div>
          
          <div style={{ 
            margin: '30px 0',
            textAlign: 'center'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/gold.png"
              alt="Airdrop" 
              className="airdrop-icon"
              style={{ 
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                margin: '0 auto'
              }} 
            />
          </div>
          
          <h3 className="coming-soon-text">
            COMING SOON
          </h3>
          
          <div className="popup-message" style={{
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(0, 255, 127, 0.05)',
            borderRadius: '12px',
            margin: '2px 0'
          }}>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#c0c0c0',
              marginBottom: '1px',
              lineHeight: '1.6'
            }}>
              Get ready for the biggest POKEPIXEL airdrop!
            </p>
            <p style={{ 
              fontSize: '1.95rem',
              color: '#a0a0a0',
              marginBottom: '10px'
            }}>
              🎮 Play the game<br/>
              💎 Collect rare items<br/>
              🏆 Complete quests<br/>
              🚀 Earn rewards
            </p>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(74, 144, 226, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(74, 144, 226, 0.3)'
            }}>
              <p style={{ 
                fontSize: '0.9rem',
                color: '#4a90e2',
                margin: 0,
                fontWeight: 'bold'
              }}>
                📢 Follow US for updates!
              </p>
            </div>
          </div>

          <div className="popup-actions">
            <button 
              className="popup-button pixel-border" 
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 127, 0.2) 0%, rgba(74, 144, 226, 0.2) 100%)',
                color: '#00ff7f',
                borderRadius: '8px',
                padding: '14px 32px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}
            >
              GOT IT!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimPopup;