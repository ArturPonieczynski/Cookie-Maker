const express = require('express');
const {getAddonsFromCookies} = require("../utils/get-addons-from-cookies");
const {COOKIE_ADDONS, COOKIE_BASES} = require("../data/cookie-data");

const configuratorRouter = express.Router();

configuratorRouter

    .get('/select-base/:baseName', (req, res) => {
        const {baseName} = req.params;
        if (!COOKIE_BASES[baseName]) {
            return res.render('error.hbs', {
                description: `There is no ${baseName}.`
            })
        }

        res
            .cookie('cookieBase', baseName, {maxAge:1000*60*10})
            .render('configurator/base-selected.hbs', {
                baseName,
            });
    })
    .get('/select-addons/:addonsName', (req, res) => {
        const {addonsName} = req.params;
        if (!COOKIE_ADDONS[addonsName]) {
            return res.render('error.hbs', {
                description: `There is no ${addonsName} ingredient.`,
            })
        }
        const addons = getAddonsFromCookies(req);
        if (addons.includes(addonsName)) {
            return res.render('error.hbs', {
                description: `${addonsName} is already on your cookie.`,
            })
        }
        addons.push(addonsName);

        res
            .cookie('cookieAddons', JSON.stringify(addons), {maxAge:1000*60*10})
            .render('configurator/added.hbs', {
                addonsName,
            })})

    .get('/delete-addon/:addonName', (req, res) => {
        const {addonName} = req.params;
        const addons = getAddonsFromCookies(req);
        if (!addons.includes(addonName)) {
            return res.render('error.hbs', {
                description: `You can\'t remove ${addonName}.`,
            })
        };
        const newAddons = addons.filter(addon => addon !== addonName);

        res
            .cookie('cookieAddons', JSON.stringify(newAddons), {maxAge:1000*60*10})
            .render('configurator/removed.hbs', {
                addonName,
            });
    });

module.exports = {
    configuratorRouter,
};