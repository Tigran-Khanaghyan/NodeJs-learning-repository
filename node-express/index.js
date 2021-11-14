const Joi = require('joi')
const express = require("express");

const app = express();

app.use(express.json())

const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course'},
  {id: 3, name: 'course'},
]

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((item) => item.id === parseInt(req.params.id))
  if(!course) res.status(404).send('Page not found!')
  res.send(course)
})
app.post("/api/courses", (req, res) => {
  if(!req.body.name){
    res.status(400).send('Name is required')
    return 
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  let course = courses.find((item) => item.id === parseInt(req.params.id))
  if(!course) res.status(404).send('Page not found!')

  const scheme = {
    name: Joi.string().min(3).required()
  }
  const result = new Joi.ValidationError(req.body, scheme)
  if(result.error) {
    res.status(400).send(result.error.details[0].message)
    return 
  }
  course.name = req.body.name
  res.send(course)
})

app.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((item) => item.id === parseInt(req.params.id))
  if(!course) res.status(404).send('Page not found!')

  const index = courses.indexOf(course)
  courses.splice(index, 1)
  res.send(courses)
})



const port = process.env.PORT || 3000

app.listen(3000, () => console.log("Listening on port 3000"));
