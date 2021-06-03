const router = require('express').Router();
const { DB } = require('../models');
var multer  = require('multer');
const { awsS3Upload } = require('../aws/s3');
var upload = multer()
const keccak256 = require('keccak256')
var nftTemplate = require('../misc/klip-nft-template.json');
const { kasKip17Mint } = require('../kas/kip17');
const { kasTHMyNFTs, kasNFTInfo } = require('../kas/th');
const { sendRlpTx, getTxReceipt } = require('../kas/wallet');
const { default: axios } = require('axios');

router.post('/mint', upload.single('image'), async (req, res) => {
  const nftId = "0x"+keccak256(req.body.address + Math.random() + req.body.name).toString('hex').slice(0,10)

  awsS3Upload(req.file.buffer, nftId + req.file.originalname, function(data, err) {
    if( err !== undefined ) {
      console.log("aws s3 image upload error", err)
      res.status(400).send({error:"mint failed"+r})
      return
    }

    nftTemplate.background_color = req.body.background_color
    nftTemplate.name = req.body.name
    nftTemplate.description = req.body.description
    nftTemplate.image = data.Location

    awsS3Upload(JSON.stringify(nftTemplate), nftId + ".json", async function(data, err) {
      if( err !== undefined ) {
        console.log("aws s3 json upload error", err)
        res.status(400).send({error:"mint failed"})
        return
      }
      
      var r = await kasKip17Mint(req.body.address, nftId, data.Location)
      if( r.transactionHash ) {
        console.log('txhash', r.transactionHash)
        await DB.NFT.create({
          id:nftId,
          uri:data.Location,
          creator:req.body.address
        })
        res.send({id:nftId})
      } else {
        console.log("mint failed", r)
        res.status(400).send({error:"mint failed"+r})
      }
    })
  })
})

router.post('/transfer', async (req,res)=>{
  try {
    var r = await sendRlpTx(req.body.txRlp)

    console.log('r', r)

    if(r.transactionHash) {
      r = await getTxReceipt(r.transactionHash)
    }

    res.send({result:r})
  } catch (err) {
    console.log(err)
    res.status(500).send({error:err.toString()});
  }
})

router.get('/info/:contractAddr/:id', async (req,res)=> {
  var r = await kasNFTInfo(req.params.contractAddr, req.params.id)

  var json = await axios.get(r.tokenUri)

  res.send(Object.assign(r, {metadata:json.data}))
})

router.get('/mine/:addr', async (req, res) => {
  var r = await kasTHMyNFTs(req.params.addr)

  var jsonRequests = r.items.map((e)=>{return axios.get(e.extras.tokenUri)})

  axios.all(jsonRequests).then(axios.spread((...rep) => {
    var items = rep.map((x,i)=>{ 
      var o = {contractAddress:r.items[i].contractAddress,id:r.items[i].extras.tokenId, updatedAt:r.items[i].updatedAt}; 
      return Object.assign(o, x.data)
    })

    var result = {
      cursor:r.cursor,
      items:items
    }
    res.send(result)
  })).catch(err=>{
    console.log('axios.all error', err)
    res.sendStatus(500).send({error: 'axios failed'+err})
  })

})

router.get('/minted/:addr', async (req, res)=> {
  var r = await DB.NFT.findAll({
    where:{creator:req.params.addr}
  })

  var jsonRequests = r.map((e)=>{return axios.get(e.dataValues.uri)})

  axios.all(jsonRequests).then(axios.spread((...rep) => {
    var items = rep.map((x,i)=>{ 
      var o = {contractAddress:process.env.CONTRACT_ADDRESS,id:r[i].dataValues.id, updatedAt:r[i].dataValues.updatedAt.getTime()/1000}; 
      return Object.assign(o, x.data)
    })

    var result = {
      cursor:r.cursor,
      items:items
    }
    res.send(result)
  })).catch(err=>{
    console.log('axios.all error', err)
    res.sendStatus(500).send({error: 'axios failed'+err})
  })

})

module.exports = router