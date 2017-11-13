const micro = require('micro')

// Pass control back to express if micro didn't handle the request
const hasResponseOrNext = (res, next) => result => {
  return result || res.headersSent ? result : next()
}

// Invoke micro app as express handler
const microAppToExpressHandler = microApp => (req, res, next) => (
  micro
    .run(req, res, microApp)
    .then(hasResponseOrNext(res, next))
)

module.exports = microAppToExpressHandler
