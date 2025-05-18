const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const UserRoute = require('./routes/UserRoute')

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(UserRoute)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
