require('dotenv').config()
module.exports = {
    PORT : process.env.PORT  || 3500,
    MONGODB_URL : process.env.MONGODB_URL,
    PASSPORT_SECRET_KEY : process.env.PASSPORT_SECRET_KEY
}