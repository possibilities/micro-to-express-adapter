# Micro-to-express adapter

Creates an [express.js](https://expressjs.com://expressjs.com/) handler from a [micro.js](https://github.com/zeit/micro) app.

## Usage

```
const microApp = () => ({ ok: true })

const express = require('express')
const app = express()

app.get('/', microAppToExpressHandler(mountApp))

app.listen(3000)
```
