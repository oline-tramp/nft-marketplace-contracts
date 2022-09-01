import { AccountType, CollectionType, deployAccount, deployNFT, deployTokenRoot, deployCollection, deployAuctionRoot, CallbackType, sleep} from "./utils";
import { AuctionRoot } from "./wrappers/auctionRoot";
import { Auction } from "./wrappers/auction";
import { NftC } from "./wrappers/nft";
import { Token } from "./wrappers/token";
import { TokenWallet } from "./wrappers/token_wallet";

const logger = require('mocha-logger');
const { expect } = require('chai');

let account1: AccountType;
let account2: AccountType;
let account3: AccountType;

let collection: CollectionType;
let nft: NftC;

let tokenRoot: Token;
let tokenWallet1: TokenWallet;
let tokenWallet2: TokenWallet;

let auctionRoot: AuctionRoot;
let auction: Auction;

describe("Test Auction contract", async function () {
    it('Deploy account', async function () {
        account1 = await deployAccount(0, 20);
        account2 = await deployAccount(1, 10);
        account3 = await deployAccount(2, 10);
    });

    it('Deploy NFT-Collection', async function () {
        collection = await deployCollection(account1,);
        logger.log(`Nft Collection address: ${collection.address.toString()}`);
    });

    it('Deploy NFT-s', async function () {
        nft = await deployNFT(account1, collection, "Test name", "Test name NFT", "https://", "https://", account2);
        logger.log(`Nft address: ${nft.address.toString()}`);
    });

    it('Deploy TIP-3 token', async function () {
        tokenRoot = await deployTokenRoot('Test', 'Test', account1);
    });

    it('Mint TIP-3 token to account', async function () {
        tokenWallet1 = await tokenRoot.mint(10000000000, account2);
        tokenWallet2 = await tokenRoot.mint(50000000000, account3);
    });

    it('Deploy AuctionRootTip3', async function () {
        auctionRoot = await deployAuctionRoot(account1);
        logger.log("");
    });

    describe("Auction completed", async function () {
        it('Deploy Auction', async function () {
            let payload: string;
            payload = (await auctionRoot.buildPayload(tokenRoot, 5000000000, Math.round(Date.now() / 1000), 30)).toString();

            let callback: CallbackType;
            callback = [
                auctionRoot.address,
                {
                    value: locklift.utils.toNano(5),
                    payload: payload,
                },
            ];

            const callbacks: CallbackType[] = [];
            callbacks.push(callback);

            await nft.changeManager(account2, auctionRoot.address, account2.address, callbacks);
            const auctionDeployedEvent = await auctionRoot.getEvent('AuctionDeployed') as any;

            logger.log(auctionDeployedEvent.offerAddress);
            auction = await Auction.from_addr(auctionDeployedEvent.offerAddress, account2);
            logger.log(`AuctionTip3 address: ${auction.address.toString()}`);

            await tokenWallet2.transfer(5000000000, auction.address, true, '', locklift.utils.toNano(2));

            const bidPlacedEvent = await auction.getEvent('BidPlaced') as any;
            expect(bidPlacedEvent.buyerAddress.toString()).to.be.eq(await account3.address.toString());

            await sleep(30000);
            await auction.finishAuction(account2);
            
            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account3.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account3.address.toString());
            
            await auction.getEvent('AuctionComplete');
            logger.log("");
        });
    });

    describe("Auction cancel from creater", async function () {
        it('Deploy Auction', async function () {
            let payload: string;
            payload = (await auctionRoot.buildPayload(tokenRoot, 1000000000, Math.round(Date.now() / 1000), 30)).toString();

            let callback: CallbackType;
            callback = [
                auctionRoot.address,
                {
                    value: locklift.utils.toNano(5),
                    payload: payload,
                },
            ];

            const callbacks: CallbackType[] = [];
            callbacks.push(callback);

            await nft.changeManager(account3, auctionRoot.address, account3.address, callbacks);
            
            let event = await auctionRoot.getEvent('AuctionDeployed') as any;
            logger.log(event.offerAddress);
            auction = await Auction.from_addr(event.offerAddress, account2);
            logger.log(`AuctionTip3 address: ${auction.address.toString()}`);

            await tokenWallet2.transfer(5000000000, auction.address, true, '', locklift.utils.toNano(2));
            
            await sleep(30000);
            await auction.finishAuction(account2);
            
            event = await nft.getEvent('ManagerChanged');
            expect(event.newManager.toString()).to.be.eq(account3.address.toString());
            await auction.getEvent('AuctionCancelled');
    
        });
    });
});