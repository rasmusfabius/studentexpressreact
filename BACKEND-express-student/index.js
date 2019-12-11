const express = require('express');
var cors = require('cors');
const studentRouter = require('./services/students');
const projectsRouter = require('./services/projects');
//const moviesRouter = require("./src/services/movies");

const server = express(); // Create http server with express

const port = 3001;

server.use(express.json()); // To parse request bodies into objects
server.use(cors());
server.use('/students', studentRouter);
server.use('/projects', projectsRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
