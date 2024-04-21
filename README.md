# solana-bundle
Fastest script for solana to deploy &amp; snipe from 27 different wallets in ms from launch using JITO and on-chain program.
Has prompt features as in [prompts.png](https://github.com/bigmovers/solana-bundle/blob/main/prompts.png?raw=true)


**TELEGRAM** for contact & **POC**(Proof of Concept): [@benoriz0](https://t.me/benoriz0)

**Other tools**
- Volume Maker
- Non-JITO Bundler
- LP Manager
- Telegram Cloner

## Features

- **Token Deployment**: Automate the deployment of new tokens on the Solana blockchain.
- **Market Creation**: Easily create markets with a lower cost of 0.3 SOL instead of 3 SOL.
- **Multiple Wallet Operations**: Utilize up to 27 different wallets to perform instant market operations programatically.
- **Comprehensive Trading Strategies**: From simple sell orders to sophisticated strategies involving a percentage of the supply.
- **Liquidity Management**: Options to add and remove liquidity effectively.
- **Guaranteed First Buys**: First 27 buys of the coin will always be yours and completely undetected using different keypairs and fee payer.
- **Comprehensive Documentation**: Even if you have no code experience, you will still be able to deploy and snipe using the easy prompts and the documentation attached.
  

## Overview
This guide outlines the process for managing market creation and transactions using Solana's bundler. It is crucial to maintain minimal SOL balances in deployer wallets due to the spammy nature of market creation. Below are detailed instructions for setting up your environment and executing scripts in a sequential manner.

### Initial Setup

1. **Install Dependencies**
   ```bash
   npm install

2. **Configuration**
    - Place your Blockengine keypair in `blockengine.json`.
    - Modify `config.ts`:
      - It includes two keypairs:
        1. One for handling SOL distribution fees.
        2. Another for creating the pool.

       These keypairs can be the same if desired.
3. **Run script**
   ```bash
   npx ts-node main.ts

## Script Functions

Execute these steps in sequential order. After executing each step, verify the transaction bundle has landed by checking the first included transaction on [Jito Explorer](https://explorer.jito.wtf/).

### A) Create Keypairs
Run this step as needed, not necessarily for every launch. Ensure the keypairs hold no SOL before proceeding.

### B) Premarket
Execute steps 2 through 6 in order. If a bundle does not land, re-execute the step with a higher tip.

### C) Create Pool
Repeatedly invoke the pool creation function if it fails to land initially. Increasing the tip or repeated attempts are recommended.

### D) Sell Features
After the pool is live, proceed to either:
  - Sell all keypairs at once and reclaim WSOL in the subsequent step.
  - Gradually sell portions of the token supply on demand. This process involves transferring a percentage of each keypair's token balance to the fee payers and selling it all in one bundle.

### E) LP Removal
This step removes the liquidity pool without burning the liquidity provider tokens.

## Notes

- Ensure you maintain a minimal SOL balance in your deployer wallets.
- Monitor each transaction bundle to confirm landing using the suggested link to the explorer.
- Consider adjusting the tip to ensure transactions land promptly.

### Main Menu

```bash
Menu:
1. Create Keypairs
2. Pre Launch Checklist
3. Create Pool Bundle
4. Sell All Buyers
5. Sell % of Supply
6. Remove Liquidity
Type 'exit' to quit.
```

### Buyer UI
```
1. Create Market (0.3 SOL)
2. Create LUT and WSOL ATAs Bundle
3. Extend LUT Bundle
4. Create ATAs and Send SOL Bundle
5. Simulate LP Buys (Get exact amounts)
6. Send WSOL Bundle
7. Close WSOL Accounts to deployer
```
