const { multipleMongooseToObject } = require('../../utils/mongo')
const Course = require('../models/Course')

class SiteController {

    // [GET] /home
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', { courses: multipleMongooseToObject(courses) });
            })
            .catch(next)
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;