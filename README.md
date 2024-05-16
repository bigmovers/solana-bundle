# solana-bundle
Fastest script for solana to deploy &amp; snipe from 27 different wallets in ms from launch using JITO and on-chain program.
Has prompt features as in [prompts.png](https://github.com/bigmovers/solana-bundle/blob/main/prompts.png?raw=true)




https://github.com/bigmovers/solana-bundle/assets/165174061/be2b0a09-20ce-4923-84d4-4c28782cc788




**TELEGRAM** for contact & **POC**(Proof of Concept) & **VOUCHES**: [@benoriz0](https://t.me/benoriz0)

Price of tool is 15 SOL.

Support in running the tool is included in the price.

Watch out for other scammers on GitHub - they either sell my outdated program which has been closed or simply selling blank files.


**Other tools**
- Volume Maker
- Holders/Buyers Maker
- Non-JITO Bundler (3 buys)
- Pump.Fun Bundler(25 buys)
- LP Manager
- Telegram Cloner

  [@benoriz0](https://t.me/benoriz0)

## Features

- **Token Deployment**: Automate the deployment of new tokens on the Solana blockchain.
- **Market Creation**: Easily create markets with a lower cost of 0.3 SOL instead of 3 SOL.
- **Multiple Wallet Operations**: Utilize up to 27 different wallets to perform instant market operations programatically.
- **Comprehensive Trading Strategies**: From simple sell orders to sophisticated strategies involving a percentage of the supply.
- **Liquidity Management**: Options to add and remove liquidity effectively.
- **Guaranteed First Buys**: First 27 buys of the coin will always be yours and completely undetected using different keypairs and fee payer.
- **Comprehensive Documentation**: Even if you have no code experience, you will still be able to deploy and snipe using the easy prompts and the documentation attached.
  

## Overview
This guide outlines the process for managing market creation and transactions using Solana Bundler.

Below are detailed instructions for setting up your environment and executing prompts in a sequential manner.

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
      - These keypairs can be the same if desired.
    - Modify RPC URL with one that supports JITO(e.g. Helius)

3. **Run script**
   ```bash
   npx ts-node main.ts

## Script Functions

Execute these steps in sequential order. After executing each step, verify the transaction bundle has landed by checking the first included transaction on [Jito Explorer](https://explorer.jito.wtf/).

### A) Create Keypairs
Run this step as needed, not necessarily for every launch. Ensure the existent keypairs hold no SOL before proceeding because this will override them with new keypairs.

### B) Premarket
Execute steps 2 through 6 in order. If a bundle does not land, re-execute the step with a higher tip. Step 1 is optional because you can create a market through other methods as well.

### C) Create Pool
Repeatedly invoke the pool creation & bundling function. Increasing the tip and repeated attempts are recommended due to Solana congestion at peak times.

### D) Sell Features
After the pool is live, proceed to either:
  - Sell all keypairs at once and reclaim WSOL in the subsequent step.
  - Gradually sell portions of the token supply on demand. This process involves transferring a percentage of each keypair's token balance to the fee payers and selling it all in one bundle.

### E) LP Removal
This step removes liquidity from the market(if LP tokens are not burned)

## Notes

- Ensure you maintain a minimal SOL balance in your fee wallet so you can cover all the network fees.
- Monitor each transaction bundle to confirm landing using the suggested link to the explorer before proceeding to the next step.
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
