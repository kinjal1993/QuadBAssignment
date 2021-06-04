const CryptoModel = require("../models/crypto");

exports.getAllData = (req, res, next) => {
  // fetching data from db and modifying it
  CryptoModel.Crypto.findAll()
    .then((data) => {

      const response = []
      for(let i = 0;i< data.length;i++)
      {
        const name = data[i].name;
        const volume = data[i].volume;
        const base_unit = data[i].base_unit;
        const last = '₹ '+data[i].last;
        const buy_sell = '₹ '+data[i].buy+' / ₹ '+data[i].sell;
        response.push({
          name,
          volume,
          base_unit,
          last,
          buy_sell
        })
      }

      res.status(200).json({
        error: false,
        message: "Success",
        data: response
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};