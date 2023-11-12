# databases

Semester Project and Lab Assignments for the [Databases](https://www.ece.ntua.gr/en/undergraduate/courses/3123) course, during the 6th semester of the School of Electrical and Computer Engineering at the National Technical University of Athens.

## Contributors

- [Georgios Kyriakopoulos](https://github.com/geokyr)
- [Gerasimos Deligiannis](https://github.com/GerasimosDel)
- [Serafeim Tzelepis](https://github.com/sertze)

## Project Description

Under the threat of COVID-19, the ASDF Palace Hotel is developing a digital solution to facilitate contactless operations within the hotel, including check-in, payment and other services. The solution will use technologies such as NFC-enabled bracelets. The project will also include the implementation of a contact tracing system to quickly identify and contain any potential outbreak. The system will be implemented as a Web Application, with a Database Backend and a User Interface.

## Tools

We used [MySQL Server](https://dev.mysql.com/downloads/mysql/) for our Database Management System and [MySQL Workbench](https://www.mysql.com/products/workbench/) for a better overview and management of our database.

For the user interface, we used [JavaSciprt](https://www.javascript.com/) and more specifically the [React.js](https://reactjs.org/) framework, while for our server we used the [Node.js](https://nodejs.org/en/) runtime together with the [Express](http://expressjs.com/) framework.

The development was done on a [Windows 10](https://www.microsoft.com/en-us/software-download/windows10ISO) platform and we used [GitHub](https://github.com/) as our version control tool and as a place to showcase our project and provide a guide to deploy our application.

## Deployment

- Make sure that MySQL Server, MySQL Workbench, Git, Node.js and npm are installed.
- Clone this repository
- To import the database:
  - Create or connect to a MySQL connection
  - Server → Data Import → Import from Self-Contained File → Select the `/resources/database.sql` file
  - Default Target Schema → New → Select a name for the database (for example asdf_palace) → Select Dump Structure and Data → Start Import
- Run the following command on the `/server` and then on the `/ui` directory, to download and install the `node_modules`:
```
npm install
```
- Run the following command on the `/server` and then on the `/ui` directory, having the database service running on the background (`MySQL80 Service` - by default):
```
npm start
```
- The application will be loaded on the default browser at `localhost:3000`

## Lab Assignments

There was 1 lab assignment, which aimed to provide familiarity with Entity-Relationship Diagrams, Relational Algebra and SQL.
