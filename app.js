const express = require('express');
const port = 8000;
const app = express();
let tasks = [];
let currentID = 0;
app.use(express.json());

/// refractoring routes

const gettask = (req, res) => {
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
};

const gettalltasks = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: tasks.length,
    data: {
      tasks,
    },
  });
};

const addingtasks = (req, res) => {
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
};
const edittask = (req, res) => {
  if (req.parms.id * 1 > tasks.length)
    return res.status(404).json({ message: 'task not found' });
  res.status(200).json({
    message: 'sucess',
    data: '<done>',
  });
};
const deletetask = (req, res) => {
  if (req.parms.id * 1 > tasks.length)
    return res.status(404).json({ message: 'task not found' });
  res.status(200).json({
    message: 'deleted',
    data: '<deleted>',
  });
};

// routes //
// app.get('tasks/:id', gettask);
// app.patch('/tasks/:id', edittask);
// app.delete('/tasks/:id', deletetask);
// app.get('/tasks', gettalltasks);
// app.post('/tasks', addingtasks);

app.route('/tasks').get(gettalltasks).post(addingtasks);
app.route('/tasks/:id').get(gettask).patch(edittask).delete(deletetask);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
