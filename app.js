const express = require('express')
const cors = require('cors')

const db = require('./database/mysql')
const app = express();

app.use(cors())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
