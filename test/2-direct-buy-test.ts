import {
    AccountType,
    deployAccount,
    deployTokenRoot,
    deployCollectionAndMintNft,
    CallbackType,
    sleep,
    deployFactoryDirectBuy,
    deployAuctionRoot
} from "./utils";
import { FactoryDirectBuy, DirectBuy } from "./wrappers/directbuy";
import { NftC } from "./wrappers/nft";
import { Token } from "./wrappers/token";
import { TokenWallet } from "./wrappers/token_wallet";
import {BigNumber} from "bignumber.js";
import {Address, toNano} from "locklift";

const logger = require('mocha-logger');
const { expect } = require('chai');

let account1: AccountType;
let account2: AccountType;
let account3: AccountType;

let nft: NftC;

let tokenRoot: Token;
let tokenWallet2: TokenWallet;
let tokenWallet3: TokenWallet;

let factoryDirectBuy: FactoryDirectBuy;
let directBuy: DirectBuy;
let startBalanceTW2: number = 90000000000;
let startBalanceTW3: number = 90000000000;

type MarketFee = {
    numerator: number;
    denominator: number;
}
let fee: MarketFee;
let factoryDirectBuyTWAddress: Address;
let factoryDirectBuyTW: TokenWallet;
let startBalanceTWfactoryDirectBuy: BigNumber;

async function Callback(payload: string) {
    let callback: CallbackType;
    callback = [
        directBuy.address,
        {
            value: locklift.utils.toNano(2),
            payload: '',
        },
    ];
    const callbacks: CallbackType[] = [];
    callbacks.push(callback);
    return callbacks;
};

describe("Test DirectBuy contract", async function () {
    it('Deploy account', async function () {
        account1 = await deployAccount(0, 30);
        account2 = await deployAccount(1, 60);
        account3 = await deployAccount(2, 60);
    });

    it('Deploy NFT-Collection and Mint Nft', async function () {
        let accForNft: AccountType[] = [];
        accForNft.push(account2);

        const [, nftS] = await deployCollectionAndMintNft(account1, 1, "nft_to_address.json", accForNft);
        nft = nftS[0];
    });

    it('Deploy TIP-3 token', async function () {
        tokenRoot = await deployTokenRoot('Test', 'Test', account1);
    });

    it('Mint TIP-3 token to account', async function () {
        tokenWallet2 = await tokenRoot.mint(startBalanceTW2, account2);
        tokenWallet3 = await tokenRoot.mint(startBalanceTW3, account3);
    });

    it('Deploy FactoryDirectBuy with fee denominator zero', async function () {
        let fee = {
            numerator: 10,
            denominator: 0
        } as MarketFee;
        const factoryDirectBuyExitCode = await deployFactoryDirectBuy(account1, fee).catch(e => e.transaction.transaction.exitCode);
        expect(factoryDirectBuyExitCode.toString()).to.be.eq('110');
    });

    it('Deploy FactoryDirectBuy', async function () {
        let fee = {
            numerator: 10,
            denominator: 100
        } as MarketFee;
        factoryDirectBuy = await deployFactoryDirectBuy(account1, fee);
        const dBMFChanged = await factoryDirectBuy.getEvent('MarketFeeDefaultChanged') as any;
        expect(dBMFChanged._fee).to.eql(fee);
    });
    it('Get address token wallet for FactoryDirectBuy', async function () {
        factoryDirectBuyTWAddress = await tokenRoot.walletAddr(factoryDirectBuy.address);
        factoryDirectBuyTW = await TokenWallet.from_addr(factoryDirectBuyTWAddress, null);
        startBalanceTWfactoryDirectBuy = new BigNumber(await factoryDirectBuyTW.balanceSafe());
    });

    it( 'Get market fee',async function () {
        fee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
    });

    describe("DirectBuy completed", async function () {
        it('Deploy limited DirectBuy and success', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 5));
            await tokenWallet3.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account3);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            let callbacks = await Callback(payload);
            await nft.changeManager(account2, directBuy.address, account2.address, callbacks);
            const dBFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dBFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account3.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account3.address.toString());

            let currentFee = new BigNumber(spentToken).div(fee.denominator).times(fee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW2).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            startBalanceTW2 = startBalanceTW2 +spentToken - currentFee.toNumber();
            startBalanceTW3 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
        it('Deploy future limited DirectBuy and success', async function () {
            const spentToken: number = 1000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000) + 5, 8));
            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account3);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await sleep(5000);
            let callbacks = await Callback(payload);
            await nft.changeManager(account3, directBuy.address, account3.address, callbacks);

            const dBFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dBFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account2.address).toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account2.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account2.address.toString());

            let currentFee = new BigNumber(spentToken).div(fee.denominator).times(fee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW3).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            startBalanceTW3 = startBalanceTW3 + spentToken - currentFee.toNumber();
            startBalanceTW2 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
        it('Deploy unlimited DirectBuy and success', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 0));
            await tokenWallet3.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account3);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            sleep(5000);
            let callbacks = await Callback(payload);
            await nft.changeManager(account2, directBuy.address, account2.address, callbacks);
            const dBFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dBFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account3.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account3.address.toString());

            let currentFee = new BigNumber(spentToken).div(fee.denominator).times(fee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW2).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            startBalanceTW2 = startBalanceTW2 + spentToken - currentFee.toNumber();
            startBalanceTW3 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
        it('Deploy future unlimited DirectBuy and success', async function () {
            const spentToken: number = 1000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000) + 5, 0));
            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account3);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await sleep(5000);
            let callbacks = await Callback(payload);
            await nft.changeManager(account3, directBuy.address, account3.address, callbacks);

            const dBFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dBFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account2.address).toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account2.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account2.address.toString());

            let currentFee = new BigNumber(spentToken).div(fee.denominator).times(fee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW3).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            startBalanceTW3 = startBalanceTW3 + spentToken - currentFee.toNumber();
            startBalanceTW2 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
        it('Deploy future DirectBuy and aborted then success', async function () {
            const spentToken: number = 1000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 8));
            await tokenWallet3.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbActive = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbActive.to.toString()).to.be.eq('2');

            let callbacks = await Callback(payload);
            await nft.changeManager(account2, directBuy.address, account2.address, callbacks);
            expect(dbActive.to.toString()).to.be.eq('2');

            await sleep(1000);
            await nft.changeManager(account2, directBuy.address, account2.address, callbacks);

            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account3.address.toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account3.address.toString());

            let currentFee = new BigNumber(spentToken).div(fee.denominator).times(fee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW2).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq((startBalanceTW3 - spentToken).toString());

            startBalanceTW2 = startBalanceTW2 + spentToken - currentFee.toNumber();
            startBalanceTW3 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
    });

    describe("DirectBuy cancel", async function () {
        it('Deploy DirectBuy and cancel', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 5));

            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await directBuy.closeBuy(0);

            const dbClosed = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbClosed.to.toString()).to.be.eq('4');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const spentTokenWallet2BalanceEnd = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2BalanceEnd.toString()).to.be.eq((startBalanceTW2).toString());
        });
        it('Deploy DirectBuy and timeout', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 10));

            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await directBuy.closeBuy(0);

            const dbClosed = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbClosed.to.toString()).to.be.eq('4');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const spentTokenWallet2BalanceEnd = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2BalanceEnd.toString()).to.be.eq((startBalanceTW2).toString());
        });
        it('Deploy DirectBuy and instantly cancel', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round((Date.now() / 1000) + 11), 5));

            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await directBuy.closeBuy(0);

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString())

            const dbClosed = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbClosed.to.toString()).to.be.eq('4');

            const spentTokenWallet2BalanceEnd = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2BalanceEnd.toString()).to.be.eq((startBalanceTW2).toString());
        });
        it('Deploy DirectBuy and expire after sending NFT', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 1));
            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await sleep(1000);
            let callbacks = await Callback(payload);
            await nft.changeManager(account3, directBuy.address, account3.address, callbacks);

            const dbClosed = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbClosed.to.toString()).to.be.eq('5');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const spentTokenWallet2BalanceEnd = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2BalanceEnd.toString()).to.be.eq((startBalanceTW2).toString());

            const spentTokenWallet3 = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3.toString()).to.be.eq((startBalanceTW3).toString());
        });
        it('Deploy DirectBuy and expire by timeout', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 1));
            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            const spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account2);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            await sleep(1000);
            await directBuy.finishBuy(account3, 0);

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const dbClosed = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbClosed.to.toString()).to.be.eq('5');

            const spentTokenWallet2BalanceEnd = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2BalanceEnd.toString()).to.be.eq((startBalanceTW2).toString());

            const spentTokenWallet3 = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3.toString()).to.be.eq((startBalanceTW3).toString());
        });
    });
    describe("Change market fee for direct buy", async function () {
        it('Change market fee and success buy', async function () {
            const spentToken: number = 5000000000;
            let payload: string;
            payload = (await factoryDirectBuy.buildPayload(0, nft, Math.round(Date.now() / 1000), 0));
            await tokenWallet2.transfer(spentToken, factoryDirectBuy.address, locklift.utils.toNano(0.2), true, payload, locklift.utils.toNano(5));

            let spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            const dBCreate = await factoryDirectBuy.getEvent('DirectBuyDeployed') as any;
            logger.log(`Address DirectBuy ${dBCreate.directBuy.toString()}`);

            directBuy = await DirectBuy.from_addr(dBCreate.directBuy, account3);
            const dbFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dbFilled.to.toString()).to.be.eq('2');

            let oldFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(oldFee).to.eql(fee);

            let setFee = {
                numerator: 20,
                denominator: 100
            } as MarketFee;

            await factoryDirectBuy.contract.methods.setMarketFeeForDirectBuy({directBuy: directBuy, _fee: setFee}).send({
                    from: factoryDirectBuy.address,
                    amount: toNano(2)
            });
            let newFee = (await directBuy.contract.methods.getMarketFee().call()).value0;
            expect(newFee).to.eql(setFee);
            fee = setFee;
            const dBMFChanged = await factoryDirectBuy.getEvent('MarketFeeChanged') as any;
            expect(dBMFChanged._fee).to.eql(setFee);

            sleep(5000);
            let callbacks = await Callback(payload);
            await nft.changeManager(account3, directBuy.address, account3.address, callbacks);
            const dBFilled = await directBuy.getEvent('DirectBuyStateChanged') as any;
            expect(dBFilled.to.toString()).to.be.eq('3');

            const owner = (await nft.getInfo()).owner;
            expect(owner.toString()).to.be.eq((account3.address).toString());

            const ownerChanged = await nft.getEvent('OwnerChanged') as any;
            expect(ownerChanged.newOwner.toString()).to.be.eq(account3.address.toString());

            const managerChanged = await nft.getEvent('ManagerChanged') as any;
            expect(managerChanged.newManager.toString()).to.be.eq(account3.address.toString());

            let currentFee = new BigNumber(spentToken).div(setFee.denominator).times(setFee.numerator);
            const expectedAccountBalance = new BigNumber(startBalanceTW3).plus(spentToken).minus(currentFee);
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            const expectedTWFactoryDBBalance = startBalanceTWfactoryDirectBuy.plus(currentFee);
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(expectedTWFactoryDBBalance.toString());

            const spentTokenWallet3Balance = await tokenWallet3.balance() as any;
            expect(spentTokenWallet3Balance.toString()).to.be.eq(expectedAccountBalance.toString());

            spentTokenWallet2Balance = await tokenWallet2.balance() as any;
            expect(spentTokenWallet2Balance.toString()).to.be.eq((startBalanceTW2 - spentToken).toString());

            startBalanceTW3 = startBalanceTW3 + spentToken - currentFee.toNumber();
            startBalanceTW2 -= spentToken;
            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.plus(currentFee);
        });
    });
    describe("Change market fee for factory", async function () {
        it('Change market fee', async function () {
            let oldFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(oldFee).to.eql(fee);

            let setFee = {
                numerator: 20,
                denominator: 100
            } as MarketFee;

            await factoryDirectBuy.contract.methods.setMarketFee({_fee: setFee}).send({
                    from: account1.address,
                    amount: toNano(2)
            });

            let newFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(setFee.numerator.toString()).to.eql(newFee.numerator);
            expect(setFee.denominator.toString()).to.eql(newFee.denominator);
            fee = newFee;
        });
        it('Change market fee with zero denominator', async function () {
            let oldFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(oldFee).to.eql(fee);

            let setFee = {
                numerator: 20,
                denominator: 0
            } as MarketFee;

            await factoryDirectBuy.contract.methods.setMarketFee({_fee: setFee}).send({
                    from: account1.address,
                    amount: toNano(2)
            });
            let newFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(newFee).to.eql(oldFee);
        });
        it('Change market fee not owner', async function () {
            let oldFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(oldFee).to.eql(fee);

            let setFee = {
                numerator: 30,
                denominator: 100
            } as MarketFee;

            await factoryDirectBuy.contract.methods.setMarketFee({_fee: setFee}).send({
                    from: account2.address,
                    amount: toNano(2)
            });
            let newFee = (await factoryDirectBuy.contract.methods.getMarketFee().call()).value0;
            expect(newFee).to.eql(oldFee);
        });
    });
    describe("Withdraw", async function () {
        it('Trying withdraw not owner', async function () {
            const withdrawAmount = 1000000000;

            await factoryDirectBuy.contract.methods.withdraw({
                tokenWallet:factoryDirectBuyTW.address,
                amount:withdrawAmount,
                recipient:account2.address,
                remainingGasTo:account2.address}).send({
                    from: account2.address,
                    amount: toNano(2)
                });

            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(startBalanceTWfactoryDirectBuy.toString());
            let spentTokenWallet2Balance = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance.toString()).to.be.eq(startBalanceTW2.toString());

        });
        it('Trying withdraw part of token', async function () {
            const withdrawAmount = 1000000000;
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(startBalanceTWfactoryDirectBuy.toString());
            let spentTokenWallet2Balance = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance.toString()).to.be.eq(startBalanceTW2.toString());

            await factoryDirectBuy.contract.methods.withdraw({
                tokenWallet:factoryDirectBuyTW.address,
                amount:withdrawAmount,
                recipient:account2.address,
                remainingGasTo:account1.address}).send({
                    from: account1.address,
                    amount: toNano(2)
                });

            const factoryDBTokenWalletBalance1 = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance1.toString()).to.be.eq((startBalanceTWfactoryDirectBuy.minus(new BigNumber(withdrawAmount))).toString());
            let spentTokenWallet2Balance1 = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance1.toString()).to.be.eq((startBalanceTW2 + withdrawAmount).toString());

            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.minus(new BigNumber(withdrawAmount));
            startBalanceTW2 = startBalanceTW2 + withdrawAmount;
        });
        it('Trying withdraw more then have', async function () {
            const withdrawAmount = 330000000;
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(startBalanceTWfactoryDirectBuy.toString());
            let spentTokenWallet2Balance = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance.toString()).to.be.eq(startBalanceTW2.toString());

            await factoryDirectBuy.contract.methods.withdraw({
                tokenWallet:factoryDirectBuyTW.address,
                amount:withdrawAmount,
                recipient:account2.address,
                remainingGasTo:account1.address}).send({
                    from: account1.address,
                    amount: toNano(2)
                });

            const factoryDBTokenWalletBalance2 = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance2.toString()).to.be.eq((startBalanceTWfactoryDirectBuy).toString());
            let spentTokenWallet2Balance1 = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance1.toString()).to.be.eq((startBalanceTW2).toString());
        });
        it('Trying withdraw all rest of token', async function () {
            const factoryDBTokenWalletBalance = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance.toString()).to.be.eq(startBalanceTWfactoryDirectBuy.toString());
            let spentTokenWallet2Balance = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance.toString()).to.be.eq(startBalanceTW2.toString());

            const withdrawAmount = factoryDBTokenWalletBalance;

            await factoryDirectBuy.contract.methods.withdraw({
                tokenWallet:factoryDirectBuyTW.address,
                amount: withdrawAmount,
                recipient:account2.address,
                remainingGasTo:account1.address}).send({
                    from: account1.address,
                    amount: toNano(2)
                });

            const factoryDBTokenWalletBalance2 = await factoryDirectBuyTW.balance();
            expect(factoryDBTokenWalletBalance2.toString()).to.be.eq((0).toString());
            let spentTokenWallet2Balance1 = await tokenWallet2.balance();
            expect(spentTokenWallet2Balance1.toString()).to.be.eq((new BigNumber(startBalanceTW2).plus(withdrawAmount)).toString());

            startBalanceTWfactoryDirectBuy = startBalanceTWfactoryDirectBuy.minus(new BigNumber(withdrawAmount));
            startBalanceTW2 = (new BigNumber(startBalanceTW2).plus(withdrawAmount)).toNumber();
        });
    });
});