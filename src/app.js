const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }

  repositories.push(repository)

  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs,} = request.body;
  repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(repositoryIndex === -1)
      return response.status(400).json({error:"Repository doest not exist"});

  const repository = {
    id,
    title,
    url,
    techs,
    likes:repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(repositoryIndex === -1)
      return response.status(400).json({error:"Repository doest not exist"});

  repositories.splice(repositoryIndex,1);

  return response.status(204).send()
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(repositoryIndex === -1)
      return response.status(400).json({error:"Repository doest not exist"})

  
  repositories[repositoryIndex].likes++;
    
  return response.json(repositories[repositoryIndex])

});

module.exports = app;
