
require("dotenv").config();

const { connectToDatabase } = require('./models');
const createApp = require('./app');

const port = process.env.PORT || 4444;

const handleStartServerFailure = (err) => {
    console.error('Failed to start server', err);
    process.exit(1);
};

const startServer = async () => {
    try {
        await connectToDatabase();

        const app = createApp();

        app.listen(port, err => {
            if (err) {
                handleStartServerFailure(err);
            }
            console.error(`Server is listening on port ${port}`);
        });
    } catch (err) {
        handleStartServerFailure(err)
    }
}

startServer();
