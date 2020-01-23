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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    manager();
});

function manager() {
    inquirer
        .prompt({
            name: "managerOptions",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View products for Sale", "View Low Inventory Products",
                "Add to Inventory", "Add a New Product", "Exit"
            ]
        }).then(function (answer) {
            switch (answer.managerOptions) {
                case "View products for Sale":
                    showProducts();
                    break;
                case "View Low Inventory Products":
                    lowProducts();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add a New Product":
                    addNewProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function lowProducts() {
    connection.query("SELECT * FROM products WHERE quantity < 10", function (err, res) {
        if (err) throw err;
        console.table(res);
        addInventory();
    });
}

function addInventory() {
    showProducts();
    inquirer
        .prompt([

            {
                name: "addProduct",
                type: "input",
                message: "What product, by ID, would you like to add inventory to?",
            },
            {
                name: "amountProduct",
                type: "input",
                message: "How much would you like to add?",
            }
        ]).then(function (answer) {
            console.log("\n", answer)
            connection.query("SELECT * FROM products WHERE ?", {
                id: answer.addProduct
            }, function (err, res) {
                var newQuantity = res[0].quantity + parseInt(answer.amountProduct);
                var productName = res[0].name;
                connection.query("UPDATE products SET ? WHERE ?",
                    [{
                            quantity: newQuantity
                        },
                        {
                            id: answer.addProduct
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("\n Inventory added to " + productName);
                        showProducts();
                    });
            })
        });
}

function addNewProduct() {
    showProducts();
    inquirer
        .prompt([

            {
                name: "addNewProduct",
                type: "input",
                message: "What product would you like to add?",
            },
            {
                name: "productDepartment",
                type: "input",
                message: "Which department would you like to add your product to?",
            },
            {
                name: "newProductPrice",
                type: "input",
                message: "How much does this new product cost?",
            },
            {
                name: "newProductQuantity",
                type: "input",
                message: "How much new product would you like to add?",
            }
        ]).then(function (answer) {
            console.log("\n", answer)
            connection.query("INSERT INTO products (name, department, price, quantity) VALUES ( ?, ?, ?, ?);",
            [ answer.addNewProduct,
              answer.productDepartment,
              answer.newProductPrice,
              answer.newProductQuantity
            ], function (err, res) {
                showProducts();
            })
        });
}