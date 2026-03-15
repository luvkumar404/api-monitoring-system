import mongoose from "mongoose";
import logger from "./logger.js";
import config from "./index.js";

class MongoConnection {
    constructor() {
        this.connection = null;
    }

    /**
     * Connect to MongoDB
     * @returns {Promise<mongoose.Connection>}
     */

    async connect() {
        try {
            if(this.connection) {
                logger.info('MongoDB connection already established');
                return this.connection;
            }
            await mongoose.connect(config.mongo.uri, {
                dbName: config.mongo.dbName,
            }); 
            logger.info(`Mongo Connected ${config.mongo.uri}`);
        } catch (error) {
            logger.error('MongoDB connection error: %o', error);
            throw error;
        }
    }

    async disconnect() {    
        try {
            if(this.connection) {
                await mongoose.disconnect();
                this.connection = null;
                logger.info('MongoDB connection closed');
            }
        }catch (error) {
            logger.error('MongoDB disconnection error: %o', error);
            throw error;
        }
    } 

    getConnection() {
        return this.connection;
    }

}

export default MongoConnection;