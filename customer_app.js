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
    console.log("connected as id " + connection.threadId + "\n");
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      runBuyProduct();
    });
}

function runBuyProduct() {
    inquirer
      .prompt({
        name: "product",
        type: "input",
        message: "What product, by ID, would you like to buy?",
      })
      .then(function(answer) {
        console.log("\n")
        productQuantity(answer.product);
      });
  }

function productQuantity(product) {
    inquirer
      .prompt({
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
      })
      .then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", {
            id: product
        }, function(err, res){
            if (err) throw err;
            if (res[0].quantity >= answer.quantity){
                var newQuantity = res[0].quantity - answer.quantity;
                var productName = res[0].name;
                var productPrice = res[0].price;
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        quantity:newQuantity
                    },
                    {
                        id:product
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log("\n Thanks for shopping with us! We hope you love your " + productName);
                    shopAgain();
                });
            } else {
                console.log("\n " + productName + "is out of stock. Please, check back later");
                shopAgain();
            }

        });
      });
  }  

function shopAgain() {
    inquirer
        .prompt ({
            name: "continue",
            type: "list",
            message: "Continue shopping?",
            choices: ["Yes", "No"]
        }).then(function(answer){
            if(answer.continue === "Yes"){
                runBuyProduct();
            } else {
                console.log("\n See you again soon!");
                connection.end();
            }
        });
}
