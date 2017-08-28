const express = require('express');
const app = express();
app.use(express.static('./dist'));

app.listen(8415);
console.log('success listen at port:8415......');