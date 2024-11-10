const userModel = require("../model/userModel")
const createBook = require("../model/msql-model/bookModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)
    const createBook = await createBook.findById(userId)

    if(user.role === 'ADMIN'){
        return true
    }

    return false
}


module.exports = uploadProductPermission