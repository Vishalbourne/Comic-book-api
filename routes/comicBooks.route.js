const express = require('express');
const ComicBook = require('../models/comicBooks.model');
const router = express.Router();




// Create a comic book
router.post('/comic-create', async (req, res) => {
  let {name,author,year,price,discount,numberOfPages,condition,description} = req.body
  try {
    const comic = await ComicBook.create({
    name,
    author,
    year,
    price,
    discount,
    numberOfPages,
    condition,
    description
    });
    res.status(201).json(comic);
  } catch (error) {
    res.status(400).json(error);
  }

  const comicBook = await ComicBook.insertMany(comicBooks)
  res.status(201).json(comicBook);

});

// Edit a comic book
router.patch('/comics-update/:id', async (req, res) => {
    try {
      const comic = await ComicBook.findOneAndUpdate(req.params.id, req.body, { new : true});
      if (!comic) {
        return res.status(404).json({"error":"Comic Book not found"});
      }
      res.json(comic);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
  

  // Delete a comic book
router.delete('/comics-delete/:id', async (req, res) => {
    try {
      const comicBookId = req.params.id;
      const comic = await ComicBook.findOneAndDelete(comicBookId);
      if (!comic) {
        return res.status(404).json({"error":"Comic Book not found"});
      }
      res.json(comic);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  module.exports = router;
  
