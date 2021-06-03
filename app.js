require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port = process.env.EXPRESS_PORT || 4500;

var whitelist = process.env.CORS_DOMAINS.split(',');
var corsOptions = {
origin: function (origin, callback) {
					if (!origin || whitelist.indexOf(origin) !== -1) {
						callback(null, true)
					} else {
						callback(new Error('Not allowed by CORS'))
					}
				},
methods: "GET,POST,PUT,DELETE",
};

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/nft', require('./routes/nft'))
app.use('/klip', require('./routes/klip'));

app.listen(port, () => console.log(`Server listening on port ${port}`));