import React, { Component } from 'react'
import axios from 'axios'
// import Headers from 'LayoutComponents/Headers'; 
import Headers from '../LayoutComponents/Headers'; 
import Sidebar from '../LayoutComponents/Sidebar'; 

import '../assets/bootstrap/css/bootstrap.min.css' 
import '../assets/fonts/font-awesome.min.css'
import '../assets/css/styles.css'
import '../assets/css/styles.min.css'
import '../assets/fonts/fontawesome-all.min.css'
import '../assets/fonts/fontawesome5-overrides.min.css'
import '../assets/bootstrap/css/bootstrap.min.css'  
import $ from 'jquery';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";
import logo from '../assets/Images/TEMP.PNG';


export class TeamDamagedDevices extends Component {
    constructor(props) {
        super(props);       
//   this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
          allDevices:[],
          damagedDevices:[]       
        };
        this.getDeviceDetails = this.getDeviceDetails.bind(this);
    }

    getDeviceDetails (deviceUniqid, damagedDeviceUniqid, index, useParam){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        var myDevices = this.state.allDevices;
        axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+deviceUniqid,  { headers: headers })
        .then(response => {   
            var deviceTypeUniqid = response.data['deviceTypeUniqid']
            console.log(deviceTypeUniqid)

        axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+response.data['deviceTypeUniqid'],  { headers: headers })
        .then(res => {                               
        var deviceDetails = res.data;
        console.log(deviceDetails)
        // myDevices.push(deviceDetails)
        
      
        myDevices.push(res.data)
                        
        let deviceArray = myDevices;
        
        let object = {};
        console.log(deviceArray[index])
        deviceArray[index]['device_uniqid'] =  deviceUniqid 
        deviceArray[index]['damagedDeviceUniqid'] =  damagedDeviceUniqid 

            this.setState({
                allDevices: deviceArray
            })
            console.log(this.state.allDevices)
              
                        })                        
                        .catch(error => {
                            console.log(error)
                        })
                    })                        
                    .catch(error => {
                        console.log(error)
                    })
                
    }

    componentDidMount() {
    
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
       var data=({
            uniqid: localStorage.getItem('user_uniqid')
        })
        if(localStorage.getItem('rank') == 'admin')
        {
            console.log('jun')
            axios.get("http://127.0.0.1:8000/inventory/admin/view/damaged/devices/", { headers: headers })
            .then(res => {   
                console.log(res.data)           
            //  if(res.status)
            //    {
            //     console.log(res.data[0])
            //     this.setState({
            //         allDevices: res.data
            //        })
            //     //    console.log(Object.keys(res.data))
            //        for(var i=0;i<res.data.length;i++)
            //        {
            //         // console.log(res.data[Object.keys(res.data)[i]])
            //        var div = ' <div className="card"> <div className="card-header">'+res.data[i]['name']+'</div><div className="card-body">'+res.data[i]['brand']+'</div> <div className="card-footer"><a href="/single/damaged/device/:'+res.data[i]['uniqid']+'" className="btn btn-primary viewDevice">View Issue</a></div></div><br/>'
            //         $('.damagedDevices').append(div)
            //     }
            //     //    console.log(this.state.allDevices)
                   
            //    }
               
            // //    $('.userTeam').val(res.data['name'])

            })
            .catch(error => {
                console.log(error)
            })

        }
        // else

        // {
            var allDevices = []
            axios.get("http://127.0.0.1:8000/inventory/lead/view/damaged/devices/"+localStorage.getItem('user_uniqid'), { headers: headers })
            .then(response => { 
                // console.log(res.data.length)
                var damagedDevices = response.data
                 console.log(damagedDevices)

                 this.setState({
                    damagedDevices: damagedDevices
                 })
               
                 for(var i=0; i<damagedDevices.length;i++)
                 {                   
                  
                    this.getDeviceDetails(damagedDevices[i]['device_uniqid'], damagedDevices[i]['uniqid'], i, "myDevices")
           
                 }
            })
            .catch(error => {
                console.log(error)
            })
        // }
            console.log(allDevices)
        this.setState({
            allDevices:allDevices
        })
       

        //   console.log(this.state.allDevices)    

    }


    render() {
        const displayNone = { display: 'none' }
        const {
           allDevices
        } = this.state;
        return (
            <div>
                <Headers/>
                <Sidebar/>
                <section className="service-area more-top-padding" id="services">
					<div className="container more-top-padding allDevices">
                        <h2>Damaged Devices</h2>
                        <h4 style={displayNone} className="noDamagedDevices"><b>No damaged devices at the moment</b></h4>
						<div className="row devicesClass">
                      
                        {allDevices.map(device => (
                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-user"></i>   {device['name']}</h5>
                                <p className="card-text">{device['brand']}</p>
                               
                                <a href={"/single/damaged/device/:"+device['device_uniqid']} className="btn btn-primary">View Damage Status</a>
                            </div>
                            </div>
                        </div>
                         ))}
                           </div>
                            </div>
                            </section>
            
            </div>
        )
    }
}

export default TeamDamagedDevices
