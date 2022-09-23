const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect to database successfilly!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };