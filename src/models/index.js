const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(error) {
        console.error('Failed to connect to database');
        throw error;
    }
}

module.exports = { connectToDatabase };
