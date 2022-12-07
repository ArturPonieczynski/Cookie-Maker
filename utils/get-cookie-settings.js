const {COOKIE_BASES, COOKIE_ADDONS} = require("../data/cookie-data");
const {getAddonsFromCookies} = require("./get-addons-from-cookies");
const {handlebarsHelpers} = require("./handlebars-helpers");

function getCookieSettings(req) {
    const {cookieBase} = req.cookies;
    const allBases = Object.entries(COOKIE_BASES);
    const allAddons  = Object.entries(COOKIE_ADDONS);

    const addons = getAddonsFromCookies(req);

    const sum = (cookieBase ? handlebarsHelpers['find-price'](allBases, cookieBase) : 0)
        + addons.reduce((previousValue, currentValue) => {
            return previousValue + handlebarsHelpers['find-price'](allAddons, currentValue);
        }, 0);
    return {
        addons,
        sum,
        cookieBase,
        allBases,
        allAddons,
    }
}

module.exports =  {
    getCookieSettings,
}