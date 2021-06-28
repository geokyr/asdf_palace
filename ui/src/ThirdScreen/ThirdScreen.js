import './ThirdScreen.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table.js';

function ThirdScreen() {

    const [modeToggleFirstScreen, setModeToggleFirstScreen] = useState(0);
    const [servicesArray, setServicesArray] = useState([]);
    const [id_nfc, setIdNfc] = useState(0);

    const columns1 = ["id_place", "place_name", "place_location", "date_of_entry", "date_of_exit"];
    const columns2 = ["id_nfc", "first_name", "last_name", "id_place", "date_of_entry", "date_of_exit"];

    // eslint-disable-next-line
    useEffect(() => showplacesFromInfectedPerson(), [])

    const showplacesFromInfectedPerson = () => {
        setModeToggleFirstScreen(0);
        fetch("http://localhost:3001/infectedplaces?&id_nfc="+id_nfc)
        .then(res => res.json())
        .then(data => setServicesArray(data))
        .catch(err => console.log(err))
    }

    const getCustomerDetails = () => {
        setModeToggleFirstScreen(1);
        fetch("http://localhost:3001/infectedpersons?&id_nfc="+id_nfc)
        .then(res => res.json())
        .then(data => setServicesArray(data))
        .catch(err => console.log(err))
    }

    const onType0 = (event) => {
        if(!isNaN(event.nativeEvent.data)){
          setIdNfc(event.target.value) 
        }
    }

    return(
        <div className="Body-Container">
            <div style={{width: 600}} className="Mode-Toggle" >
              <div style={{position:'absolute', left:'20%', backgroundColor: "#424242", color: "white", padding: 17, borderRadius: 0}} className="Cost-Selector">
                NFC ID:  
                <input style={{width:60, backgroundColor:"white", borderRadius:5, marginLeft:15}} value={id_nfc} onChange={onType0} /> 
              </div>
              <div onClick={showplacesFromInfectedPerson} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 0 ?{backgroundColor: "#424242", color:"white",padding:4, borderRadius:0} : {padding:4, borderRadius:0}} >
                Infected Places
              </div> 
              <div onClick={getCustomerDetails} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 1 ?{backgroundColor: "#424242", color:"white",padding:4, borderRadius:0} : {padding:4, borderRadius:0}} >
                Infected Customers
              </div> 
            </div> 
            <div style={{marginTop:0}} className="Table-And-Filters">
              <div style={{width:1000}} className="Table-Container" >
                <Table data={servicesArray} columns={modeToggleFirstScreen === 0 ? columns1 : columns2} />
              </div>
            </div> 
        </div>
    )
}

export default ThirdScreen;
