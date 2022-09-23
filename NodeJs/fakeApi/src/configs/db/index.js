const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/studentApi', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connect database!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };