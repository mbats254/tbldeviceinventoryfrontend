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

export class ReportForm extends Component {
    constructor(props) {
        super(props);       

        this.state = {
            myDevices:[],
            user_allocated:localStorage.getItem('user_uniqid'),
            user_team:"",
            explained_issue:"",
            device_uniqid:"",
            setDevice:[]
          
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDeviceDetails = this.getDeviceDetails.bind(this);

        this.PrintWindow = this.PrintWindow.bind(this);
    }

    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index, deviceSerialNumber, useParam){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        console.log(deviceSerialNumber)
        var assignedTeam = this.state.assignedTeam
        var myDevices = this.state.myDevices;
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid,  { headers: headers })
                .then(res => {                               
                var deviceArray = res.data;                    
                deviceArray['device_uniqid'] =  deviceUniqid  
                deviceArray['deviceSerialNumber'] =  deviceSerialNumber
                if(useParam)
                {
                    this.setState({
                        setDevice:deviceArray
                    })
                    console.log(this.state.setDevice)
                }
                else
                {
                    myDevices.push(deviceArray)
                    console.log(myDevices)
    
                    this.setState({
                        myDevices:myDevices
                       })
                       console.log(this.state.myDevices)
                }
              
            
                
        
            })                        
            .catch(error => {
                console.log(error)
            })
   
    }

    componentDidMount() {
        this.setState({
            device_uniqid: localStorage.getItem('deviceUniqid'),
             
        })

        console.log(localStorage.getItem('deviceUniqid'))

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        // console.log(this.state.user_uniqid)
       if(localStorage.getItem('deviceUniqid'))
       {
        axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+localStorage.getItem('deviceUniqid'),  { headers: headers })
        .then(res => {  
            var device = res.data
            console.log(device)
       
                var deviceSerialNumber = device['serial_number']
                // console.log(device[i]['deviceTypeUniqid'])    
                var deviceUniqid = device['uniqid']
                
                var deviceTypeUniqid = device['deviceTypeUniqid']; 
                console.log(deviceTypeUniqid)
                this.getDeviceDetails(deviceTypeUniqid, deviceUniqid, 0, deviceSerialNumber, "DeviceUniqidSet")
                
  
        })
        .catch(error => {
            console.log(error)
        })
       }


        axios.get("http://127.0.0.1:8000/inventory/user/my/devices/"+localStorage.getItem('user_uniqid'),  { headers: headers })
        .then(res => {  
            var allDevices = res.data['allDevices']
            console.log(allDevices)
            for(var i=0;i<allDevices.length;i++)
            {
                var deviceSerialNumber =  allDevices[i]['serial_number']
                // console.log(device[i]['deviceTypeUniqid'])    
                var deviceUniqid = allDevices[i]['uniqid']
                
                var deviceTypeUniqid = allDevices[i]['deviceTypeUniqid']; 
                console.log(deviceTypeUniqid)
                this.getDeviceDetails(deviceTypeUniqid, deviceUniqid, i, deviceSerialNumber)
            }       
  
        })
        .catch(error => {
            console.log(error)
        })



    }

    handleChange(event) {
        // console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });

    }

    PrintWindow(event) {

        document.title = localStorage.getItem('currentVisitName') + '`s ' + this.constructor.name
        $('.modal').hide()
        window.print()
    }


    handleSubmit = event => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        event.preventDefault();
        console.log(localStorage.getItem('accessToken'))
        console.log( localStorage.getItem('deviceUniqid'))
       
        console.log(this.state)
        // 
        axios.post('http://127.0.0.1:8000/inventory/user/report/damaged/device/', this.state, { headers: headers })
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
                        $('.checkHistory').click()
                    }, 1500);

                }


            })
            .catch(error => {
                console.log(error)
            })


    }




    render() {
        const font16 = { fontSize: '20px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
             const width100 = { width: '100%' }
        const autoscroll = { overflowY: 'auto'}
        

        const {
            myDevices ,
            user_allocated,
            explained_issue,
            device_uniqid,
            setDevice
           
            

        } = this.state;
        var localuniqid  = localStorage.getItem('deviceUniqid')
        
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Report Device Damage</p>
                            </div>




                            <div className="form-row pt-4">
                                
                                <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        {/* <h6 className="text-capitalize" style={fontFamilyNunito}> Username</h6> */}
                                        <input hidden className="form-control username" onChange={this.handleChange} value={user_allocated} name="user_allocated" />
                                            
                                    </div>
                                </div>

                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Device</h6>
                                         {!localuniqid          
                                         
                                         ?
                                         <select className="form-control " onChange={this.handleChange} value={device_uniqid} name="device_uniqid" >
                                         <optgroup label="Choose Device ">
                                           <option defaultValue="Default" disabled></option>
                                         {Object.keys(myDevices).map((item, index) => (
                                             <option value={myDevices[item]['uniqid']} >{myDevices[item]['name']} </option>
                                             
                                         ))}

                                         </optgroup>
                                     </select>
                                          : 
                                         <input type="text" class="form-control" readOnly  value={setDevice['name']}/>
                                         }
                                     
                                    </div>





                                </div>
                                    </div>


                            <div className="form-row pt-4">
                                
                                <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Explained Issue</h6>
                                        <textarea className="form-control " onChange={this.handleChange} value={explained_issue} name="explained_issue" >
                                           
                                        </textarea>
                                    </div>
                                </div>

                              
                                                
                                    </div>



                                  
                                

                            <div id='loginSuccess' className="alert alert-success" style={displayHidden} role="alert">
                                <strong>Success! </strong>Details Saved Successfully.
                            </div>


                            <div className="row">
                                {/* <a className="btn btn-primary checkHistory" style={displayHidden}>Check Patient History</a> */}
                                {/* <div  className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold data-entered" type="button" style={floatRight}>See the Data Entered</button></div> */}
                                <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>Submit</button></div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

export default ReportForm
