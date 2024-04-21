import { connection, wallet, walletconn, RayLiqPoolv4, tipAcct } from "../config";
import { PublicKey, ComputeBudgetProgram, VersionedTransaction,  TransactionInstruction, TransactionMessage, SystemProgram, Keypair, LAMPORTS_PER_SOL, AddressLookupTableAccount } from '@solana/web3.js';
import { DEFAULT_TOKEN, LP_MINT_ASSOCIATED_SEED, PROGRAMIDS, addLookupTableInfo, makeTxVersion } from './clients/constants';
import { TOKEN_PROGRAM_ID, getMint } from '@solana/spl-token';
import { Liquidity, MARKET_STATE_LAYOUT_V3, Token, TokenAmount, Market, MAINNET_PROGRAM_ID } from "@raydium-io/raydium-sdk";
import { BN } from "@project-serum/anchor";
import { ammCreatePool, getWalletTokenAccount } from "./clients/raydiumUtil";
import { promises as fsPromises } from 'fs';
import { loadKeypairs } from './createKeys';
import { lookupTableProvider } from "./clients/LookupTableProvider";
//import { getRandomTipAccount } from "./clients/config";
import { searcherClient } from "./clients/jito";
import { Bundle as JitoBundle } from 'jito-ts/dist/sdk/block-engine/types.js';
import promptSync from 'prompt-sync';
import * as spl from '@solana/spl-token';
import { IPoolKeys } from './clients/interfaces';
import { derivePoolKeys } from "./clients/poolKeysReassigned"; 
import path from 'path';
import fs from 'fs';


const prompt = promptSync();
const keyInfoPath = path.join(__dirname, 'keyInfo.json');

type LiquidityPairTargetInfo = {
    baseToken: Token;
    quoteToken: Token;
    targetMarketId: PublicKey;
};

type AssociatedPoolKeys = {
    lpMint: PublicKey;
    id: PublicKey;
    baseMint: PublicKey;
    quoteMint: PublicKey;
};
    
export async function buyBundle() {
    const bundledTxns: VersionedTransaction[] = [];
    const keypairs: Keypair[] = loadKeypairs();

    let poolInfo: { [key: string]: any } = {};
    if (fs.existsSync(keyInfoPath)) {
        const data = fs.readFileSync(keyInfoPath, 'utf-8');
        poolInfo = JSON.parse(data);
    }

    const lut = new PublicKey(poolInfo.addressLUT.toString());

    const lookupTableAccount = (
        await connection.getAddressLookupTable(lut)
    ).value;

    if (lookupTableAccount == null) {
        console.log("Lookup table account not found!");
        process.exit(0);
    }

    // -------- step 1: ask necessary questions for pool build --------
    const baseAddr = prompt('Token address: ') || '';
    const percentOfSupplyInput = prompt('% of your token balance in pool (Ex. 80): ') || '0';
    const solInPoolInput = prompt('# of SOL in LP (Ex. 10): ') || '0';
    const OpenBookID = prompt('OpenBook MarketID: ') || '';
    const jitoTipAmtInput = prompt('Jito tip in Sol (Ex. 0.01): ') || '0';
    const iterations = parseInt(prompt('Enter the number of iterations for bundle creation: ') || '0', 10);
    const delaySeconds = parseInt(prompt('Enter the delay between each iteration in seconds: ') || '0', 10);
    const jitoTipAmt = parseFloat(jitoTipAmtInput) * LAMPORTS_PER_SOL;
    const percentOfSupply = parseFloat(percentOfSupplyInput);
    const solInPool = parseFloat(solInPoolInput);



    let myToken = new PublicKey(baseAddr)
    let tokenInfo = await getMint(connection, myToken, 'finalized', TOKEN_PROGRAM_ID)
    
    const TokenBalance = await fetchTokenBalance(baseAddr, tokenInfo.decimals);
    const baseToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(tokenInfo.address), tokenInfo.decimals) // Token
    const quoteToken = DEFAULT_TOKEN.SOL // SOL
    const targetMarketId = new PublicKey(OpenBookID)



    for (let i = 0; i < iterations; i++) {
        // -------- step 2: create pool txn --------
        const startTime = Math.floor(Date.now() / 1000);
        const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)

        const marketBufferInfo: any = await connection.getAccountInfo(targetMarketId)
        const { 
            baseMint, 
            quoteMint, 
            baseLotSize, 
            quoteLotSize, 
            baseVault, 
            quoteVault, 
            bids, 
            asks, 
            eventQueue, 
            requestQueue 
        } = MARKET_STATE_LAYOUT_V3.decode(marketBufferInfo.data)

        let poolKeys: any = Liquidity.getAssociatedPoolKeys({
            version: 4,
            marketVersion: 3,
            baseMint,
            quoteMint,
            baseDecimals: tokenInfo.decimals,
            quoteDecimals: 9,
            marketId: targetMarketId,
            programId: PROGRAMIDS.AmmV4,
            marketProgramId: PROGRAMIDS.OPENBOOK_MARKET
        })
        poolKeys.marketBaseVault = baseVault;
        poolKeys.marketQuoteVault = quoteVault;
        poolKeys.marketBids = bids;
        poolKeys.marketAsks = asks;
        poolKeys.marketEventQueue = eventQueue;
        //console.log("Pool Keys:", poolKeys);

        // Ensure percentOfSupply and TokenBalance are scaled to integers if they involve decimals.
        const baseMintAmount = new BN(Math.floor((percentOfSupply / 100) * TokenBalance).toString());

        // Ensure solInPool is scaled to an integer if it involves decimals.
        const quoteMintAmount = new BN((solInPool * Math.pow(10, 9)).toString());

        // If you need to clone the BN instances for some reason, this is correct. Otherwise, you can use baseMintAmount and quoteMintAmount directly.
        const addBaseAmount = new BN(baseMintAmount.toString());
        const addQuoteAmount = new BN(quoteMintAmount.toString());

        // Fetch LP Mint and write to json
        const associatedPoolKeys = getMarketAssociatedPoolKeys({
            baseToken,
            quoteToken,
            targetMarketId,
        });
        await writeDetailsToJsonFile(associatedPoolKeys, startTime);


        [[ REDACTED ]]
        [[470 lines left]]
        [[this is only a file from the whole project]]

        [[ @benoriz0 on telegram]]
