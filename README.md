asdf-palace
-----------

Repository for the Databases course project. 

Simulation of a Hotel Unit Database.  

Managers:  
Deligiannis Gerasimos - el18807  
Kyriakopoulos Georgios - el18153  
Tzelepis Serafeim - el18849

## Tools
We used **MySQL Server** for our Database Management System and **MySQL Workbench** for a better overview and management of our database. For the user interface, we used **JavaSciprt** and more specifically the **React.js** framework, while for our server we used the **Node.js** runtime together with the **Express** framework. The development was done on a Windows 10 platform and we used GitHub as our version control tool and as a place to showcase our project and provide a guide to deploy our application.

## Deployment

* Make sure that [MySQL Server](https://dev.mysql.com/downloads/mysql/), [MySQL Workbench](https://www.mysql.com/products/workbench/), [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/package/download) are installed.
* Then the database will be imported:
  * Create or connect to a MySQL connection
  * Server → Data Import → Import from Self-Contained File → Select the file [database.sql](https://github.com/geokyr/asdf-palace/blob/main/database.sql)
  * Default Target Schema → New → Select a name for the database (for example asdf_palace) → Select Dump Structure and Data → Start Import
* Next run the following command to clone the repository:
```
git clone https://github.com/geokyr/asdf_palace.git
```
* Run the following command on the `/server` and then on the `/ui` directory, to download and install the `node_modules`:
```
npm install
```
* Run the following command on the `/server` and then on the `/ui` directory, having the database service running on the background (MySQL80 Service - by default):
```
npm start
```
* The application will be loaded on the default browser at `localhost:3000`.
