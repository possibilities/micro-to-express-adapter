const micro = require('micro')

// Detect if request has been handled by micro, otherwise passes control
// back to express.
const invokeWithExpressIfNotHandledByMicro = (res, next) => result => (
  // Micro handled the request if the handler returns a result (it will
  // likely be something JSON-parse-able or a Promise instance). Micro also
  // handled the request if any headers have been sent.
  result || res.headersSent
    // Micro handled it so there's nothing to do
    ? result
    // Pass control back to express
    : next()
)

// Creates an express request handler from a micro app
const microToExpressAdapter = microHandler => (req, res, next) => (
  micro
    // Let micro invoke the handler
    .run(req, res, microHandler)
    // Pass response
    .then(invokeWithExpressIfNotHandledByMicro(res, next))
)

module.exports = microToExpressAdapter
