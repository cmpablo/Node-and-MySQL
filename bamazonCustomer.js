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
    console.log(chalk.greenBright("\nConnected as id " + connection.threadId));
    displayItems();
})

function displayItems() {
    console.log("\nDisplaying all items...............\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n" + res);
        connection.end();
    })
}