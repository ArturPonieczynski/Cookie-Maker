const handlebarsHelpers =  {
    upper: string => string.toUpperCase(),
    "find-price": (entries, selectedItem) => {
        const found = entries.find(el => el[0] === selectedItem);
        if (!found) {
            throw new Error(`Can't find "${selectedItem}"`)
        }
        else {
            const [, price] = found;
            return price;
        }
    },

    precify: price => price.toFixed(2),

    isNotInArray: (array, element) => {
        return !array.includes(element)
    },

    isInArray: (array, element) => {
        return array.includes(element)
    },

};

module.exports = {
    handlebarsHelpers,
};