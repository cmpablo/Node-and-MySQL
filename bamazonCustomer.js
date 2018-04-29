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
    console.log(chalk.yellow.inverse("\nConnected as id " + connection.threadId));
    checkAndPurchase();
})

function checkAndPurchase() {
    // display items for purchase
    console.log(chalk.cyan("\n\nWelcome to my store of random things!........................\n\n"));
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        var table = new Table({

            head: ['ID', 'Product Name', 'Dept Name', 'Price', 'Qty'],
            colWidths: [5, 50, 20, 10, 7]
        });
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_ID, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString() + "\n");

        // what to buy and how many?
        inquirer
            .prompt([{
                    name: "itemId",
                    type: "input",
                    message: "What is the ID of the item you'd like to purchase?",
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
                    message: "How many do you want to purchase?",
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
                var totalCost = prodChoice.price * qtyChoice;

                if (qtyChoice < prodChoice.stock_quantity) {
                    // if in stock
                    console.log(chalk.inverse.green("\nYour item(s) are available! Your order will be shipped in 1-2 business days."));
                    console.log(chalk.magenta("\n-------------------------------------------------------------------------------"));
                    console.log(chalk.green("\nYour total cost for " + qtyChoice + " " + prodChoice.product_name + " is $" + totalCost + "."));
                    console.log(chalk.green("\nThank you! Come again!"));

                    // update quantity
                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: prodChoice.stock_quantity - qtyChoice
                        },
                        {
                            item_ID: prodChoice.item_ID
                        }
                    ], function (err, res) {
                        if (err) throw err;

                        checkAndPurchase();
                    });

                } else {

                    // if out of stock
                    console.log(chalk.red.inverse("\nWe're sorry. We currently have " + prodChoice.stock_quantity + " items in " + prodChoice.product_name));
                    console.log(chalk.red("\nPlease adjust your quantity or check again later."));
                    checkAndPurchase();
                }
            })
    })
}