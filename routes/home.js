const express = require('express');
const {getCookieSettings} = require("../utils/get-cookie-settings");

const homeRouter = express.Router();

homeRouter
    .get('/' , (req, res) => {
        const {sum, cookieBase, addons, allAddons, allBases} = getCookieSettings(req);


        res.render('home/index', {
            cookie: {
                base: cookieBase,
                addons: addons,
            },
            bases: allBases,
            addons: allAddons,
            sum,
        })
    });

module.exports = {
    homeRouter,
};