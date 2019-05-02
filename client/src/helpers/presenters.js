/**
 * Camel-case a string
 * @param {String} str 
 */
export const camelize = str => 
    str.split(' ').map(x => x[0].toUpperCase() + x.substr(1)).join(' ');