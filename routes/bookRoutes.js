const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookControllers');

router.get('/', authMiddleware, bookController.getAllBooks);
router.get('/:id', authMiddleware, bookController.getBookById);
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
