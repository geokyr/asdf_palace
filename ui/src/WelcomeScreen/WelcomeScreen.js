import './WelcomeScreen.css';
import React from 'react';

function WelcomeScreen() {

    return(
        <div className="Body-Container">
            <div style={{width:'80%', marginBottom:'2%', fontSize: 35, color:'#171717'}}>
                Welcome to ASDF Palace!
            </div>
            <div style={{width:'100%', height:'80%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img style={{height:'85%'}} alt='ASDF Palace' src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=900&h=-1&s=1"}/>
                <div style={{width:'100%', marginTop:'1%', fontSize:25, color:'#171717', alignSelf:'center'}}>
                    Feel free to search through our site using the navigation bar at the top.
                </div>
                <div style={{width:'100%', marginTop:'1%', fontSize:25, color:'#171717', alignSelf:'center'}}>
                    Gerasimos Deligiannis - el18807 | Kyriakopoulos Georgios - el18153 | Tzelepis Serafeim - el18849
                </div>  
            </div>    
        </div>
    )
}

export default WelcomeScreen;
