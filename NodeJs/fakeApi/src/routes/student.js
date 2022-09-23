const express = require('express');
const router = express.Router();

const studentController = require('../app/controllers/StudentController');



router.post('/create', studentController.create);
router.post('/:id/restore', studentController.restore);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);
router.get('/', studentController.show);

module.exports = router;