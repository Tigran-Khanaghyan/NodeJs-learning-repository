const persons = require("../data/persons.json");
const {nanoid} = require('nanoid')
const {writeDataToFile} = require('../../utils')

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

module.exports = {
    find,
    create
}