const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const mssql = require('mssql');
const dbconfig = require('../../.dbconfig');

const app = express();

app.use(express.static('dist'));

// Body Parser Middleware
app.use(bodyParser.json());


// Function to connect to database and execute query
const executeQuery = (response, query) => {
  mssql.connect(dbconfig, (error) => {
    if (error) {
      console.log(`Error while connecting database :- ${error}`);
      response.send(error);
      mssql.close();
    } else {
      // create Request object
      const request = new mssql.Request();
      // query to the database
      request.query(query, (err, res) => {
        if (err) {
          console.log(`Error while querying database :- ${err}`);
          response.send(err);
        } else {
          response.send(res);
        }
        mssql.close();
      });
    }
  });
};

app.get('/api/getAllProducts', (req, res) => {
  const query = 'select * from Production.ProductInventory';
  executeQuery(res, query);
});
app.listen(8080, () => console.log('Listening on port 8080!'));
