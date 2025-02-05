// Create web server 
// Create a route to handle the POST request to the comments endpoint
// Create a route to handle the GET request to the comments endpoint
// Create a route to handle the DELETE request to the comments endpoint
// Create a route to handle the PUT request to the comments endpoint
// Create a route to handle the PATCH request to the comments endpoint

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const comments = [
  {
    id: 1,
    username: 'Todd',
    comment: 'lol that is so funny!'
  },
  {
    id: 2,
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog'
  },
  {
    id: 3,
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd'
  },
  {
    id: 4,
    username: 'onlysayswoof',
    comment: 'woof woof woof'
  }
];

app.use(bodyParser.json());

app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(comment => comment.id === Number(id));
  if (!comment) {
    res.status(404).json({ message: `Comment with ID ${id} not found.` });
  } else {
    comments = comments.filter(comment => comment.id !== Number(id));
    res.status(204).end();
  }
});

app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body;
  const comment = comments.find(comment => comment.id === Number(id));
  if (!comment) {
    res.status(404).json({ message: `Comment with ID ${id} not found.` });
  } else {
    const index = comments.indexOf(comment);
    comments[index] = updatedComment;
    res.status(200).json(updatedComment);
  }
});

app.patch('/comments', (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body;
  const comment = comments.find(comment => comment.id === Number(id));
  if (!comment) {
    res.status(404).json({ message: `Comment with ID ${id} not found.` });
  } else {
    const index = comments.indexOf(comment);
    comments[index] = { ...comment, ...updatedComment };
    res.status(200).json(comments[index]);
  }
}