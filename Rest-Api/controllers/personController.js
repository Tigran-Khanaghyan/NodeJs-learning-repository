const Person = require("../models/personModel");

async function getPersons(req, res) {
  try {
    const persons = await Person.find();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
}

async function createPerson(req, res) {
  try {
   const person = {
     firstName: 'Valod',
     lastName: 'Valodyan',
     gender: 'male'
   }
   const newPerson = await Person.create(person)
   res.writeHead(201, {'Content-type': 'application/json'})
   return res.end(JSON.stringify(newPerson))
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  createPerson
};
