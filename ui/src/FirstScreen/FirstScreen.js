import './FirstScreen.css';
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table.js';
import DateTimePicker from 'react-datetime-picker';

function FirstScreen() {
    const allServices = ["Bar", "Barbershop", "Conference Room", "Gym", "Restaurant", "Room", "Sauna"];

    const [modeToggleFirstScreen, setModeToggleFirstScreen] = useState(0);
    const [servicesArray, setServicesArray] = useState([]);
    const [filterServices, setFilterServices] = useState(allServices);
    const [filterCost, setFilterCost] = useState( ["0", "10000"]);
    const [filterDate, setFilterDate] = useState([new Date(1990, 0, 1, 10, 0, 0), new Date(2025, 0, 1, 10, 0, 0)]);

    const columns1 = ["id_service", "service_description", "needs_registration"];
    const columns2 = ["first_name", "last_name", "service_description", "date_time_of_charge", "charge_amount", "charge_description"];

    function twoDigits(d) {
      if(0 <= d && d < 10) return "0" + d.toString();
      if(-10 < d && d < 0) return "-0" + (-1*d).toString();
      return d.toString();
    }

    const dateToMysqlFormat = (date) => {
      return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
    }
   
    useEffect(() => getServices(), [])

    const getServices = () => {
      setModeToggleFirstScreen(0);
      fetch("http://localhost:3001/services")
      .then(res => res.json())
      .then(data => setServicesArray(data))
      .catch(err => console.log(err))
    }
  
    const getServiceVisits = () => {  
  
      setModeToggleFirstScreen(1);
  
      let filterServicesString = "";
      filterServices.forEach((service, i) => {
        filterServicesString +=  `&service=${service}`
      })
  
      try {
        dateToMysqlFormat(filterDate[0]);
        dateToMysqlFormat(filterDate[1]);
      } catch (error) {
        console.log(error)
        alert("Please input valid dates");
        return;
      }
      
      let filterCostString =  `&lowcostlimit=${filterCost[0]}&highcostlimit=${filterCost[1]}`
  
      const tempDates = [ dateToMysqlFormat(filterDate[0]).replace(" ", "@"), dateToMysqlFormat(filterDate[1]).replace(" ", "@") ]
      let filterDateString =  `&firstdatelimit=${tempDates[0]}&finaldatelimit=${tempDates[1]}`
  
      fetch("http://localhost:3001/visits?" + filterServicesString + filterCostString + filterDateString)
      .then(res => res.json())
      .then(data => setServicesArray(data))
      .catch(err => console.log(err))
    }

    const clickService = (serv) => {
      if(filterServices.includes(serv)) {
        const temp = filterServices.filter(val => val !== serv);
        setFilterServices(temp)
      }
      else {
        const temp = filterServices.concat([serv]);
        setFilterServices(temp)
      }
    }

    const serviceFilter = () => {
      return allServices.map((serv, i) => {
        return <div onClick={() => clickService(serv)} className="Service-Button">
          <div className="Service-Box" >
            {
              filterServices.includes(serv)
              ?
              <div className="Service-Box-On" >
              </div>  
              :
              null
            }
          </div>
          <div className="Service-Name" style={{fontSize:18}}>{serv}</div>
        </div>
      })
    }

    const onType0 = (event) => {
      if(!isNaN(event.nativeEvent.data)){
        setFilterCost([ event.target.value, filterCost[1]]) 
      }
    }

    const onType1 = (event) => {
      if(!isNaN(event.nativeEvent.data)){
        setFilterCost([filterCost[0], event.target.value]) 
      }
    }

    const onDateChange0 = (event) => {
      setFilterDate([event, filterDate[1]]) 
    }

    const onDateChange1 = (event) => {
      setFilterDate([filterDate[0], event]) 
    }

    return(
        <div className="Body-Container">
            <div className="Mode-Toggle" >
              <div onClick={getServices} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 0 ?{backgroundColor: "#424242", color:"white", borderRadius:0, padding:4} : {borderRadius:0, padding:4}} >
                Services
              </div> 
              <div onClick={getServiceVisits} className="Mode-Toggle-Button" style={modeToggleFirstScreen === 1 ?{backgroundColor: "#424242", color:"white",borderRadius:0, padding:4} : {borderRadius:0, padding:4}} >
                Visits
              </div> 
            </div> 
            <div className="Table-And-Filters">
              {
                modeToggleFirstScreen === 0
                ?
                  null
                :
                <div className="Filters-Container" style={{borderRadius: 0}}>
                  <div className="Filters-Title" style={{marginTop: '2%', fontSize:25}}>Filters</div>
                  <div className="Service-Filter" style={{marginBottom: '5%'}}>
                    <div className="Subtitle" style={{fontSize:20}}>Services</div>  
                    {serviceFilter()}
                  </div>
                 
                  <div className="Service-Filter" style={{marginBottom: '5%'}}>
                    <div className="Subtitle" style={{fontSize:20}}>Dates</div>  
                    <div className="Date-Selector" style={{fontSize:18}}>
                      From:  
                      <DateTimePicker
                                className="Date-Time-Picker"
                                onChange={onDateChange0}
                                value={filterDate[0]}
                                openWidgetsOnFocus={false}
                                maxDetail={"second"}
                              />
                    </div>
                    <div className="Date-Selector" style={{fontSize:18}}>
                      To:
                      <DateTimePicker
                                  className="Date-Time-Picker"
                                  onChange={onDateChange1}
                                  value={filterDate[1]}
                                  openWidgetsOnFocus={false}
                                  maxDetail={"second"}
                                />
                    </div>
                  </div>
                  <div className="Service-Filter">
                    <div className="Subtitle" style={{fontSize:20}}>Charge Amount</div>  
                    <div className="Cost-Selector" style={{fontSize:18, color: "white"}}>
                      From:
                      <input style={{width:60, backgroundColor:"#FFF", borderRadius: 0, marginLeft:15}} value={filterCost[0]} onChange={onType0} /> 
                    </div>
                    <div className="Cost-Selector" style={{fontSize:18, color: "white"}}>
                      To:
                      <input style={{width:60, backgroundColor:"#FFF", borderRadius: 0, marginLeft:15}} value={filterCost[1]} onChange={onType1} />
                    </div>
                  </div>
                </div>
              }
              <div className="Table-Container" >
                <Table data={servicesArray} columns={modeToggleFirstScreen === 0 ? columns1 : columns2} />
              </div>
            </div> 
        </div>
    )
}

export default FirstScreen;
