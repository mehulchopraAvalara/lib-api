const express = require('express');
const bodyParser = require('body-parser');

let count = 2;
const books = [
    {
        id: 1,
        title: 'Book1',
        price: 700,
    },
    {
        id: 2,
        title: 'Book 2',
        price: 450,
    },
]
const app = express();

app.use(bodyParser.json());

app.get('/api/books', (req, res) => {
    const query = req.query;
    if (query && query.price) {
        const result = books.filter(book => book.price === parseInt(query.price));
        if (result && result.length) {
            res.send(result[0]);
        } else {
            res.status(404).end();
        }
    } else {
        res.send(books);
    }
});

app.get('/api/books/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const result = books.filter(book => book.id === parseInt(bookId));
    if (result && result.length) {
        res.send(result[0]);
    } else {
        res.status(404).end();
    }
});

app.post('/api/books', (req, res) => {
    const body = req.body;
    count++;
    body.id = count;

    books.push(body);
    res.status(201).send(body);
});

app.post('/api/employees/:employeeId/books/:bookId', (req, res) => {

});

app.listen(9768, () => {
    console.log('Server running on port 9768');
});