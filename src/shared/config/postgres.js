import pg from 'pg';
import config from './index.js';
import logger from './logger.js';

const {Pool} = pg;

class PostgresConnection {  
    constructor() { 
        this.pool=null;
    }

    getPool() {
        if(!this.pool) {
            this.pool = new Pool({
                host: config.postgres.host,
                port: config.postgres.port,
                database: config.postgres.database,
                user: config.postgres.username,
                password: config.postgres.password,
                max: 20,
                idleTimeoutMillis: 30000, 
                connectionTimeoutMillis: 2000,
            });
            this.pool.on('error', (err) => {
                logger.error('Unexpected error on idle Postgres client: %o', err);
            }) 
            logger.info(`Postgres Pool created for ${config.postgres.host}:${config.postgres.port}/${config.postgres.database}`);
            return this.pool;
        }   
    }

    async testConnection() {
        try{
            const pool=this.getPool();
            const client=await pool.connect();
            const result = await client.query("SELECT NOW();")
            logger.info(`PG Connected Successfully at ${result.rows[0].now}`)
        }catch(err) {
            logger.err("Failed to connect to PG", err);
            throw err;
        }
    }

    async query(text, params){
        const pool = this.getPool();
        const start = Date.now();
        try {
            const result = await pool.query(text, params);
            const duration = Date.now();
            logger.debug("Executed query", {text, duration, rows: result.rowCount});
            return result;
        } catch(error) {
            logger.error("Query error:", {text, error:error.message});
            throw error;
        }
    }

    async close() {
        if(this.pool) {
            await this.pool.end();
            this.pool=null;
            logger.info("PG pool closed");
        }
    }
}

export default new PostgresConnection();
