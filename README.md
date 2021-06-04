# QuadBAssignment

https://api.wazirx.com/api/v2/tickers
keys to be used
"name" - DataTypes.STRING
"last" - decimal
"buy" - decimal
"sell" - decimal
"volume" - decimal
"base_unit" - DataTypes.STRING


{
"base_unit":"btc",
"last":"2977301.0",
"volume":"420.27301",
"sell":"2977301.0",
"buy":"2972908.0",
"name":"BTC/INR"
},

express
sequelize
sqllite3
webpack
ejs

var compression = require('compression')
var express = require('express')
var app = express()
app.use(compression())