module.exports = app => {
    const router = require("express").Router();

    const crypto = require("../controllers/crypto");

    router.get("/crypto-data", crypto.getAllData);

    // home
    router.get("/", (req, res) => {
        res.sendFile('index.html', { root: app.get('views') })
    });

    app.use('/', router);
};