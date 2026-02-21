const express = require('express');
const port = 8000;
const app = express();
let tasks = [];
let currentID = 0;
app.use(express.json());
/// route to get all the task
app.get('/tasks', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

/// route to get task by id

app.get('tasks/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tasks.length) {
    return res.status(404).json({ message: 'not found' });
  }
  const task = tasks.find((el) => el.id === req.params);
  res.status(200).json({
    status: 'sucess',
    data: {
      task,
    },
  });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(404).json({ message: 'Enter your title ' });
  }
  const newtask = {
    id: currentID++,
    title,
    status: false,
    createdon: new Date(),
  };

  tasks.push(newtask);
  res.status(201).json(newtask);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
