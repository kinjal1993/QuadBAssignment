const fetch = require('node-fetch');
const CryptoModel = require("../models/crypto");
const { WAZIRX_API_URL,WAZIRX_DATA_LIMIT } = require('../config/constants');

exports.fetchWazirXData = async function () {
    try {
      // fetching data from wazirx api
      const res = await fetch(WAZIRX_API_URL,{
        headers: {
          // update with your user-agent
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36", 
          Accept: "application/json; charset=UTF-8",
        }
      })
      const json = await res.json()
      let i = 1
      const data = []
      for(key in json)
      {
        data.push({ name: json[key].name, base_unit: json[key].base_unit, last: json[key].last, buy: json[key].buy, sell: json[key].sell, volume: json[key].volume })
        if(i == WAZIRX_DATA_LIMIT)
        break
        i++
      }
      // truncating the table before data inserted
      await CryptoModel.Crypto.destroy({
        where: {},
        truncate: true
      })
      // storing first 10 results to the db
      await CryptoModel.Crypto.bulkCreate(data)
    }
    catch (err) {
      console.log(err);
    }
  };