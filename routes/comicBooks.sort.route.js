const express = require('express');
const ComicBook = require('../models/comicBooks.model');

const router = express.Router();

router.get('/comic-books', async (req, res) => {
    try {
      // Pagination setup
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
  
      // Filters setup
      const filters = {};
      if (req.query.author) filters.author = req.query.author;
      if (req.query.year) filters.year = parseInt(req.query.year);
      if (req.query.price) filters.price = parseFloat(req.query.price);
      if (req.query.condition) filters.condition = req.query.condition;
  
      // Sorting setup
      const sortField = req.query.sortBy || 'name';
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
  
      // Aggregation pipeline
      const pipeline = [
        { $match: filters },
        { $sort: { [sortField]: sortOrder } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ];
  
      // Count pipeline for total documents
      const countPipeline = [
        { $match: filters },
        { $count: "totalCount" }
      ];
  
      // Execute aggregation query
      const comicBooks = await ComicBook.aggregate(pipeline);
      const total = await ComicBook.aggregate(countPipeline);
  
      const totalCount = total[0] ? total[0].totalCount : 0;
  
      // Calculate total pages u
      const totalPages = (totalCount % limit === 0) ? (totalCount / limit) : Math.floor(totalCount / limit) + 1;
  
      // Return results
      res.json({
        total: totalCount,
        page,
        limit,
        totalPages,
        comicBooks
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comic books', error });
    }
  });

  module.exports = router
  