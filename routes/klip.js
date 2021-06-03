const router = require('express').Router();
const axios = require('axios');

const headers = {
  "Authorization":process.env.KAS_AUTHORIZATION,
  "x-chain-id":process.env.KAS_CHAIN_ID,
  "Content-Type":"application/json"
}
const CaverExtKAS = require('caver-js-ext-kas')

const caver = new CaverExtKAS(process.env.KAS_CHAIN_ID, process.env.KAS_ACCESS_KEY, process.env.KAS_SECRET_ACCESS_KEY)

router.get('/getResult/:requestKey', async (req, res) => {
	try {
		var r = (await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${req.params.requestKey}`));
		r = r.data;
		console.log(r);
		if(r.err) {
			throw res.err
		}
		if(r.status === "completed") {
			if(r.result && r.result.tx_hash) {
				var receipt = await caver.rpc.klay.getTransactionReceipt(r.result.tx_hash);
				if(receipt) {
					res.send({status:"completed", receipt:receipt});
				} else {
					res.send({status:"tx_processing"});
        }
			} else {
				res.send(r);
			}
		} else {
			res.send(r);
		}
	} catch(err) {
		res.status(500).send({error:err.toString()});
	}

});

module.exports = router
