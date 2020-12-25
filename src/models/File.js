const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    originalName: {
        type: String,
    },
    path: {
        type: String,
    },
    filePath: {
        type: String,
    },
    fileName: {
        type: String,
    },
    userId: {
        type: String,
        ref: 'User',
    },
})

const File = mongoose.model('File', FileSchema)
module.exports = File
