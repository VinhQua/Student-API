const notFound = (req,res) => res.status(404).json({msg:'Route not exist'})

module.exports = notFound