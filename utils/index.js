const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    // isUser: user => user && user.role === 'USER',
    // isAdmin: user => user && user.role === 'ADMIN',
    formatValidationError: err => Object.values(err.errors).map(elm => elm.message).join('<br>')
}