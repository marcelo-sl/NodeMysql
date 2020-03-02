const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Creating Connection to DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'marcelo',
    password: 'marcelo123',
    database: 'nodeMysql'
});

// Connecting to DB
connection.connect();

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Create a post
app.post('/create/post', (req, res) => {
    connection.query('INSERT INTO posts (text) VALUES (?)', [`${req.body.text}`], (err, results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    });
});

// Get all posts
app.get('/posts', (req, res) => {
    connection.query('SELECT * FROM posts', (err, results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    });
})

// Get a single post
app.get('/posts/:id', (req, res) => {
    connection.query(`SELECT * FROM posts WHERE id = ${req.params.id}`, (err, results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    });
});

// Update a post
app.put('/update/post/:id', (req, res) => {
    connection.query('UPDATE posts SET text = ? WHERE id = ?', [`${req.body.text}`, req.params.id], (err, results) => {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    });
});

// Delete a post
app.delete('/delete/post/:id', (req, res) => {
    connection.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
        if(err) throw err;
        res.status(200).send('Post Deleted!');
    });
});

app.listen('5000', console.log('Server started on 5000 port!'));