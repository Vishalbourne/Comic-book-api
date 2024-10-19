const express = require('express');
const router = express.Router();
const ComicBook = require('../models/comicBooks.model'); // Import your ComicBook model

// Get a specific comic book by ID
router.get('/comic-book/:id', async (req, res) => {
  try {
    // Extract the ID from the request parameters
    const comicBookId = req.params.id;

    // Fetch the comic book by ID
    const comicBook = await ComicBook.findOne(comicBookId);

    // If comic book not found, return a 404 response
    if (!comicBook) {
      return res.status(404).json({ message: 'Comic book not found' });
    }

    // Return the comic book details
    res.json(comicBook);
  } catch (error) {
    // Handle errors (invalid ID, etc.)
    res.status(500).json({ message: 'Error fetching comic book details', error });
  }
});

module.exports = router;
