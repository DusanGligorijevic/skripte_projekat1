const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('zdravo!');
});

app.listen(8000);
