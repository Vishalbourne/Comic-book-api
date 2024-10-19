
// create a comic book schema


const mongoose = require('mongoose');

const comicBookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  numberOfPages: { type: Number, required: true },
  condition: { type: String, enum: ['new', 'used'], required: true },
  description: { type: String },
},
{
    createdAt: { type: Date, default:  Date.now()}
});

const ComicBook = mongoose.model('ComicBook', comicBookSchema);

module.exports = ComicBook;
