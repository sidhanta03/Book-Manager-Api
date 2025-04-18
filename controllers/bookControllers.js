const Book = require('../models/book');

async function getAllBooks(req, res) {
    const books = await Book.find();
    res.json(books);
}

async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch {
        res.status(400).json({ error: 'Invalid ID format' });
    }
}

async function createBook(req, res) {
    try {
        const { title, author, published_date, pages } = req.body;
        if (!title || !author || !published_date || !pages) return res.status(400).json({ error: 'All fields required' });

        const book = new Book({ title, author, published_date, pages });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updateBook(req, res) {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteBook(req, res) {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch {
        res.status(400).json({ error: 'Invalid ID format' });
    }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
