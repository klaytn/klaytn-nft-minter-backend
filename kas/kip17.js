const axios = require('axios');
require('dotenv').config()
const headers = {
  "Authorization":process.env.KAS_AUTHORIZATION,
  "x-chain-id":process.env.KAS_CHAIN_ID,
  "Content-Type":"application/json"
}
const contractAddr = "nft-test"
async function getContractList() {
  var r = await axios.get("https://kip17-api.klaytnapi.com/v1/contract",{headers});
  console.log(r.data)
  return r.data
}

async function kasKip17Mint(to, id, uri) {
  console.log("contractaddr", contractAddr)
  var r = await axios.post(`https://kip17-api.klaytnapi.com/v1/contract/${contractAddr}/token`,{
    to, id, uri },{headers})
  .catch(function(err) {
    console.log('failed to deploy', err)
  })
  console.log(r)
  console.log(r.data)
  return r.data;
}


module.exports = {
  kasKip17Mint
}