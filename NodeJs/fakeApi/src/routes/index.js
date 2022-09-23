const studentRouter = require('./student')

function routes(app) {
    app.use('/student', studentRouter);
}

module.exports = routes