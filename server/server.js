const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const port = 5000 //process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'trash_bundle'
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});