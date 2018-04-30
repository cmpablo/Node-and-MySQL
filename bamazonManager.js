var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');
var chalk = require('chalk');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.yellow.inverse("\nConnected as id " + connection.threadId + "\n\n"));
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View products for sale",
                "View low inventory",
                "Add to inventory",
                "Add new product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View products for sale":
                    viewProducts();
                    break;

                case "View low inventory":
                    viewLowInventory();
                    break;

                case "Add to inventory":
                    updateInventory();
                    break;

                case "Add new product":
                    addNewProduct();
                    break;
                case "Exit":
                    connection.end();
                    break;
            };
        });
};

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        var table = new Table({

            head: ['ID', 'Product Name', 'Dept Name', 'Price', 'Qty'],
            colWidths: [5, 50, 20, 10, 7]
        });
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        };

        console.log(chalk.cyan("\n\nBamazon Products for Sale ..................................................\n"))
        console.log("\n" + table.toString() + "\n");

        start();
    });
};

function viewLowInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        var table = new Table({

            head: ['ID', 'Product Name', 'Dept Name', 'Price', 'Qty'],
            colWidths: [5, 50, 20, 10, 7]
        });
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            };
        };

        console.log(chalk.cyan("\n\nBamazon Low Inventory ..................................................\n"))
        console.log("\n" + table.toString() + "\n\n");

        start();
    });
};

function updateInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({

            head: ['ID', 'Product Name', 'Dept Name', 'Price', 'Qty'],
            colWidths: [5, 50, 20, 10, 7]
        });
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }

        // what to update and how many?
        inquirer
            .prompt([{
                    name: "itemId",
                    type: "input",
                    message: "What is the ID of the item you'd like to update?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units do you want to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var idChoice = answer.itemId - 1;
                var prodChoice = res[idChoice];
                var qtyChoice = answer.quantity;

                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: prodChoice.stock_quantity + parseInt(qtyChoice)
                        },
                        {
                            item_ID: prodChoice.item_ID
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;

                        console.log(chalk.cyan("\n\n" + prodChoice.product_name + " has been updated  ..................................................\n\n"));

                        start();
                    });
            });
    });
}