const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongo');
const Student = require('../models/Student')

class StudentController {

    // [GET] /student/
    show(req, res, next) {

        Student.find({})
            .then(response => {
                const queryParams = { ...req.query };
                const responseFilter = response.filter(r => {
                    let exist = true;

                    for (let i in queryParams) {
                        const check = r[i].toString().includes(queryParams[i]);
                        if (!check) {
                            exist = false;
                        }
                    }

                    return exist;
                })
                res.json({
                    students: multipleMongooseToObject(responseFilter),
                    query: queryParams
                })

            }
            )
            .catch(next);
    }

    // [POST] /student/create
    create(req, res, next) {
        const student = new Student(req.body);
        student
            .save()
            .then(response => res.json(req.body))
            .catch(next);
    }

    // [delete] /student/:id

    delete(req, res, next) {
        Student.delete({ _id: req.params.id })
            .then((response) => res.json(response))
            .catch(next)
    }

    // [update] /student/:id
    update(req, res, next) {
        Student.updateOne({ _id: req.params.id }, req.body)
            .then((response) => res.json(response))
            .catch(next)
    }

    // [restore] /student/:id/restore
    restore(req, res, next) {
        Student.restore({ _id: req.params.id })
            .then((response) => res.json(response))
            .catch(next)
    }
}

module.exports = new StudentController