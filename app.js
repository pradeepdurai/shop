const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    return res.send("Hi");
})
app.listen(port, () => { console.log(`Server is Running in port No.${port}`) })