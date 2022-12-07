const getAddonsFromCookies = (req) => {
    const {cookieAddons} = req.cookies;

    return cookieAddons ? JSON.parse(cookieAddons) : [];
};

module.exports = {
    getAddonsFromCookies,
}