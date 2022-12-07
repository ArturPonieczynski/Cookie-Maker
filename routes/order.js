const express = require('express');
const {getCookieSettings} = require("../utils/get-cookie-settings");

const orderRouter = express.Router();

orderRouter
    .get('/summary', (req, res) => {
        const {sum, cookieBase, addons, allAddons, allBases} = getCookieSettings(req);


        res.render('order/summary.hbs', {
            cookie: {
                base: cookieBase,
                addons: addons,
            },
            bases: allBases,
            addons: allAddons,
            sum,
        })
    })
    .get('/thanks', (req, res) => {
        const {sum} = getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks.hbs', {
            sum,

        })
    });

module.exports = {
    orderRouter,
}