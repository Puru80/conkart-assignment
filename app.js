require('dotenv').config();

const express = require('express')
const cors = require('cors')

const db = require('./database/mysql')
const app = express();

const routes = require('./routes/index')
const bodyParser = require('body-parser')
const authenticator = require('./middlewares/auth-middleware');
const util = require('util')

app.use(cors())
app.use(authenticator);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Setup routes
routes(app)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
