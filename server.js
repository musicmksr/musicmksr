const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const app = express();
const root = `${__dirname}/src/client/public`;
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(root)); // static files
app.use(fallback('index.html', {root}));

app.listen(port, () =>{
	console.log(`Drunken Genius sippen on: ${port}`);
});
