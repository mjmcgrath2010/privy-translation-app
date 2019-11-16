const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const TJO = require('translate-json-object')()
const dotEnv = require('dotenv')
dotEnv.config()
const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY

TJO.init({
  googleApiKey,
})

app.use(express.static(path.join(__dirname, 'build')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.post('/translate', function(req, res) {
  // An example scenario (json) object
  const { input, locale } = req.body
  TJO.translate(input, locale).then(data => {
    return res.json(data)
  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)
