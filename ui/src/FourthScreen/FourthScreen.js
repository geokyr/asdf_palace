import './FourthScreen.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table.js';

function FourthScreen() {

    const [ageGroup, setAgeGroup] = useState(0);
    const [firstTableData, setFirstTableData] = useState([]);
    const [secondTableData, setSecondTableData] = useState([]);
    const [thirdTableData, setThirdTableData] = useState([]);
    const [lastMonth, setLastMonth] = useState(true);

    useEffect(() => {
      const lastMonthStr = lastMonth ? "month" : "year";

      switch (ageGroup){
        case 0:
          press2040(lastMonthStr);
          break;
        case 1:
          press4160(lastMonthStr);
          break;
        case 2:
          press61(lastMonthStr);
          break;
        default:
      }

    }, [lastMonth, ageGroup])

    const columns0 = ["id_place", "place_name", "visits_count"];
    const columns1 = ["service_description", "times_used"];
    const columns2 = ["service_description", "customers_count"];

    const press2040 = (lmonth) => {
      fetch("http://localhost:3001/mostvisitedplaces?&ageGroup=2040&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setFirstTableData(data))
        .catch(err => console.log(err))

      fetch("http://localhost:3001/mostusedservices?&ageGroup=2040&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setSecondTableData(data))
        .catch(err => console.log(err))
      
      fetch("http://localhost:3001/serviceswithmostusers?&ageGroup=2040&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setThirdTableData(data))
        .catch(err => console.log(err))
    }

    const press4160 = (lmonth) => {
      fetch("http://localhost:3001/mostvisitedplaces?&ageGroup=4160&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setFirstTableData(data))
        .catch(err => console.log(err))

      fetch("http://localhost:3001/mostusedservices?&ageGroup=4160&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setSecondTableData(data))
        .catch(err => console.log(err))
      
      fetch("http://localhost:3001/serviceswithmostusers?&ageGroup=4160&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setThirdTableData(data))
        .catch(err => console.log(err))
    }

    const press61 = (lmonth) => {
      fetch("http://localhost:3001/mostvisitedplaces?&ageGroup=61&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setFirstTableData(data))
        .catch(err => console.log(err))

      fetch("http://localhost:3001/mostusedservices?&ageGroup=61&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setSecondTableData(data))
        .catch(err => console.log(err))
      
      fetch("http://localhost:3001/serviceswithmostusers?&ageGroup=61&lastMonth=" + lmonth)
        .then(res => res.json())
        .then(data => setThirdTableData(data))
        .catch(err => console.log(err))
    }

    return(
        <div className="Body-Container">
            <div  style={{width: 900,  alignItems:'center', marginTop:17}} className="Mode-Toggle" >
              <div style={{width:'25%', height: '100%', justifyContent:'center',  alignItems:'center', color: 'rgb(50, 50, 50)'}}>
                Age Group:
              </div>
                <div  onClick={() => setAgeGroup(0)} className="Mode-Toggle-But" style={ageGroup === 0 ?{backgroundColor: "#424242", color:"white", borderRadius:0 } : {borderRadius:0}} >
                  20 - 40
                </div> 
                <div  onClick={() => setAgeGroup(1)}  className="Mode-Toggle-But" style={ageGroup === 1 ?{backgroundColor: "#424242", color:"white",borderRadius:0 } : {borderRadius:0 }} >
                  41 - 60
                </div>
                <div  onClick={() => setAgeGroup(2)}  className="Mode-Toggle-But" style={ageGroup === 2 ?{backgroundColor: "#424242", color:"white", borderRadius:0 } : {borderRadius:0 }} >
                  61+
                </div> 
              </div> 
            <div  style={{width: 900, marginTop:15, }} className="Mode-Toggle" >
            <div style={{width:'25%', height: '100%', justifyContent:'center',  alignItems:'center', color: 'rgb(50, 50, 50)'}}>
              Time Frame:
            </div>

            <div onClick={() => setLastMonth(true)} className="Mode-Toggle-Button" style={lastMonth ?{backgroundColor: "#424242", color:"white",borderRadius:0 } : {borderRadius:0 }} >
              Past Month
            </div> 
            <div onClick={() => setLastMonth(false)} className="Mode-Toggle-Button" style={!lastMonth ?{backgroundColor: "#424242", color:"white", borderRadius:0 } : {borderRadius:0 }} >
              Past Year
            </div>
            </div> 
            <div style={{marginTop: 0}} className="Table-Space">

              <div style={{height: 450}} className="Node">
                <div style={{height:'10%', justifyContent:'center', alignItems:'center',  color: 'rgb(50, 50, 50)'}}>
                  Most Visited Places
                </div>
                <div style={{ width:'100%', height:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Table data={firstTableData} columns={columns0} />
                </div>
              </div>

              <div style={{height: 450}} className="Node">
                <div style={{height:'10%', justifyContent:'center', alignItems:'center',  color: 'rgb(50, 50, 50)'}}>
                  Most Used Services
                </div>
                <div style={{ width:'100%', height:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Table data={secondTableData} columns={columns1} />
                </div>
              </div>

              <div style={{height: 450}} className="Node">
                <div style={{height:'10%', justifyContent:'center', alignItems:'center',  color: 'rgb(50, 50, 50)'}}>
                  Services With Most Customers
                </div>
                <div style={{ width:'100%', height:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Table data={thirdTableData} columns={columns2} />
                </div>
              </div>
            </div> 
        </div>
    )
}

export default FourthScreen;
