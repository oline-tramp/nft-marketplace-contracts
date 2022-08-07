const auctionRootTip3Abi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_codeNft","type":"cell"},{"name":"_owner","type":"address"},{"name":"_offerCode","type":"cell"},{"name":"_deploymentFee","type":"uint128"},{"name":"_marketFee","type":"uint8"},{"name":"_marketFeeDecimals","type":"uint8"},{"name":"_auctionBidDelta","type":"uint8"},{"name":"_auctionBidDeltaDecimals","type":"uint8"},{"name":"_sendGasTo","type":"address"}],"outputs":[]},{"name":"onNftChangeManager","inputs":[{"name":"value0","type":"uint256"},{"name":"nftOwner","type":"address"},{"name":"value2","type":"address"},{"name":"newManager","type":"address"},{"name":"collection","type":"address"},{"name":"sendGasTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"getOfferAddress","inputs":[{"name":"_nft","type":"address"},{"name":"_price","type":"uint128"},{"name":"_nonce","type":"uint64"}],"outputs":[{"name":"offerAddress","type":"address"}]},{"name":"buildAuctionCreationPayload","inputs":[{"name":"answerId","type":"uint32"},{"name":"_paymentTokenRoot","type":"address"},{"name":"_price","type":"uint128"},{"name":"_auctionStartTime","type":"uint64"},{"name":"_auctionDuration","type":"uint64"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"changeDeploymentFee","inputs":[{"name":"_value","type":"uint128"}],"outputs":[]},{"name":"changeMarketFee","inputs":[{"name":"_value","type":"uint8"},{"name":"_decimals","type":"uint8"}],"outputs":[]},{"name":"owner","inputs":[],"outputs":[{"name":"value0","type":"address"}]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"}],"outputs":[]},{"name":"marketFee","inputs":[],"outputs":[{"name":"marketFee","type":"uint8"}]},{"name":"marketFeeDecimals","inputs":[],"outputs":[{"name":"marketFeeDecimals","type":"uint8"}]},{"name":"deploymentFee","inputs":[],"outputs":[{"name":"deploymentFee","type":"uint128"}]},{"name":"auctionBidDelta","inputs":[],"outputs":[{"name":"auctionBidDelta","type":"uint8"}]},{"name":"auctionBidDeltaDecimals","inputs":[],"outputs":[{"name":"auctionBidDeltaDecimals","type":"uint8"}]}],"data":[{"key":1,"name":"nonce_","type":"uint64"}],"events":[{"name":"AuctionDeployed","inputs":[{"name":"offerAddress","type":"address"},{"components":[{"name":"collection","type":"address"},{"name":"nftOwner","type":"address"},{"name":"nft","type":"address"},{"name":"offer","type":"address"},{"name":"price","type":"uint128"},{"name":"auctionDuration","type":"uint128"},{"name":"deployNonce","type":"uint64"}],"name":"offerInfo","type":"tuple"}],"outputs":[]},{"name":"AuctionDeclined","inputs":[{"name":"nftOwner","type":"address"},{"name":"dataAddress","type":"address"}],"outputs":[]},{"name":"OwnershipTransferred","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"owner_","type":"address"},{"name":"marketFee","type":"uint8"},{"name":"marketFeeDecimals","type":"uint8"},{"name":"deploymentFee","type":"uint128"},{"name":"deploymentFeePart","type":"uint128"},{"name":"codeNft","type":"cell"},{"name":"offerCode","type":"cell"},{"name":"nonce_","type":"uint64"},{"name":"auctionBidDelta","type":"uint8"},{"name":"auctionBidDeltaDecimals","type":"uint8"}]} as const
const auctionTip3Abi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_markerRootAddr","type":"address"},{"name":"_tokenRootAddr","type":"address"},{"name":"_nftOwner","type":"address"},{"name":"_deploymentFee","type":"uint128"},{"name":"_marketFee","type":"uint128"},{"name":"_marketFeeDecimals","type":"uint8"},{"name":"_auctionStartTime","type":"uint64"},{"name":"_auctionDuration","type":"uint64"},{"name":"_bidDelta","type":"uint8"},{"name":"_paymentTokenRoot","type":"address"},{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"onTokenWallet","inputs":[{"name":"value","type":"address"}],"outputs":[]},{"name":"onAcceptTokensTransfer","inputs":[{"name":"token_root","type":"address"},{"name":"amount","type":"uint128"},{"name":"sender","type":"address"},{"name":"value3","type":"address"},{"name":"original_gas_to","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"finishAuction","inputs":[{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"buildPlaceBidPayload","inputs":[{"name":"answerId","type":"uint32"},{"name":"callbackId","type":"uint32"},{"name":"buyer","type":"address"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"getInfo","inputs":[],"outputs":[{"components":[{"name":"auctionSubject","type":"address"},{"name":"subjectOwner","type":"address"},{"name":"paymentTokenRoot","type":"address"},{"name":"walletForBids","type":"address"},{"name":"startTime","type":"uint64"},{"name":"duration","type":"uint64"},{"name":"finishTime","type":"uint64"}],"name":"value0","type":"tuple"}]},{"name":"price","inputs":[],"outputs":[{"name":"price","type":"uint128"}]},{"name":"nft","inputs":[],"outputs":[{"name":"nft","type":"address"}]},{"name":"markerRootAddr","inputs":[],"outputs":[{"name":"markerRootAddr","type":"address"}]},{"name":"tokenRootAddr","inputs":[],"outputs":[{"name":"tokenRootAddr","type":"address"}]},{"name":"nftOwner","inputs":[],"outputs":[{"name":"nftOwner","type":"address"}]},{"name":"deploymentFee","inputs":[],"outputs":[{"name":"deploymentFee","type":"uint128"}]},{"name":"marketFee","inputs":[],"outputs":[{"name":"marketFee","type":"uint128"}]},{"name":"marketFeeDecimals","inputs":[],"outputs":[{"name":"marketFeeDecimals","type":"uint8"}]},{"name":"bidDelta","inputs":[],"outputs":[{"name":"bidDelta","type":"uint8"}]},{"name":"currentBid","inputs":[],"outputs":[{"components":[{"name":"addr","type":"address"},{"name":"value","type":"uint128"}],"name":"currentBid","type":"tuple"}]},{"name":"maxBidValue","inputs":[],"outputs":[{"name":"maxBidValue","type":"uint128"}]},{"name":"nextBidValue","inputs":[],"outputs":[{"name":"nextBidValue","type":"uint128"}]}],"data":[{"key":1,"name":"nonce_","type":"uint64"},{"key":2,"name":"price","type":"uint128"},{"key":3,"name":"nft","type":"address"}],"events":[{"name":"AuctionCreated","inputs":[{"components":[{"name":"auctionSubject","type":"address"},{"name":"subjectOwner","type":"address"},{"name":"paymentTokenRoot","type":"address"},{"name":"walletForBids","type":"address"},{"name":"startTime","type":"uint64"},{"name":"duration","type":"uint64"},{"name":"finishTime","type":"uint64"}],"name":"value0","type":"tuple"}],"outputs":[]},{"name":"AuctionActive","inputs":[{"components":[{"name":"auctionSubject","type":"address"},{"name":"subjectOwner","type":"address"},{"name":"paymentTokenRoot","type":"address"},{"name":"walletForBids","type":"address"},{"name":"startTime","type":"uint64"},{"name":"duration","type":"uint64"},{"name":"finishTime","type":"uint64"}],"name":"value0","type":"tuple"}],"outputs":[]},{"name":"BidPlaced","inputs":[{"name":"buyerAddress","type":"address"},{"name":"value","type":"uint128"}],"outputs":[]},{"name":"BidDeclined","inputs":[{"name":"buyerAddress","type":"address"},{"name":"value","type":"uint128"}],"outputs":[]},{"name":"AuctionComplete","inputs":[{"name":"buyerAddress","type":"address"},{"name":"value","type":"uint128"}],"outputs":[]},{"name":"AuctionCancelled","inputs":[],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"nonce_","type":"uint64"},{"name":"price","type":"uint128"},{"name":"nft","type":"address"},{"name":"markerRootAddr","type":"address"},{"name":"tokenRootAddr","type":"address"},{"name":"nftOwner","type":"address"},{"name":"deploymentFee","type":"uint128"},{"name":"marketFee","type":"uint128"},{"name":"marketFeeDecimals","type":"uint8"},{"name":"paymentTokenRoot","type":"address"},{"name":"tokenWallet","type":"address"},{"name":"auctionStartTime","type":"uint64"},{"name":"auctionDuration","type":"uint64"},{"name":"auctionEndTime","type":"uint64"},{"name":"bidDelta","type":"uint8"},{"components":[{"name":"addr","type":"address"},{"name":"value","type":"uint128"}],"name":"currentBid","type":"tuple"},{"name":"maxBidValue","type":"uint128"},{"name":"nextBidValue","type":"uint128"},{"name":"state","type":"uint8"}]} as const
const collectionAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"codeNft","type":"cell"},{"name":"codeIndex","type":"cell"},{"name":"codeIndexBasis","type":"cell"},{"name":"owner","type":"address"},{"name":"remainOnNft","type":"uint128"}],"outputs":[]},{"name":"mintNft","inputs":[{"name":"_owner","type":"address"},{"name":"_json","type":"string"}],"outputs":[]},{"name":"totalMinted","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"count","type":"uint256"}]},{"name":"batchMintNft","inputs":[{"name":"_owner","type":"address"},{"name":"_jsons","type":"string[]"}],"outputs":[]},{"name":"setRemainOnNft","inputs":[{"name":"remainOnNft","type":"uint128"}],"outputs":[]},{"name":"resolveIndexCodeHash","inputs":[{"name":"collection","type":"address"},{"name":"owner","type":"address"}],"outputs":[{"name":"hash","type":"uint256"}]},{"name":"acceptNftBurn","inputs":[{"name":"_id","type":"uint256"},{"name":"_owner","type":"address"},{"name":"_manager","type":"address"},{"name":"_sendGasTo","type":"address"},{"name":"_callbackTo","type":"address"},{"name":"_callbackPayload","type":"cell"}],"outputs":[]},{"name":"owner","inputs":[],"outputs":[{"name":"value0","type":"address"}]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"}],"outputs":[]},{"name":"indexBasisCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"code","type":"cell"}]},{"name":"indexBasisCodeHash","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"hash","type":"uint256"}]},{"name":"resolveIndexBasis","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"indexBasis","type":"address"}]},{"name":"indexCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"code","type":"cell"}]},{"name":"indexCodeHash","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"hash","type":"uint256"}]},{"name":"totalSupply","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"count","type":"uint128"}]},{"name":"nftCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"code","type":"cell"}]},{"name":"nftCodeHash","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"codeHash","type":"uint256"}]},{"name":"nftAddress","inputs":[{"name":"answerId","type":"uint32"},{"name":"id","type":"uint256"}],"outputs":[{"name":"nft","type":"address"}]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]}],"data":[{"key":1,"name":"nonce_","type":"uint64"}],"events":[{"name":"OwnershipTransferred","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]},{"name":"NftCreated","inputs":[{"name":"id","type":"uint256"},{"name":"nft","type":"address"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"creator","type":"address"}],"outputs":[]},{"name":"NftBurned","inputs":[{"name":"id","type":"uint256"},{"name":"nft","type":"address"},{"name":"owner","type":"address"},{"name":"manager","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_supportedInterfaces","type":"optional(cell)"},{"name":"_codeNft","type":"cell"},{"name":"_totalSupply","type":"uint128"},{"name":"_codeIndex","type":"cell"},{"name":"_codeIndexBasis","type":"cell"},{"name":"_indexDeployValue","type":"uint128"},{"name":"_indexDestroyValue","type":"uint128"},{"name":"_deployIndexBasisValue","type":"uint128"},{"name":"owner_","type":"address"},{"name":"nonce_","type":"uint64"},{"name":"_remainOnNft","type":"uint128"},{"name":"_totalMinted","type":"uint256"}]} as const
const directBuyAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_amount","type":"uint128"},{"name":"_startTime","type":"uint64"},{"name":"_durationTime","type":"uint64"}],"outputs":[]},{"name":"onTokenWallet","inputs":[{"name":"_spentTokenWallet","type":"address"}],"outputs":[]},{"name":"getDetails","inputs":[],"outputs":[{"components":[{"name":"factory","type":"address"},{"name":"creator","type":"address"},{"name":"spentToken","type":"address"},{"name":"nft","type":"address"},{"name":"_timeTx","type":"uint64"},{"name":"_price","type":"uint128"},{"name":"spentWallet","type":"address"},{"name":"status","type":"uint8"},{"name":"sender","type":"address"},{"name":"startTimeBuy","type":"uint64"},{"name":"durationTimeBuy","type":"uint64"},{"name":"endTimeBuy","type":"uint64"}],"name":"value0","type":"tuple"}]},{"name":"onAcceptTokensTransfer","inputs":[{"name":"tokenRoot","type":"address"},{"name":"amount","type":"uint128"},{"name":"sender","type":"address"},{"name":"value3","type":"address"},{"name":"originalGasTo","type":"address"},{"name":"value5","type":"cell"}],"outputs":[]},{"name":"onNftChangeManager","inputs":[{"name":"value0","type":"uint256"},{"name":"nftOwner","type":"address"},{"name":"value2","type":"address"},{"name":"newManager","type":"address"},{"name":"value4","type":"address"},{"name":"sendGasTo","type":"address"},{"name":"value6","type":"cell"}],"outputs":[]},{"name":"finishBuy","inputs":[{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"closedDirectBuy","inputs":[],"outputs":[]}],"data":[{"key":1,"name":"factoryDirectBuy","type":"address"},{"key":2,"name":"owner","type":"address"},{"key":3,"name":"spentTokenRoot","type":"address"},{"key":4,"name":"nftAddress","type":"address"},{"key":5,"name":"timeTx","type":"uint64"}],"events":[{"name":"DirectBuyStateChanged","inputs":[{"name":"from","type":"uint8"},{"name":"to","type":"uint8"},{"components":[{"name":"factory","type":"address"},{"name":"creator","type":"address"},{"name":"spentToken","type":"address"},{"name":"nft","type":"address"},{"name":"_timeTx","type":"uint64"},{"name":"_price","type":"uint128"},{"name":"spentWallet","type":"address"},{"name":"status","type":"uint8"},{"name":"sender","type":"address"},{"name":"startTimeBuy","type":"uint64"},{"name":"durationTimeBuy","type":"uint64"},{"name":"endTimeBuy","type":"uint64"}],"name":"value2","type":"tuple"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"factoryDirectBuy","type":"address"},{"name":"owner","type":"address"},{"name":"spentTokenRoot","type":"address"},{"name":"nftAddress","type":"address"},{"name":"timeTx","type":"uint64"},{"name":"price","type":"uint128"},{"name":"startTime","type":"uint64"},{"name":"durationTime","type":"uint64"},{"name":"endTime","type":"uint64"},{"name":"spentTokenWallet","type":"address"},{"name":"currentStatus","type":"uint8"}]} as const
const directSellAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_auctionStart","type":"uint64"},{"name":"_auctionEnd","type":"uint64"},{"name":"_price","type":"uint128"}],"outputs":[]},{"name":"onTokenWallet","inputs":[{"name":"_wallet","type":"address"}],"outputs":[]},{"name":"getDetails","inputs":[],"outputs":[{"components":[{"name":"factory","type":"address"},{"name":"creator","type":"address"},{"name":"token","type":"address"},{"name":"nft","type":"address"},{"name":"_timeTx","type":"uint64"},{"name":"start","type":"uint64"},{"name":"end","type":"uint64"},{"name":"_price","type":"uint128"},{"name":"wallet","type":"address"},{"name":"status","type":"uint8"},{"name":"sender","type":"address"}],"name":"value0","type":"tuple"}]},{"name":"onAcceptTokensTransfer","inputs":[{"name":"value0","type":"address"},{"name":"amount","type":"uint128"},{"name":"sender","type":"address"},{"name":"value3","type":"address"},{"name":"original_gas_to","type":"address"},{"name":"value5","type":"cell"}],"outputs":[]},{"name":"onNftChangeManager","inputs":[{"name":"value0","type":"uint256"},{"name":"value1","type":"address"},{"name":"value2","type":"address"},{"name":"newManager","type":"address"},{"name":"value4","type":"address"},{"name":"value5","type":"address"},{"name":"value6","type":"cell"}],"outputs":[]},{"name":"finishSell","inputs":[{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"closedDirectSell","inputs":[],"outputs":[]}],"data":[{"key":1,"name":"factoryDirectSell","type":"address"},{"key":2,"name":"owner","type":"address"},{"key":3,"name":"paymentToken","type":"address"},{"key":4,"name":"nftAddress","type":"address"},{"key":5,"name":"timeTx","type":"uint64"}],"events":[{"name":"DirectSellStateChanged","inputs":[{"name":"from","type":"uint8"},{"name":"to","type":"uint8"},{"components":[{"name":"factory","type":"address"},{"name":"creator","type":"address"},{"name":"token","type":"address"},{"name":"nft","type":"address"},{"name":"_timeTx","type":"uint64"},{"name":"start","type":"uint64"},{"name":"end","type":"uint64"},{"name":"_price","type":"uint128"},{"name":"wallet","type":"address"},{"name":"status","type":"uint8"},{"name":"sender","type":"address"}],"name":"value2","type":"tuple"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"factoryDirectSell","type":"address"},{"name":"owner","type":"address"},{"name":"paymentToken","type":"address"},{"name":"nftAddress","type":"address"},{"name":"timeTx","type":"uint64"},{"name":"auctionStart","type":"uint64"},{"name":"auctionEnd","type":"uint64"},{"name":"price","type":"uint128"},{"name":"tokenWallet","type":"address"},{"name":"currentStatus","type":"uint8"},{"name":"receivedNFT","type":"bool"},{"name":"state","type":"uint8"}]} as const
const factoryDirectBuyAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_owner","type":"address"},{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"buildPayload","inputs":[{"name":"nft","type":"address"},{"name":"startTime","type":"optional(uint64)"},{"name":"durationTime","type":"optional(uint64)"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"onAcceptTokensTransfer","inputs":[{"name":"tokenRoot","type":"address"},{"name":"amount","type":"uint128"},{"name":"sender","type":"address"},{"name":"value3","type":"address"},{"name":"originalGasTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"expectedAddressDirectBuy","inputs":[{"name":"answerId","type":"uint32"},{"name":"_owner","type":"address"},{"name":"_spentTokenRoot","type":"address"},{"name":"_nft","type":"address"},{"name":"_timeTx","type":"uint64"},{"name":"_amount","type":"uint128"}],"outputs":[{"name":"value0","type":"address"}]},{"name":"owner","inputs":[],"outputs":[{"name":"value0","type":"address"}]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"nonce_","type":"uint64"}],"events":[{"name":"DirectBuyDeployed","inputs":[{"name":"directBuyAddress","type":"address"},{"name":"sender","type":"address"},{"name":"tokenRoot","type":"address"},{"name":"nft","type":"address"},{"name":"nonce","type":"uint64"},{"name":"amount","type":"uint128"}],"outputs":[]},{"name":"DirectBuyDeclined","inputs":[{"name":"sender","type":"address"},{"name":"tokenRoot","type":"address"},{"name":"amount","type":"uint128"}],"outputs":[]},{"name":"OwnershipTransferred","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"owner_","type":"address"},{"name":"nonce_","type":"uint64"},{"name":"tokenPlatformCode","type":"cell"},{"name":"directBuyCode","type":"cell"}]} as const
const factoryDirectSellAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"_owner","type":"address"},{"name":"sendGasTo","type":"address"}],"outputs":[]},{"name":"buildPayload","inputs":[{"name":"_nftAddress","type":"address"},{"name":"_startAuction","type":"uint64"},{"name":"_endAuction","type":"optional(uint64)"},{"name":"_paymentToken","type":"address"},{"name":"_price","type":"uint128"}],"outputs":[{"name":"value0","type":"cell"}]},{"name":"onNftChangeManager","inputs":[{"name":"value0","type":"uint256"},{"name":"nftOwner","type":"address"},{"name":"value2","type":"address"},{"name":"newManager","type":"address"},{"name":"value4","type":"address"},{"name":"sendGasTo","type":"address"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"owner","inputs":[],"outputs":[{"name":"value0","type":"address"}]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"nonce_","type":"uint64"}],"events":[{"name":"DirectSellDeployed","inputs":[{"name":"_directSellAddress","type":"address"},{"name":"sender","type":"address"},{"name":"paymentToken","type":"address"},{"name":"nft","type":"address"},{"name":"_nonce","type":"uint64"},{"name":"price","type":"uint128"}],"outputs":[]},{"name":"DirectSellDeclined","inputs":[{"name":"sender","type":"address"}],"outputs":[]},{"name":"OwnershipTransferred","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"owner_","type":"address"},{"name":"nonce_","type":"uint64"},{"name":"directSellCode","type":"cell"}]} as const
const indexAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[{"name":"collection","type":"address"}],"outputs":[]},{"name":"getInfo","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"collection","type":"address"},{"name":"owner","type":"address"},{"name":"nft","type":"address"}]},{"name":"destruct","inputs":[{"name":"gasReceiver","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"_nft","type":"address"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_nft","type":"address"},{"name":"_collection","type":"address"},{"name":"_owner","type":"address"}]} as const
const indexBasisAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","inputs":[],"outputs":[]},{"name":"getInfo","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"collection","type":"address"}]},{"name":"destruct","inputs":[{"name":"gasReceiver","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"_collection","type":"address"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_collection","type":"address"}]} as const
const nftAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"owner","type":"address"},{"name":"sendGasTo","type":"address"},{"name":"remainOnNft","type":"uint128"},{"name":"json","type":"string"},{"name":"indexDeployValue","type":"uint128"},{"name":"indexDestroyValue","type":"uint128"},{"name":"codeIndex","type":"cell"}],"outputs":[]},{"name":"burn","inputs":[{"name":"sendGasTo","type":"address"},{"name":"callbackTo","type":"address"},{"name":"callbackPayload","type":"cell"}],"outputs":[]},{"name":"indexCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"code","type":"cell"}]},{"name":"indexCodeHash","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"hash","type":"uint256"}]},{"name":"resolveIndex","inputs":[{"name":"answerId","type":"uint32"},{"name":"collection","type":"address"},{"name":"owner","type":"address"}],"outputs":[{"name":"index","type":"address"}]},{"name":"getJson","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"json","type":"string"}]},{"name":"transfer","inputs":[{"name":"to","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"changeOwner","inputs":[{"name":"newOwner","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"changeManager","inputs":[{"name":"newManager","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"getInfo","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]}],"data":[{"key":1,"name":"_id","type":"uint256"}],"events":[{"name":"NftCreated","inputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}],"outputs":[]},{"name":"OwnerChanged","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]},{"name":"ManagerChanged","inputs":[{"name":"oldManager","type":"address"},{"name":"newManager","type":"address"}],"outputs":[]},{"name":"NftBurned","inputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_supportedInterfaces","type":"optional(cell)"},{"name":"_id","type":"uint256"},{"name":"_collection","type":"address"},{"name":"_owner","type":"address"},{"name":"_manager","type":"address"},{"name":"_json","type":"string"},{"name":"_indexDeployValue","type":"uint128"},{"name":"_indexDestroyValue","type":"uint128"},{"name":"_codeIndex","type":"cell"}]} as const
const tIP4_1CollectionAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"codeNft","type":"cell"}],"outputs":[]},{"name":"totalSupply","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"count","type":"uint128"}]},{"name":"nftCode","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"code","type":"cell"}]},{"name":"nftCodeHash","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"codeHash","type":"uint256"}]},{"name":"nftAddress","inputs":[{"name":"answerId","type":"uint32"},{"name":"id","type":"uint256"}],"outputs":[{"name":"nft","type":"address"}]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]}],"data":[],"events":[{"name":"NftCreated","inputs":[{"name":"id","type":"uint256"},{"name":"nft","type":"address"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"creator","type":"address"}],"outputs":[]},{"name":"NftBurned","inputs":[{"name":"id","type":"uint256"},{"name":"nft","type":"address"},{"name":"owner","type":"address"},{"name":"manager","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_supportedInterfaces","type":"optional(cell)"},{"name":"_codeNft","type":"cell"},{"name":"_totalSupply","type":"uint128"}]} as const
const tIP4_1NftAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"owner","type":"address"},{"name":"sendGasTo","type":"address"},{"name":"remainOnNft","type":"uint128"}],"outputs":[]},{"name":"transfer","inputs":[{"name":"to","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"changeOwner","inputs":[{"name":"newOwner","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"changeManager","inputs":[{"name":"newManager","type":"address"},{"name":"sendGasTo","type":"address"},{"components":[{"name":"value","type":"uint128"},{"name":"payload","type":"cell"}],"name":"callbacks","type":"map(address,tuple)"}],"outputs":[]},{"name":"getInfo","inputs":[{"name":"answerId","type":"uint32"}],"outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}]},{"name":"supportsInterface","inputs":[{"name":"answerId","type":"uint32"},{"name":"interfaceID","type":"uint32"}],"outputs":[{"name":"value0","type":"bool"}]}],"data":[{"key":1,"name":"_id","type":"uint256"}],"events":[{"name":"NftCreated","inputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}],"outputs":[]},{"name":"OwnerChanged","inputs":[{"name":"oldOwner","type":"address"},{"name":"newOwner","type":"address"}],"outputs":[]},{"name":"ManagerChanged","inputs":[{"name":"oldManager","type":"address"},{"name":"newManager","type":"address"}],"outputs":[]},{"name":"NftBurned","inputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"manager","type":"address"},{"name":"collection","type":"address"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"_supportedInterfaces","type":"optional(cell)"},{"name":"_id","type":"uint256"},{"name":"_collection","type":"address"},{"name":"_owner","type":"address"},{"name":"_manager","type":"address"}]} as const
const tokenWalletPlatformAbi = {"ABIversion":2,"version":"2.2","header":["time"],"functions":[{"name":"constructor","id":"0x15A038FB","inputs":[{"name":"walletCode","type":"cell"},{"name":"walletVersion","type":"uint32"},{"name":"sender","type":"address"},{"name":"remainingGasTo","type":"address"}],"outputs":[]}],"data":[{"key":1,"name":"root","type":"address"},{"key":2,"name":"owner","type":"address"}],"events":[],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"root","type":"address"},{"name":"owner","type":"address"}]} as const
const walletAbi = {"ABIversion":2,"version":"2.2","header":["pubkey","time"],"functions":[{"name":"sendTransaction","inputs":[{"name":"dest","type":"address"},{"name":"value","type":"uint128"},{"name":"bounce","type":"bool"},{"name":"flags","type":"uint8"},{"name":"payload","type":"cell"}],"outputs":[]},{"name":"transferOwnership","inputs":[{"name":"newOwner","type":"uint256"}],"outputs":[]},{"name":"constructor","inputs":[],"outputs":[]},{"name":"owner","inputs":[],"outputs":[{"name":"owner","type":"uint256"}]},{"name":"_randomNonce","inputs":[],"outputs":[{"name":"_randomNonce","type":"uint256"}]}],"data":[{"key":1,"name":"_randomNonce","type":"uint256"}],"events":[{"name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"uint256"},{"name":"newOwner","type":"uint256"}],"outputs":[]}],"fields":[{"name":"_pubkey","type":"uint256"},{"name":"_timestamp","type":"uint64"},{"name":"_constructorFlag","type":"bool"},{"name":"owner","type":"uint256"},{"name":"_randomNonce","type":"uint256"}]} as const

export const factorySource = {
    AuctionRootTip3: auctionRootTip3Abi,
    AuctionTip3: auctionTip3Abi,
    Collection: collectionAbi,
    DirectBuy: directBuyAbi,
    DirectSell: directSellAbi,
    FactoryDirectBuy: factoryDirectBuyAbi,
    FactoryDirectSell: factoryDirectSellAbi,
    Index: indexAbi,
    IndexBasis: indexBasisAbi,
    Nft: nftAbi,
    TIP4_1Collection: tIP4_1CollectionAbi,
    TIP4_1Nft: tIP4_1NftAbi,
    TokenWalletPlatform: tokenWalletPlatformAbi,
    Wallet: walletAbi
} as const

export type FactorySource = typeof factorySource
export type AuctionRootTip3Abi = typeof auctionRootTip3Abi
export type AuctionTip3Abi = typeof auctionTip3Abi
export type CollectionAbi = typeof collectionAbi
export type DirectBuyAbi = typeof directBuyAbi
export type DirectSellAbi = typeof directSellAbi
export type FactoryDirectBuyAbi = typeof factoryDirectBuyAbi
export type FactoryDirectSellAbi = typeof factoryDirectSellAbi
export type IndexAbi = typeof indexAbi
export type IndexBasisAbi = typeof indexBasisAbi
export type NftAbi = typeof nftAbi
export type TIP4_1CollectionAbi = typeof tIP4_1CollectionAbi
export type TIP4_1NftAbi = typeof tIP4_1NftAbi
export type TokenWalletPlatformAbi = typeof tokenWalletPlatformAbi
export type WalletAbi = typeof walletAbi
