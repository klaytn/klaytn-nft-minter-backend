const axios = require('axios');
const headers = {
  "Authorization":process.env.KAS_AUTHORIZATION,
  "x-chain-id":process.env.KAS_CHAIN_ID,
  "Content-Type":"application/json"
}
const CaverExtKAS = require('caver-js-ext-kas')

const caver = new CaverExtKAS(process.env.KAS_CHAIN_ID, process.env.KAS_ACCESS_KEY, process.env.KAS_SECRET_ACCESS_KEY)

const contractAddr = "nft-test"
async function kasTHMyNFTs(addr) {
  var r = await axios.get(`https://th-api.klaytnapi.com/v2/account/${addr}/token?kind=nft`,{headers});
  return r.data
}

async function kasNFTInfo(contractAddr, tokenId) {
  try {
    var r = await axios.get(`https://th-api.klaytnapi.com/v2/contract/nft/${contractAddr}/token/${tokenId}`, {headers});
    return r.data;
  } catch(err) {
    console.log("kasNFTINfo failed", err)
  }
}

module.exports = {
  kasTHMyNFTs,
  kasNFTInfo,
}