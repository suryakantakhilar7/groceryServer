const express = require('express');
const app = express();
const connectDB = require('./config/config');
const cors = require('cors');
require('dotenv').config()

connectDB();
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api/v1', require('./routes/userRoute'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on Port: ${process.env.BASE_URL}:${PORT} `));