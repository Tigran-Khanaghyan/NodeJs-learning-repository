const Person = require("../models/personModel");
const { getPostData } = require("../utils");

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
    const body = await getPostData(req);
    const { firstName, lastName, gender } = JSON.parse(body);

    const person = { firstName, lastName, gender };
    const newPerson = await Person.create(person);

    res.writeHead(201, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify(newPerson))
  } catch (error) {
    console.log(error);
  }
}
async function deletePerson(req, res, id) {
  try {
    const person = await Person.findById(id);

    if(!person) {
      res.writeHead(404, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: 'Person not found!'}))
    }else {
      await Person.remove(id)
      res.writeHead(200, {'Content-Type':'application/json'})
      res.end(JSON.stringify({message: `Product ${id} removed`}))
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  createPerson,
  deletePerson
};
