require('dotenv/config');
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const migrationsRun = require('./database/knex');

const AppError = require('./utils/AppError');

const routes = require('./routes');
migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.log(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
