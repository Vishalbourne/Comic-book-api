const express = require('express');
const comicBookRoutes = require('./routes/comicBooks.route.js');
const comicBookRouteSorts = require('./routes/comicBooks.sort.route.js');
const comicBookRouteDetail = require('./routes/comicBooks.details.route.js');

const db = require('./config/mongoose-connection.js');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
db(); // Establish the database connection here

// Routes
app.use("/api/comic", comicBookRoutes);
app.use("/api/comic/sort", comicBookRouteSorts);
app.use("/api/comic/details", comicBookRouteDetail);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
