const mongoose = require('mongoose');

const dbConnects = async() => {await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
}

// Export mongoose connection for use in other parts of the app
module.exports = dbConnects;
