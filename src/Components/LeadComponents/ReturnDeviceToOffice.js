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

export class ReturnDeviceToOffice extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''


        this.state = {
            device_uniqid: '',
            user_uniqid:"",
            deviceDetails:[],
            allDevices:[],
            selectedId:'',            
            location:"",
            loggeduser_rank: localStorage.getItem('rank'),
            loggeduser_uniqid : localStorage.getItem('user_uniqid'),
            deviceSerialNumber:'',
            allTeams:'',
            team_allocated:''

          
        };


        // const {}
        this.handleChange = this.handleChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDeviceChange = this.handleDeviceChange.bind(this);
        this.getLocation = this.getLocation.bind(this);
       

        this.PrintWindow = this.PrintWindow.bind(this);
    }

   getLocation(deviceUniqid){
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':  '*'
                }
                var data = ({
                    device_uniqid : deviceUniqid
                })
                axios.post("http://127.0.0.1:8000/inventory/admin/single/device/allocation", data,  { headers: headers })
                .then(response => {  
                    // console.log(response)
                    var location = response.data['resourceAllocation']['location']
                  
                    this.setState({
                        location: location
                    })
                    console.log(this.state.location)
               

                                })                        
                                .catch(error => {
                                    console.log(error)
                                })
   }

    handleDeviceChange(event){
        this.setState({ [event.target.name]: event.target.value, deviceSerialNumber: "", location: "" });
        
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        var allDevices = this.state.allDevices;
                
       
        axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+event.target.value,  { headers: headers })
        .then(res => {   
            console.log(res.data)  
            var device_details = res.data
            // alert(device_details['serial_number'])
            this.setState({ deviceSerialNumber: device_details['serial_number'] });
            // this.getLocation(device_details['uniqid']) 
         
        })   
                          
        .catch(error => {
            console.log(error)
        })
        console.log(event.target.value)
    }

    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index, useParam){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        var allDevices = this.state.allDevices;
                
       
        axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid,  { headers: headers })
        .then(res => {                               
        var deviceDetails = res.data;
        console.log(deviceDetails)
        // allDevices.push(deviceDetails)
                           
      
       allDevices.push(res.data)
       let deviceArray = allDevices;
       deviceArray[index]['device_uniqid'] =  deviceUniqid  
            this.setState({
                allDevices: deviceArray
            })
            console.log(this.state.allDevices)
       
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
        this.setState({
            location: ''
        })       
            var data=({
                uniqid: localStorage.getItem('user_uniqid')
            })      
                    axios.post("http://127.0.0.1:8000/inventory/lead/all/team/members/", data, { headers: headers })
                            .then(res => {
                        for(var i=0;i<res.data.length;i++)
                            {
                                
                                var option = '<option className="form-control" value='+res.data[i]['uniqid']+'>'+res.data[i]['username']+'</option>'
                                $('.username').append(option)
                            }
                        
                        })
                        .catch(error => {
                            console.log(error)
                        })   
   }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }
    handleUserNameChange(event) {
      this.setState({ [event.target.name]: event.target.value, location:"" , allDevices: [], deviceSerialNumber: "",});
       
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*',            
        }
        var data = 
        ({
            uniqid: event.target.value
        })
        axios.post('http://127.0.0.1:8000/inventory/admin/single/user/devices/', data, { headers: headers })
        .then(response => {
            console.log(response.data)
            var alldevices = response.data
            for(var i=0;i<alldevices.length;i++)
            {
                var deviceUniqid = alldevices[i]['uniqid']
                console.log(alldevices[i])
                this.getDeviceDetails (alldevices[i]['deviceTypeUniqid'], deviceUniqid, i, "User Devices")
                
            }
                
        })
        .catch(error => {
           
            console.log(error)
        })

    }

    PrintWindow(event) {

        document.title = localStorage.getItem('currentVisitName') + '`s ' + this.constructor.name
        $('.modal').hide()
        window.print()
    }


    handleSubmit = event => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*',
            
        }
        event.preventDefault();
        console.log(localStorage.getItem('accessToken'))
        // console.log( deviceUniqid)
       
        console.log(this.state)
        // 
        console.log( localStorage.getItem('rank'))
      
        if(localStorage.getItem('rank') == 'admin')
        {
          

            axios.post('http://127.0.0.1:8000/inventory/admin/assign/team/device', this.state, { headers: headers })
            .then(response => {
                console.log(response.data)

                if (response['status']) {
                      $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                    

                }
                else 
                {
                   
                    $('.alert-success').hide()
                    // this.handleSubmit()   
                }

            


            })
            .catch(error => {
               
                console.log(error)
            })
        }
        else
        {
            axios.post('http://127.0.0.1:8000/inventory/lead/assign/new/device/', this.state, { headers: headers })
            .then(response => {
                console.log(response)

                if (response['status']) {
                      $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                        $('.checkHistory').click()
                    }, 1500);
                    

                }
                else if(response['message']= "Request failed with status code 500")
                {
                    $('.alert-success').hide()
                }


            })
            .catch(error => {
                $('.alert-success').hide()
                // alert('error')
                $('.submitbtn').click()
                console.log(error)
            })
        }
     


    }

    handleImageChange = (e) => {
        console.log(e.target.files[0].size)
        // this.setState({
        // poster: e.target.files[0]
        // })
      };


    render() {
        const font16 = { fontSize: '20px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
             const width100 = { width: '100%' }
        const autoscroll = { overflowY: 'auto'}
        

        const {
           
            user_uniqid,
          loggeduser_rank,
            deviceSerialNumber,
            allDevices,
            device_uniqid,
            selectedId,
            location
            
            

        } = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Return Device To Office</p>
                            </div>




                            <div className="form-row pt-4">
                               <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Username</h6>
                                        <select className="form-control username" onChange={this.handleUserNameChange} value={user_uniqid} name="user_uniqid" >
                                            <optgroup label="Choose Username ">
                                                <option defaultValue="Default" disabled></option>
                                                
                                             

                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                
                              
                               
                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Device</h6>
                                         
                                        <select className="form-control" onChange={this.handleDeviceChange} value={device_uniqid} name="device_uniqid" >
                                            <optgroup label="Choose Device">
                                                <option defaultValue="Default" disabled></option>
                                                
                                                {Object.keys(allDevices).map((item, index) => (  
                                                    <option value={allDevices[item]['device_uniqid']}>{allDevices[item]['name']}</option>
                                                        
                                                        ))}  
                                            </optgroup>
                                        </select>
                                    </div>

                                </div>
                            

                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Device Serial Number</h6>

                                        <input type="text" readOnly className="form-control " onChange={this.handleChange}  value={deviceSerialNumber} name="deviceSerialNumber"  />
                                    </div>

                                </div>
                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Location</h6>

                                        <input type="text" readOnly className="form-control " onChange={this.handleChange}  value={location} name="location"  />
                                    </div>

                                </div>                            
                                
                                    </div>


                            <div id='loginSuccess' className="alert alert-success" style={displayHidden} role="alert">
                                <strong>Success! </strong>Details Saved Successfully.
                            </div>


                            <div className="row">
                                {/* <a className="btn btn-primary checkHistory" style={displayHidden}>Check Patient History</a> */}
                                {/* <div  className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold data-entered" type="button" style={floatRight}>See the Data Entered</button></div> */}
                               {location == 'home' ? <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold submitbtn" type="submit" style={floatLeft}>Submit</button></div> : <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft} disabled>Submit</button></div>} 
                                
                            
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

export default ReturnDeviceToOffice