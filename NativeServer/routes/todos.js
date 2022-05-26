const express = require('express')

const router = express.Router()
const Task = require('../models/Tasks')

router.get('/', async ({}, res) => {
    try {
        // res.send('we are on home')
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.json({message: error})
    }
})

router.post('/', async (req, res) => {
    console.log('todos', req.body, req.headers)
    const task = new Task({
        title: req.body.title,
        bgColor: req.body.bgColor,
        isActive: req.body.isActive,
        tag: req.body.tag,
    })
    try {
        const savedTask = await task.save()
        res.json(savedTask)
    } catch (error) {
        res.json({message: error})
    }
})

router.put('/:taskId', async (req, res) => {
    try {
        const filter = {_id: req.params.taskId}
        const update = {...req.body}

        const updatedTask = await Task.findOneAndUpdate(filter, update, {returnOriginal: false})
        res.json(updatedTask)
    } catch (err) {
        res.json({message: err})
    }
})

router.delete('/:taskId', async (req, res) => {
    try {
        console.log('req.params: ', req.params)
        const removedTask = await Task.deleteOne({_id: req.params.taskId})
        rescape.json(removedTask)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router
