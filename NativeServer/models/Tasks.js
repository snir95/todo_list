const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: 'lightgreen',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    tag: {
        type: String,
        default: 'regular',
    },
})
const Task = mongoose.model('Tasks', taskSchema)
module.exports = Task
