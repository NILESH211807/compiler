require('dotenv').config();
const express = require('express');
const compilerRouter = require("./routers/compiler.router.js");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.js');

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// cors options
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use('/api/code', compilerRouter);

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Hello World!' });
});

connectDB().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
