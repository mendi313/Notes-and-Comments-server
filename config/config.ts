import dotenv from 'dotenv';

dotenv.config();

// DECLARE ALL VARIABLES
const MONGO_URL = process.env.MONGO_CONNECT_URL || '';

//CREATE CONFIG OBJECT
const config = {
    mongo: {
        url: MONGO_URL,
    },
};

//EXPORT
export default config;