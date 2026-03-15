import dotenv from 'dotenv';

dotenv.config();

const config = {
    node_env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,

    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/api_monitoring',
        dbName: process.env.MONGO_DB_NAME || 'api_monitoring',
    },

    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        database: process.env.POSTGRES_DB || 'api_monitoring',
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
    },

    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
        queue: process.env.RABBITMQ_QUEUE || 'api_hits',
        publishConfirm: process.env.RABBITMQ_PUBLISH_CONFIRM === 'true' || false,
        retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS, 10) || 3,
        retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY, 10) || 5000,
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

    rate_limit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 90000, 
        max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 1000, // limit each IP to 100 requests per windowMs
    },
};

export default config;
