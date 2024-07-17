const express = require('express')
const app = express()
const PORT = 5000
const axios = require('axios')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const secrets = require('./secrets')

app.use(morgan('common'))

app.use(bodyParser.json())
const username = secrets.alloy_api_key
const password = secrets.alloy_api_secret

console.log(username, password);

// let data = `${username}:${password}`;
// let buff = new Buffer.from(data);
// let base64data = buff.toString('base64')
// console.log(base64data);

app.get('/parameters', async (req,res) => {
    const response = await axios.get('https://sandbox.alloy.co/v1/parameters',
    {
            auth: `Basic ${Buffer.from(`${username}:${password}`).toString(
                'base64'
              )}`
    }
)

    console.log(response.data)
})

app.post('/evaluations', async (req, res) => {

    const response = await axios.post('https://sandbox.alloy.co/v1/evaluations', {...req.body, 'address_country_code' : 'US'},  {
        auth: `Basic ${base64data}`
    })
    .catch(err => console.error(err))

    res.send(response.data)
    console.log("SERVER", response.data)
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})