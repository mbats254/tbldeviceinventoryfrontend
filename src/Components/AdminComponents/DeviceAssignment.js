import React, { useState, Component } from 'react'
import QRCode from 'react-qr-code';
import axios from 'axios'
import DeviceQR from './DeviceQR';
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
// import QRCode from 'react-qr-code';
// import 'react-tooltip/dist/react-tooltip.css'
// import { Tooltip } from 'react-tooltip' 
import $ from 'jquery';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";
import logo from '../assets/Images/TEMP.PNG';

export class DeviceAssignment extends Component {
    constructor(props) {
        super(props);       
 
        const url = ''
        const { deviceuniqid } = this.props.match.params.deviceuniqid;
        this.api_url = 'http:/127.0.0.1:8000/'
        
       this.state= ({
            typeuniqid:'',
            storedDevice:[],
            damageDetails:[],         
            deviceDetails:[],
            teamAllocation:[],
            resourceAllocation:[],
            allocationExtraDetails:[],
            currentUrl: window.location.href,
            loggeduser_rank: localStorage.getItem('rank'),
            loggeduser_uniqid : localStorage.getItem('user_uniqid'),
       })
       this.handleChange = this.handleChange.bind(this);
       this.PrintWindow = this.PrintWindow.bind(this);
     
    }

    PrintWindow(event) {

        
        // $('.modal').hide()
        const printContents = $(".QRCode").html();
        console.log(printContents)
        // printContents.css("margin","3cm;")
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        document.title=this.state.deviceDetails['name']
        window.print();
        window.location.href = this.state.currentUrl
        // var QRCode = $('.QRCode').text()
        // alert()
        // window.print()
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    componentDidMount() {
        const { deviceuniqid } = (this.props.match.params);
        console.log(deviceuniqid)
        localStorage.removeItem('deviceUniqid')
        localStorage.setItem('deviceUniqid',deviceuniqid.split(":")[1])
        
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
    
       $('.printQR').on("click", function(){
          $('.QRPrintModal').show()
       })
       $('.btn-close').on("click", function(){
            $('.modal').fadeOut()
       })
       //get Assignment Details
       var data = ({
        device_uniqid: deviceuniqid.split(':')[1]
       })
       console.log()
       axios.post("http://127.0.0.1:8000/inventory/admin/single/device/allocation/", data, { headers: headers })
       .then(response => {
            console.log(response.data)
            var teamAllocation = response.data['teamAllocation']
            if(typeof(response.data['teamAllocation']) == "string")
            {
                
                    this.setState({
                        teamAllocation: teamAllocation.split("||")[0],
                        
                    })
                    console.log(this.state.teamAllocation)
                          
            }
            else if(typeof(response.data['teamAllocation']) == "object")
            {
                console.log(response.data['teamAllocation'])
                axios.get("http://127.0.0.1:8000/inventory/admin/single/team/details/"+teamAllocation['team_allocated'], { headers: headers })
                .then(response => {
                    console.log(response.data)
           
                    // console.log(allocationArray)
                    this.setState({
                        teamAllocation: response.data,
                        
                    })
                    console.log(this.state.teamAllocation)
                })        
                .catch(error => {
                 
                    console.log(error)
                });
                
            }
                        // var teamAllocation = res.data['teamAllocation'].split("||")
                    
                        
                        var resourceAllocation = response.data['resourceAllocation']
                        console.log(resourceAllocation)
                        if(typeof(response.data['resourceAllocation']) == "string")
                        {
                            
                            this.setState({
                                resourceAllocation: resourceAllocation.split("||")[0],
                                
                            })
                            console.log(this.state.resourceAllocation)
                        }                     
                        else if(typeof(response.data['resourceAllocation']) == "object")
                        {
                            console.log(response.data['resourceAllocation'])
                            this.setState({
                                allocationExtraDetails:response.data['resourceAllocation']
                            })
                            axios.get("http://127.0.0.1:8000/inventory/lead/single/team/member/"+resourceAllocation['user_allocated'], { headers: headers })
                            .then(response => {
                                console.log(response.data)
                       
                                // console.log(allocationArray)
                                this.setState({
                                    resourceAllocation: response.data,
                                    
                                })
                                console.log(this.state.resourceAllocation)
                            })        
                            .catch(error => {
                             
                                console.log(error)
                            });                                                
                        }                     

       })        
       .catch(error => {
        
           console.log(error)
       });
     
       axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+deviceuniqid.split(':')[1], { headers: headers })
            .then(res => {
                console.log(res.data)
                var device_details = res.data
                this.setState({
                    storedDevice: device_details
                })
                console.log(this.state.storedDevice)
                
                axios.get("http://127.0.0.1:8000/inventory/lead/single/damaged/device/"+this.state.storedDevice['uniqid'], {headers: headers })
                .then(response => {
                   console.log(response.data)
                    this.setState({
                        damageDetails: response.data
                    })
                
                   
                })        
                .catch(error => {
                 
                    console.log(error)
                });
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+device_details['deviceTypeUniqid'], { headers: headers })
                    .then(response => {
                        // console.log(response.data)
                            this.setState({
                                deviceDetails: response.data
                            })
                    })
                    .catch(error => {
                    
                        console.log(error)
                    })              
             
          
            })
            .catch(error => {
            
                console.log(error)
            })
   
          

            $('.viewDeviceAssignemt').on('click', function(e){
                e.preventDefault()
            })

            $('.assignDevice').click(function(e){
                e.preventDefault()
                var id = $(this).attr('id')
            window.location.href = "/assign/device"
            })    
            $('.allocationDetailsBtn').click(function(e){
                e.preventDefault()
                $('.assignmentModal').fadeIn()
                // alert('breeezy')
            })
    }

    render() {
        const width400 = { width: '400px' };
        const width18rem = { width:  '18rem' };
        const width100 = { width: '100' };
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';
        
      
        const displayNone = { display: 'none' }

        const { verified,unassignedTeam, deviceDetails, assignedTeam, damageDetails, currentUrl, storedDevice, loggeduser_rank, teamAllocation, resourceAllocation, allocationExtraDetails } = this.state
       console.log(damageDetails)
        return (
            <div>
                    <Headers />
                    <Sidebar/>               
                <main>
                <div className="container p-2">
    <div className="row d-flex justify-content-center">
        <div className="col-md-10">
            <div className="card">
         
        
               <div className="row">
                    <div className="col-md-6">
                        <div className="images p-3">
                            <div className="text-center p-4"> <img id="main-image" src={deviceDetails['poster_link']} width="250" alt="no photo at the moment"/> </div>
                            {/* <div className="thumbnail text-center"> 
                            <img onclick="change_image(this)" src="https://i.dell.com/is/image/DellContent/content/dam/ss2/products/desktops-and-all-in-ones/optiplex/3000-tsff/media-gallery/optiplex-3000sff-gallery-3.psd?qlt=90,0&op_usm=1.75,0.3,2,0&resMode=sharp&pscan=auto&fmt=png-alpha&hei=500" width="70"/>
                             <img onclick="change_image(this)" src="https://i.dell.com/is/image/DellContent/content/dam/ss2/products/desktops-and-all-in-ones/optiplex/3000-tsff/media-gallery/optiplex-3000sff-gallery-3.psd?qlt=90,0&op_usm=1.75,0.3,2,0&resMode=sharp&pscan=auto&fmt=png-alpha&hei=500" width="70"/>
                              </div> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product p-4">

                            <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">{deviceDetails['brand']}</span>
                                <h5 className="text-uppercase">{deviceDetails['name']}</h5>
                                <div className="price d-flex flex-row align-items-center"> <span className="act-price"><b>Device Category:</b> {deviceDetails['type']}</span>
                                    <div className="ml-2"> <small className="dis-price"><b>Storage Type:</b> {deviceDetails['storage_type']}</small> <span><b>RAM:</b>{deviceDetails['RAM']} GB </span> </div>
                                </div>
                            </div>
                            <p className="about">Storage:{deviceDetails['capacity']}</p>
                            <div className="sizes mt-5">
                            <div className="ml-2"> <small className="dis-price"><b>Serial Number:</b> {storedDevice['serial_number']}</small> </div>
                                
                            </div>
                            <div className="cart mt-4 align-items-center">
                                
                                  </div>
                        </div>
                    </div>
                </div>

         
            </div>
        </div>
    </div>
</div>


                    <div className="container p-2 ">
                    <div className="row">
                    <div className="card col-md-6" style={width18rem}>
                        
                            <div className="card-header">
<h3>Reported Issues</h3>

                                </div>
                                {damageDetails.length > 0 ? 
                                <div>
                                   {Object.keys(damageDetails).map((item, index) => (
                                        <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <p className="card-text">{damageDetails[item]['explained_issue']}</p>
                                        <a href={"/single/damaged/device/:"+damageDetails[item]['device_uniqid']} className="btn btn-primary">View Issue</a>
                                      </div> 
                                      ))}   
                                      <br/>  <a href="/report/damage" className='btn btn-primary'>Report Issue</a>
                                      </div>
                                      : <div>  <span>No issues Reported So far</span> <br/><span> <a href="/report/damage" className='btn btn-primary'>Report Issue</a></span></div>   
                            }
                    
                          
                                </div>
                    <div className="card col-md-6" style={width18rem}>
                        
                            <div className="card-header">
<h3>Print QR Code</h3>

                                </div>
                           
                                <div>
                             
                                        <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <p className="card-text">Click The button below to generate QR</p>
                                        <a  className="btn btn-primary printQR">Print QR Code</a>
                                      </div> 
                                     
                                      </div>
                                        
                          
                    
  
                                </div>

                                </div>
                               { loggeduser_rank == 'admin' || loggeduser_rank == "team_lead" ?
                                <div className="row">
                    <div className="card col-md-6" style={width18rem}>
                    <div className="card-header">
                                    <h3>Assignment Details</h3>

                                </div>
                           
                                <div>
                             
                                        <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <p className="card-text">
                                            {teamAllocation != "Team Allocation Does Not Exist" ?
                                <span><h3><b>Team Allocation:</b>{teamAllocation['name']}</h3></span>
                                :
                                <span><h3><b>Team Allocation:</b>{teamAllocation}</h3></span>
                        }   
                                            {resourceAllocation != "Resource Allocation Does Not Exist" ?
                                            <div>
                                <span><h3><b>Resource Allocation:</b>{resourceAllocation['full_name']}</h3></span>
                                <a className="btn btn-primary allocationDetailsBtn">View Assignment Details</a>  </div>
                                :
                                
                                <span><h3><b>Resource Allocation:</b>No resource assigned to this device</h3></span>
                        
                              
                        }   

                                        </p>
                                       
                                      </div> 
                                     
                                      </div>
                        </div>
                        </div>
                        : <h2></h2>}
                           

                            
 
                    </div>
                    <div className="container justify-content-center">
                <div className="modal  assignmentModal" role="dialog" tabindex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header"><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div className="modal-body">
                                <div className="card row flex-row pb-4 border rounded-2 shadow-sm">
                                    <div className="card-header py-3">
                                        <header className="text-center text-capitalize">
                                            <h1>Assignment Modal</h1>
                                        </header>
                                    </div>
                                    <div className="card-body" style={{display:'inline'}}>
                                    <p><b>Device Name: </b>{deviceDetails['name']}</p>
                                    <p><b>Resource Allocated: </b>{resourceAllocation['full_name']}</p>
                                    <p><b>Location: </b>{allocationExtraDetails['location']}</p>
                                    <p><b>Purpose: </b>{allocationExtraDetails['use']}</p>
                                    <p></p>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-3 justify-content-center row"><a className="btn btn-outline-dark btn-lg text-dark px-5 rounded-pill">Close</a></div>
                        </div>
                    </div>
                </div>
                    </div>
                    <div className="container justify-content-center">
                <div className="modal QRPrintModal " role="dialog" tabindex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header"><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div className="modal-body">
                                <div className="card row flex-row pb-4 border rounded-2 shadow-sm">
                                    <div className="card-header py-3">
                                        <header className="text-center text-capitalize">
                                            <h1>Print QR</h1>
                                        </header>
                                    </div>
                                    <div className="card-body" style={{display:'inline'}}>
                                   <DeviceQR data={currentUrl} title={deviceDetails['name']}/>
                                        <div className="text-center py-1"><a className="btn btn-danger btn-lg text-white px-5 printQR" onClick={this.PrintWindow}>Print</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-3 justify-content-center row"><a className="btn btn-outline-dark btn-lg text-dark px-5 rounded-pill">Close</a></div>
                        </div>
                    </div>
                </div>
                    </div>
                    {/* <QRCode
          title="GeeksForGeeks"
          value="https://www.google.com/search?client=firefox-b-d&q=if+today+was+your+last+day+song"
          bgColor="#FFFFFF"
          fgColor="#000000"
          size="512"
        /> */}
                </main>
            </div>
        )
    }
}

export default DeviceAssignment