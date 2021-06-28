import './SecondScreen.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table.js';

function SecondScreen() {

    const [modeToggleFirstScreen, setModeToggleFirstScreen] = useState(0);
    const [servicesArray, setServicesArray] = useState([]);   

    const columns1 = ["service_description", "sales_per_service"];
    const columns2 = ["id_nfc", "first_name", "last_name", "birthdate", "id_number", "id_type", "id_issuing_authority"];
   
    useEffect(() => getSalesPerService(), [])

    const getSalesPerService = () => {
        setModeToggleFirstScreen(0);
        fetch("http://localhost:3001/salesperservice")
        .then(res => res.json())
        .then(data => setServicesArray(data))
        .catch(err => console.log(err))
      }

    const getCustomerDetails = () => {
    setModeToggleFirstScreen(1);
    fetch("http://localhost:3001/customerdetails")
    .then(res => res.json())
    .then(data => setServicesArray(data))
    .catch(err => console.log(err))
    }

    const removeHours = (array) => {
      if(modeToggleFirstScreen === 1){
        array.forEach((row) => {
          if(row["birthdate"]){
            row["birthdate"] = row["birthdate"].slice(0, 10)
          }
        })
      }
      return array
    }

    return(
        <div className="Body-Container">
            <div style={{width: 500}} className="Mode-Toggle" >
              <div onClick={getSalesPerService} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 0 ?{backgroundColor: "#424242", color:"white",borderRadius:0, padding:4} : {borderRadius:0, padding:4}} >
                Sales per Service
              </div> 
              <div onClick={getCustomerDetails} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 1 ?{backgroundColor: "#424242", color:"white",borderRadius:0,padding:4} : {borderRadius:0, padding:4}} >
                Customer Details
              </div> 
            </div> 
            <div className="Table-And-Filters">
              <div style={{width:1000}} className="Table-Container" >
                <Table data={removeHours(servicesArray)} columns={modeToggleFirstScreen === 0 ? columns1 : columns2} />
              </div>
            </div> 
        </div>
    )
}

export default SecondScreen;
