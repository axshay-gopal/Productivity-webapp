const express = require('express');
const port = 8000;
const app = express();

app.get('/progress', (req, res) => {
  res.status(200).json({ message: 'view your progess here' });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
