const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'asdf_palace'
}); 

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.get('/services', (req,res) => {
  try{
    const getServicesQuery = "SELECT * FROM services";
    con.query(getServicesQuery, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/visits', (req,res) => {
  try{
    let servicePartOfQuery = "";

    if(req.query.service && Array.isArray(req.query.service)) {
      servicePartOfQuery += `AND S.service_description IN (`;
      req.query.service.forEach((service, i) => {
        if(i === 0) servicePartOfQuery += `'${service}'` 
        else servicePartOfQuery += `,'${service}'` 
      })
      servicePartOfQuery += ')' 
    }
    else if(req.query.service && !Array.isArray(req.query.service)){
      servicePartOfQuery += `AND S.service_description = '${req.query.service}' ` 
    }
    else servicePartOfQuery = `AND S.service_description IN ("")`;


    let costPartOfQuery = "";

    if(req.query.lowcostlimit && req.query.highcostlimit){
      costPartOfQuery = `AND SC.charge_amount BETWEEN ${parseFloat(req.query.lowcostlimit, 10)} AND ${parseFloat(req.query.highcostlimit, 10)}`
    }

    let datePartOfQuery = "";

    if(req.query.firstdatelimit && req.query.finaldatelimit){
      datePartOfQuery = `AND SC.date_time_of_charge BETWEEN '${req.query.firstdatelimit.replace("@", " ")}' AND '${req.query.finaldatelimit.replace("@", " ")}'`
    }


    const getServiceVisits = `SELECT S.id_service, C.id_nfc, SC.date_time_of_charge, SC.charge_description, SC.charge_amount, C.first_name, C.last_name, S.service_description
    FROM service_charge AS SC, customers AS C, services AS S
    WHERE SC.id_nfc = C.id_nfc AND SC.id_service = S.id_service ${servicePartOfQuery} ${costPartOfQuery} ${datePartOfQuery}
    `
    con.query(getServiceVisits, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/salesperservice', (req,res) => {
  try{
    const getSalesPerService = "SELECT * FROM sales";
    
    con.query(getSalesPerService, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/customerdetails', (req,res) => {
  try{
    const getSalesPerService = "SELECT * FROM customer_details";
    
    con.query(getSalesPerService, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/infectedplaces', (req,res) => {
  try{
    
    const getPlacesFromInfectedPerson = 
    `SELECT P.id_place, P.place_name, P.place_location, V.date_of_entry, V.date_of_exit
     FROM visit AS V, customers AS C, places AS P 
     WHERE V.id_nfc = C.id_nfc AND V.id_place = P.id_place AND C.id_nfc = ${req.query.id_nfc}
    `;

    con.query(getPlacesFromInfectedPerson, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/infectedpersons', (req,res) => {
  try{
    
    const getPlacesFromInfectedPerson = 
            `SELECT C.first_name, C.last_name, C.id_nfc, B.id_place, B.date_of_entry, B.date_of_exit
            FROM visit A, visit B, customers C
            WHERE A.id_nfc = ${req.query.id_nfc} AND B.id_nfc = C.id_nfc AND A.id_nfc <> B.id_nfc AND A.id_place = B.id_place AND NOT(B.date_of_entry > DATE_ADD(A.date_of_exit, INTERVAL 1 DAY) OR B.date_of_exit < A.date_of_entry);            
            `;


    con.query(getPlacesFromInfectedPerson, function (err, result, fields) {
      if (err) throw err;
      res.status(200).json(result);
    });
  
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.get('/mostvisitedplaces', (req,res) => {
  let lastMonth = req.query.lastMonth.toUpperCase()

  let ageGroup = ''

  if(req.query.ageGroup == "2040") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 41 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 20 YEAR)"
  }
  else if(req.query.ageGroup == "4160") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 61 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 41 YEAR)"

  }
  else ageGroup = "C.birthdate <= DATE_SUB(CURDATE(), INTERVAL 61 YEAR)"

    try{

      const getMostVisitedPlaces = 
              `SELECT P.id_place, P.place_name, COUNT(P.id_place) as visits_count
                FROM visit as V, places as P, customers as C
                WHERE V.id_place = P.id_place AND V.id_nfc = C.id_nfc AND ${ageGroup} AND V.date_of_entry >= DATE_SUB(CURDATE(), INTERVAL 1 ${lastMonth})
                GROUP BY P.id_place
                ORDER BY COUNT(P.id_place) DESC;
              `;


      con.query(getMostVisitedPlaces, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
      });
    
    }
    catch(e){
      res.status(400).send(e)
    }
})

app.get('/mostusedservices', (req,res) => {
  
  let lastMonth = req.query.lastMonth.toUpperCase()

  let ageGroup = ''
  
  if(req.query.ageGroup == "2040") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 41 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 20 YEAR)"
  }
  else if(req.query.ageGroup == "4160") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 61 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 41 YEAR)"
  
  }
  else ageGroup = "C.birthdate <= DATE_SUB(CURDATE(), INTERVAL 61 YEAR)"
  

    try{
      const getMostUsedServices =   
              ` SELECT S.service_description, COUNT(V.id_service) as times_used 
                FROM service_charge as V, customers as C, services as S
                WHERE  V.id_nfc = C.id_nfc AND V.id_service = S.id_service AND ${ageGroup} AND V.date_time_of_charge >= DATE_SUB(CURDATE(), INTERVAL 1 ${lastMonth})
                GROUP BY S.service_description
                ORDER BY COUNT(V.id_service) DESC;                
              `;
  
      con.query(getMostUsedServices, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
      });
    
    }
    catch(e){
      res.status(400).send(e)
    }
})

app.get('/serviceswithmostusers', (req,res) => {
  let lastMonth = req.query.lastMonth.toUpperCase()

  let ageGroup = ''
  
  if(req.query.ageGroup == "2040") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 41 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 20 YEAR)"
  }
  else if(req.query.ageGroup == "4160") {
    ageGroup = "C.birthdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 61 YEAR) AND DATE_SUB(CURDATE(), INTERVAL 41 YEAR)"
  
  }
  else ageGroup = "C.birthdate <= DATE_SUB(CURDATE(), INTERVAL 61 YEAR)"

    try{
      const getServicesWithMostUsers =   
              ` SELECT S.service_description, COUNT(DISTINCT C.id_nfc) as customers_count
                FROM customers as C, services as S, service_charge as R
                WHERE R.id_service = S.id_service AND R.id_nfc = C.id_nfc AND ${ageGroup} AND R.date_time_of_charge >= DATE_SUB(CURDATE(), INTERVAL 1 ${lastMonth})
                GROUP BY S.service_description
                ORDER BY COUNT(DISTINCT C.id_nfc) DESC;               
              `;
  
      con.query(getServicesWithMostUsers, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
      });
    
    }
    catch(e){
      res.status(400).send(e)
    }
})

app.listen(3001, () => {
  console.log('Server is up on port ' + 3001)
})