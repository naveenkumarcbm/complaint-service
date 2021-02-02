const express = require('express');
const dotenv = require("dotenv");
const db = require('./config');
var cors = require('cors')

const complaintsRouter = require('./routes/complaints');
const tokenValidation = require('./middlewares/tokenvalidation');

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api/complaints", tokenValidation, complaintsRouter);

app.listen(PORT, () => {
    console.log('Server starte at : '+PORT);
})