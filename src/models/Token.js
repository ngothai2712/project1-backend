import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TokenSchema = new Schema({
    token: {
        type: String,
    },
})

module.exports = mongoose.model('Token', TokenSchema)
