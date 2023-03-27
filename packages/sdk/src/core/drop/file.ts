

// Created a lazyMint contract - Add contractType to enum
// Each lazyMint batch has the same metadata
// LazyMint a couple of tokens
// ERC721LazyMintInstance
async lazyMint(){}
// Set claim conditions
async setClaimCondition(){
    ERC721LazyDropFacet(this.appId).ERC721_setClaimCondition();
}


async claim(){
    //multicall?
    //platform fee 
    //if claim currency is DAI
    //msg.value = platformFee
    // if claim currency is ZERO_ADDRESS
    //msg.value = pricePerToken * NumberOfTokens + platformFee
    ERC721LazyDropFacet(this.appId).claim();
}


