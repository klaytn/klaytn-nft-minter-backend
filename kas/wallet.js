const axios = require('axios');
const headers = {
  "Authorization":process.env.KAS_AUTHORIZATION,
  "x-chain-id":process.env.KAS_CHAIN_ID,
  "Content-Type":"application/json"
}
const CaverExtKAS = require('caver-js-ext-kas')

const caver = new CaverExtKAS(process.env.KAS_CHAIN_ID, process.env.KAS_ACCESS_KEY, process.env.KAS_SECRET_ACCESS_KEY)

async function sendRlpTx(txRlp) {
  var r = await caver.kas.wallet.requestFDRawTransactionPaidByGlobalFeePayer({
    rlp:txRlp,
    submit:true
  })
  return r
}

async function getTxReceipt(txhash) {
  const limit = 10
  const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  var receipt = await caver.rpc.klay.getTransactionReceipt(txhash)
  var count = 0
  if(!limit) limit = 6;

  while(receipt === null && count < limit) {
    receipt = await caver.rpc.klay.getTransactionReceipt(txhash)
    await _sleep(500)
    count+=1
  }
  
  return receipt
}

module.exports = {
  sendRlpTx,
  getTxReceipt
}