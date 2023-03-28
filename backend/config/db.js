
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect('mongodb://user:droameTask@ac-atsxkbr-shard-00-00.e0dexcx.mongodb.net:27017,ac-atsxkbr-shard-00-01.e0dexcx.mongodb.net:27017,ac-atsxkbr-shard-00-02.e0dexcx.mongodb.net:27017/PROJECT0?ssl=true&replicaSet=atlas-8eqiim-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

module.exports = connectDB;