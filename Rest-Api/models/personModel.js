const persons = require("../data/persons.json");
const {nanoid} = require('nanoid')
const {writeDataToFile} = require('../utils')

function find() {
    return new Promise((resolve, reject) => {
        resolve(persons)
    })
}
function create(person) {
    return new Promise((resolve, reject) => {
        const newPerson = {id: nanoid(), ...person}
        persons.push(newPerson)
        writeDataToFile('./data/persons.json', persons)
        resolve(newPerson)
    })
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const person = persons.find((item) => item.id === id)
        resolve(person)
    })
}
function remove(id) {
    return new Promise((resolve, reject) => {
        const newPersons = persons.filter((person) => person.id !== id)
        writeDataToFile('./data/persons.json', newPersons)
        resolve()
    })
}

module.exports = {
    find,
    create,
    findById,
    remove
}