# Node + MySQL

### What is this?

Bamazon is an Amazon-like CLI app created with Node and MySQL.

### How does it work?

Customer View                                                     | Actions (via prompt input)
----------------------------------------------------------------- | -----------------------------
Customer inputs the item's ID number and their desired quantities | Bamazon checks if there is enough inventory to fulfill the order and provides either a success message or an out-of-stock message

Manager View           | Actions (via prompt choices)
---------------------- | -----------------------------
View Products for Sale | View the full inventory
View Low Inventory     | View inventory items with quantities of 5 or less units
Add to Inventory       | Add units to an existing item's quantities
Add New Product        | Add a completely new item to the database
Exit                   | Exit prompt

### GIFs

Customer View - Purchase<br/>
![Cust Purchase](images/bamazon_cust_purchase.gif)

Customer View - Out-of-Stock<br/>
![Cust Out-of-Stock](images/bamazon_cust_out_of_stock.gif)

Manager View - View Products<br/>
![Mgr View Prod](images/bamazon_mgr_view_products.gif)

Manager View - View Low Inventory<br/>
![Mgr View Low Inv](images/bamazon_mgr_low_inventory.gif)

Manager View - Update Inventory<br/>
![Mgr Update Inv](images/bamazon_mgr_update_inventory.gif)

Manager View - Add New Item<br/>
![Mgr Add New Prod](images/bamazon_mgr_add_new_item.gif)

### Detail Screenshots

Customer View - Successful Purchase Message<br/>
![Cust Purchase Success](images/cust_purchase.jpg)

Customer View - Out-of-Stock Message<br/>
![Cust Out-of-Stock Msg](images/cust_out_of_stock.jpg)

Manager View - Prompt<br/>
![Mgr Prompt](images/mgr_prompt.jpg)

Manager View - Low Inventory Message<br/>
![Mgr Low Inv Msg](images/mgr_low_inventory.jpg)

Manager View - Update Inventory Message<br/>
![Mgr Update Inv Msg](images/mgr_update_inventory.jpg)

Manager View - Add New Product Message<br/>
![Mgr New Prod Msg](images/mgr_add_new_item.jpg)

### Technologies Applied

* node.js
* JavaScript
* MAMP
* Sequel Pro
* Node Packages
    * MySQL
    * CLI Table
    * Inquirer
    * Chalk