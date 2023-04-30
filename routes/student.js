const express = require('express');
const router = express.Router()
const {
    getAllStudents,
    createStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/student')

router.route('/').get(getAllStudents).post(createStudent)

router.route('/:id').get(getSingleStudent).patch(updateStudent).delete(deleteStudent)

module.exports = router