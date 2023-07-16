const router = require('express').Router()
const Person = require('../models/person')

// GET all people
router.get('/', async (req, res) => {
    const people = await Person.find()
    res.json(people)
})

// GET person by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findById(id)
    res.json(person)
})

// GET person by name
router.get('/name/:name', async (req, res) => {
    const { name } = req.params
    const people = await Person.find({ name })
    res.json(people)
})

// POST create new person
router.post('/', async (req, res) => {
    try {
        const person = await new Person(req.body).save()
        res.json(person)
    } catch (error) {
        console.error(error)
        res.json({ message: 'error creating user.' })
    }
})

// DELETE person by id
router.delete('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id)
        res.json(person)
    } catch (error) {
        console.error(error)
        res.json({ message: 'error deleting user.' })
    }
})

// PUT update person by id
router.put('/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body)
        res.json(person)
    } catch (error) {
        console.error(error)
        res.json({ message: 'error updating user.' })
    }
})

module.exports = router