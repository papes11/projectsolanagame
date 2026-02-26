# PSG1 Integration Guide – Pokepixel

The PSG1 (Play Solana Gen-1) is a Solana-powered handheld console with a built-in browser and hardware wallet. Pokepixel runs on it today via the browser, and we're planning a native Unity port down the road.

## How it works right now (Web-based)

Since Pokepixel is a Next.js app, it just loads in the PSG1's built-in Chromium browser. No special build needed — players go to pokepixel.xyz and it works. The hardware wallet auto-connects, so there's no manual wallet setup either.

### Detecting PSG1

```javascript
const isPSG1 = () => {
  return navigator.userAgent.includes('PSG1') || 
         window.playsolana !== undefined;
};
```

### Enabling PSG1 mode on app load

```javascript
// pages/_app.tsx
useEffect(() => {
  if (isPSG1()) {
    document.body.classList.add('psg1-mode');
    dispatch(setPlatform('psg1'));
    dispatch(setRewardMultiplier(3.0)); // PSG1 players get 3x rewards
  }
}, []);
```

### Reward multiplier

PSG1 players get 3x the normal rewards. The logic lives here:

```javascript
const getRewardMultiplier = (platform) => {
  switch(platform) {
    case 'psg1': return 3.0;
    default: return 1.0;
  }
};
```

### Button mapping

The PSG1's physical controls map to keyboard events the game already understands:

| PSG1 Button | Web Event | Action |
|-------------|-----------|--------|
| D-Pad Up | ArrowUp | Move up |
| D-Pad Down | ArrowDown | Move down |
| D-Pad Left | ArrowLeft | Move left |
| D-Pad Right | ArrowRight | Move right |
| A | Enter / Space | Confirm |
| B | Escape | Back |
| Start | Enter | Menu |
| Select | Tab | Options |

To hook up the gamepad API for physical button support:

```javascript
// src/app/emitter.ts
export const setupPSG1Controls = () => {
  window.addEventListener('gamepadconnected', (e) => {
    if (e.gamepad.id.includes('PSG1')) {
      enablePSG1Gamepad(e.gamepad);
    }
  });
};
```

### Display optimization

PSG1 runs at 800x480 landscape. Add this to handle it:

```css
@media (max-width: 800px) and (orientation: landscape) {
  .gameboy {
    width: 100vw;
    height: 100vh;
  }
  .display {
    max-width: 100%;
    max-height: 100%;
  }
}
```

### Bundle size / performance

Keep the initial bundle under 5MB and aim for under 3s load time. This config helps:

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@solana/web3.js'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          psg1Vendor: {
            name: 'psg1-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
};
```

## Native Unity Port (planned)

The web version works fine, but a native Unity build will give us offline support, better performance, haptics, and proper hardware acceleration. Here's the plan when we get to it.

### Dependencies

- Unity 2022.3 LTS
- PlaySolana-Unity.SDK
- Solana.Unity-SDK

### Core game manager

```csharp
// GameManager.cs
using UnityEngine;
using PlaySolana;

public class GameManager : MonoBehaviour
{
    private PSG1InputSystem inputSystem;
    
    void Start()
    {
        inputSystem = new PSG1InputSystem();
    }
    
    void Update()
    {
        if (inputSystem.GetButtonDown(PSG1Button.A))
            OnInteract();
        
        if (inputSystem.GetButtonDown(PSG1Button.B))
            OnCancel();
        
        Vector2 movement = inputSystem.GetDPadInput();
        if (movement != Vector2.zero)
            MovePlayer(movement);
    }
}
```

### Player movement

```csharp
// PlayerController.cs
using UnityEngine;
using PlaySolana;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    private PSG1InputSystem input;
    private Vector2 currentPosition;
    
    void Start()
    {
        input = FindObjectOfType<PSG1InputSystem>();
    }
    
    void Update()
    {
        Vector2 movement = input.GetDPadInput();
        if (movement != Vector2.zero)
            MoveToNextTile(movement);
    }
    
    void MoveToNextTile(Vector2 direction)
    {
        Vector2 targetPos = currentPosition + direction;
        if (CanMoveTo(targetPos))
            StartCoroutine(SmoothMove(targetPos));
    }
}
```

### Wallet connection

```csharp
// WalletManager.cs
using UnityEngine;
using Solana.Unity.SDK;
using PlaySolana;

public class WalletManager : MonoBehaviour
{
    private Account account;
    public bool IsConnected => account != null;
    public event System.Action OnWalletConnected;
    
    async void Start()
    {
        if (PSG1.IsRunningOnPSG1())
            await ConnectPSG1Wallet();
    }
    
    async Task ConnectPSG1Wallet()
    {
        account = await PSG1.GetHardwareWallet();
        if (account != null)
            OnWalletConnected?.Invoke();
    }
}
```

### 3x reward multiplier

```csharp
// RewardManager.cs
using UnityEngine;
using PlaySolana;

public class RewardManager : MonoBehaviour
{
    private float rewardMultiplier = 1.0f;
    
    void Start()
    {
        if (PSG1.IsRunningOnPSG1())
            rewardMultiplier = 3.0f;
    }
    
    public float CalculateReward(float baseReward)
    {
        return baseReward * rewardMultiplier;
    }
}
```

### Haptic feedback

```csharp
// HapticManager.cs
using PlaySolana;

public class HapticManager : MonoBehaviour
{
    public void OnBoxOpened() => PSG1.TriggerHaptic(HapticType.Success);
    public void OnBattleHit() => PSG1.TriggerHaptic(HapticType.Impact);
}
```

### Build command

```bash
# Android (ARM64) — PSG1 runs an Android-based OS
Unity -quit -batchmode -projectPath . -buildTarget Android -executeMethod BuildScript.BuildPSG1

# Sideload for testing
adb install pokepixel-psg1.apk
```

## Roadmap

**Done**
- Responsive layout
- web based beta online
- Wallet auto-connection
- Button mapping
- reward multiplier

**Next (1months)**
- PSG1 detection in prod
- Gamepad API integration
- PWA offline caching
- Haptics via Web Vibration API

**Unity port (1-months)**
- Setup project + install SDKs
- Port core gameplay to C#
- Wallet + transaction flow
- Simulator testing

**Native launch (1-months)**
- Beta on physical PSG1 hardware
- Performance pass
- Submit to Play<Gate>

## Play<Gate> submission checklist

Play<Gate> is the official PSG1 game store. When we're ready:

- Build format: .apk or .aab
- Min SDK: 30, Target SDK: 33
- File size under 500MB
- 5–10 screenshots + 30–60s trailer
- Solana program address on file
- Beta test results from 10+ users

## Resources

- [PlaySolana Dev Docs](https://developers.playsolana.com/)
- [Solana Unity SDK](https://github.com/magicblock-labs/Solana.Unity-SDK)
- [PSG1 Simulator](https://developers.playsolana.com/simulator)
- Dev support: dev@playsolana.com or Play Solana Discord
