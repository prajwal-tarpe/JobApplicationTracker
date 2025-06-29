require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const cors = require('cors');
const EnsureAuthenticated = require('./Middlewares/Auth');
const JobRouter = require('./Routes/JobRouter')
require('./Models/db')

const app = express();

const PORT = process.env.PORT || 8082;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/jobs', EnsureAuthenticated, JobRouter);

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});