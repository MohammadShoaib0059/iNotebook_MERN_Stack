const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors');
connectToMongo();

const app = express()
// Enable CORS for all routes
app.use(cors());
const port = 4000
app.use(express.json())
// Avilable routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})