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

export class AssignDevice extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''


        this.state = {
            device_uniqid: (this.props.match.params),
            user_uniqid:"",
            deviceDetails:[],
            user_team:"",
            use:"",
            location:"",
            loggeduser_rank: localStorage.getItem('rank'),
            loggeduser_uniqid : localStorage.getItem('user_uniqid'),
            deviceSerialNumber:'',
            allTeams:'',
            team_allocated:'',
            loadingStatus:false,

          
        };


        // const {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.PrintWindow = this.PrintWindow.bind(this);
    }

    componentDidMount() {
      
        // const { uniqid
        const { deviceUniqid  } = (this.props.match.params);
        // const { uniqid } = (this.props.match.params);
        console.log(deviceUniqid)

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        this.setState({
            device_uniqid: deviceUniqid.split(':')[1]
        })
        
        axios.get('http://127.0.0.1:8000/inventory/admin/all/teams/',  { headers: headers })
            .then(response => {            
                this.setState({
                allTeams: response.data
            })        
        })
        .catch(error => {
            console.log(error)
        })
        var data=({
            uniqid: localStorage.getItem('user_uniqid')
        })      
       axios.get("http://127.0.0.1:8000/inventory/lead/all/team/users/"+localStorage.getItem('user_uniqid'), data, { headers: headers })
            .then(res => {
                console.log(res.data)
           for(var i=0;i<res.data.length;i++)
            {
                
                var option = '<option className="form-control" value='+res.data[i]['uniqid']+'>'+res.data[i]['username']+'</option>'
                $('.username').append(option)
            }
        
        })
        .catch(error => {
            console.log(error)
        })    
        // console.log(localStorage.getItem('user_team'))
        axios.get("http://127.0.0.1:8000/inventory/admin/single/team/details/"+localStorage.getItem('user_team'), { headers: headers })
                .then(res => {                   
                   console.log(res.data['name'])
                   $('.userTeam').val(res.data['name'])

                })
                .catch(error => {
                    console.log(error)
                })
                console.log(deviceUniqid.split(':')[1])
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+deviceUniqid.split(':')[1], { headers: headers })
                .then(res => {
                   
                   console.log(res.data)
                   this.setState({
                    deviceSerialNumber: res.data['serial_number']
                   })
                //    console.log(res.data['deviceTypeUniqid'])
                   var data = ({
                    uniqid: res.data['deviceTypeUniqid']
                })
             
               axios.post("http://127.0.0.1:8000/inventory/get/device/type/", data ,{ headers: headers })
                    .then(res => {
                        console.log(res.data)
                       
                        const verified = res.data;
                        // console.log(verified)
                        this.setState({
                            typeuniqid: verified.uniqid,
                            deviceDetails:verified
                        })
                        var value = res.data['name']
                        console.log(value)
                        // console.log(res.data[i])
                        var option = ''
                        $('.DeviceClass').attr('value',value)
                        
                  
                  
                    })
                    .catch(error => {
                        $('#loginError').fadeIn();
                        // this.setState({ isLoaded: false });
                        console.log(error)
                    })



                })
                .catch(error => {
                    console.log(error)
                })

    }

    handleChange(event) {
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
            'Access-Control-Allow-Origin':  '*',
            
        }
        event.preventDefault();
        // console.log(localStorage.getItem('accessToken'))
        // console.log( deviceUniqid)
       
        // console.log(this.state)
        // 
        // console.log( localStorage.getItem('rank'))
        this.setState({
            loadingStatus:true
        })
        if(localStorage.getItem('rank') == 'admin')
        {
          
            console.log(this.state)
            
            axios.post('http://127.0.0.1:8000/inventory/admin/assign/team/device', this.state, { headers: headers })
            .then(response => {
                console.log(response.data)
                this.setState({
                    loadingStatus:false
                })
                console.log(typeof(response.data))
                if(typeof(response.data) == 'object')
                {
                    $('.alert-success').show()
                        setTimeout(function () {
                            //
                            $('.alert-success').hide()
                        }, 6000);  
                }
                else if(response.data == "Already Allocated")
                {
                  
                    $('.alreadyAllocated').fadeIn()
                    setTimeout(function () {
                        //
                        $('.alreadyAllocated').fadeOut()
                    }, 6000);                 
                }
                // }
                // if (r) {
                //                    
                // }
                // else 
                // {   
                //     $('#loginError').fadeIn();               
                //     $('.alert-success').hide()                   
                // }
            })
            .catch(error => {   
                $('#loginError').fadeIn();            
                console.log(error)
            })
         }
        else
        {
            axios.post('http://127.0.0.1:8000/inventory/lead/assign/new/device/', this.state, { headers: headers })
            .then(response => {
                console.log(response)
                this.setState({
                    loadingStatus:false
                })
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
                    // $('#loginError').fadeIn();
                    $('.alert-success').hide()
                }


            })
            .catch(error => {
                $('.alert-success').hide()
                // $('#loginError').fadeIn();
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
        const displayNone = { display: 'none' }

        const {
            device_uniqid,
            user_uniqid,
            user_team,
            use,
            location,
            loggeduser_rank,
            deviceSerialNumber,
            allTeams,
            team_allocated,
            loadingStatus
            

        } = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Assign Device</p>
                            </div>




                            <div className="form-row pt-4">
                                {loggeduser_rank != 'admin' ? (<div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Username</h6>
                                        <select className="form-control username" onChange={this.handleChange} value={user_uniqid} name="user_uniqid" >
                                            <optgroup label="Choose Username ">
                                                <option defaultValue="Default" disabled></option>
                                                
                                             

                                            </optgroup>
                                        </select>
                                    </div>
                                </div>): (<h2></h2>
                                ) }
                                

                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Device</h6>
                                         
                                        <input type="text" readOnly className="form-control DeviceClass"  name="device_uniqid"  />
                                    </div>





                                </div>
                                <div className="col-md-12 p-2">
                                    <div className="py-1 ">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Device Serial Number</h6>
                                         
                                        <input type="text" readOnly className="form-control DeviceClass"  value={deviceSerialNumber} name="deviceSerialNumber"  />
                                    </div>





                                </div>
                                {loggeduser_rank == 'admin' ?  
                                 <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Assign to Team</h6>
                                        <select className="form-control " onChange={this.handleChange} value={team_allocated} name="team_allocated" >
                                            <optgroup label="Choose Assign Device to team">
                                                <option defaultValue="Default" disabled></option>
                                                {Object.keys(allTeams).map((item, index) => (
                                                
                                                <option className="form-control" value={allTeams[item]['uniqid']} >{allTeams[item]['name']}</option>
                                              
                                                
                                                        ))} 
                                            
                                            </optgroup>
                                        </select>
                                    </div> 
                                </div>: <h2></h2> }
                                    </div>


                            <div className="form-row pt-4">
                                
                                
                                {loggeduser_rank != 'admin' ?(
                                    <div>
                        <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> User Team</h6>
                                        <input type="text" className="form-control userTeam" readOnly/>
                                    </div>
                                </div>
                                <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Use</h6><select className="form-control " onChange={this.handleChange} value={use} name="use" >
                                            <optgroup label="Choose Use of the device">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="mail"  >Mail Machine</option>
                                                <option className="form-control" value="testing"  >Testing Purposes</option>
                                            
                                            </optgroup>
                                        </select>
                                    </div>                           


                                </div>
                                    </div>
                             ):(<h2></h2>)}

                                {loggeduser_rank != 'admin' ?(
                                <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Location</h6>
                                        <select className="form-control " onChange={this.handleChange} value={location} name="location" >
                                            <optgroup label="Choose Location of the device">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="office"  >Office</option>
                                                <option className="form-control" value="home"  >Home</option>
                                             
                                            
                                            </optgroup>
                                        </select>
                                    </div>





                                </div>):(<h2></h2>)}
                                    </div>



                                  
                                

                            <div id='loginSuccess' className="alert alert-success" style={displayHidden} role="alert">
                                <strong>Success! </strong>Details Saved Successfully.
                            </div>

                            <div className="alert alert-danger" id='loginError' style={displayNone} role="alert">
                                            <strong>Wait </strong>Something Went wrong
                                        </div>
                            <div className="alert alert-danger alreadyAllocated" id='loginError' style={displayNone} role="alert">
                                            <strong>Wait </strong>Already Allocated
                                        </div>
                            <div className="row">
                                {/* <a className="btn btn-primary checkHistory" style={displayHidden}>Check Patient History</a> */}
                                {/* <div  className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold data-entered" type="button" style={floatRight}>See the Data Entered</button></div> */}
                                {loadingStatus ?
                                <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold submitbtn" type="submit" style={floatLeft}>Loading</button></div>
                               : <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold submitbtn" type="submit" style={floatLeft}>Submit</button></div>
                            }
                                
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}
export default AssignDevice
