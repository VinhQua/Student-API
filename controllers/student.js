const { NotFoundError, BadRequestError } = require('../errors')
const Student = require('../models/student')
const {StatusCodes}= require('http-status-codes')


const getAllStudents = async (req, res,next) =>{
    const {UserID,name} = req.user
    console.log(req.user)
    const students = await Student.find({createdBy:UserID}).sort('createdAt')
    res.status(StatusCodes.OK).json({items:students.length,data:students})
}

const createStudent = async (req, res, next) =>{
    const {UserID,name} = req.user
    req.body.createdBy = UserID

    const student = await Student.create({...req.body})
    res.status(StatusCodes.OK).json({success:true,data:student})

}

const getSingleStudent = async (req, res, next) =>{
    const {id} = req.params
    const {UserID,name} =req.user
    const student = await Student.findOne({_id:id,createdBy:UserID})
    if (!student) {
        throw new NotFoundError(`not student found with id ${id}`)
    }
    res.status(StatusCodes.OK).json({student})

}

const updateStudent = async (req, res, next) =>{
    const {id} = req.params
    const {UserID} =req.user
    const {name,cell} = req.body
    if (name === '' || cell === ''){
        throw new BadRequestError('name and cell phone must be provided')
    }
    const student = await Student.findByIdAndUpdate({_id:id,createdBy:UserID},
       req.body,
       {new:true,runValidators:true} 
        )
    if (!student){
        throw new NotFoundError(`No Student found with id ${id}`)
    }
    res.status(StatusCodes.OK).json({student})
}

const deleteStudent = async (req, res, next)=>{
    const {id} = req.params
    const {UserID} =req.user

    const student = await Student.findByIdAndRemove({
        _id:id,
        createdBy:UserID
    })
    if (!student){
        throw new NotFoundError(`No Student found with id ${id}`)
    }
    res.status(StatusCodes.OK).json({success: true,data: student})
}

module.exports = {
    getAllStudents,
    createStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
}