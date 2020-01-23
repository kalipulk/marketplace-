var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Murphy2190!",
    database: "marketplace_DB"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    runBuyProduct();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
    //   connection.end();
    });
}

function runBuyProduct() {
    inquirer
      .prompt({
        name: "action",
        type: "input",
        message: "What product would you like to buy?",
      })
      .then(function(answer) {
        switch (answer.action) {
      });
  }