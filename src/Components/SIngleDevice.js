import React, { useState, Component } from 'react'
import QRCode from 'react-qr-code';
import axios from 'axios'
// import Headers from 'LayoutComponents/Headers'; 
import Headers from './LayoutComponents/Headers'; 
import Sidebar from './LayoutComponents/Sidebar'; 
import './assets/bootstrap/css/bootstrap.min.css' 
import './assets/fonts/font-awesome.min.css'
import './assets/css/styles.css'
import './assets/css/styles.min.css'
import './assets/fonts/fontawesome-all.min.css'
import './assets/fonts/fontawesome5-overrides.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
// import 'react-tooltip/dist/react-tooltip.css'
// import { Tooltip } from 'react-tooltip' 
import $ from 'jquery';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";
import logo from './assets/Images/TEMP.PNG';

export class SIngleDevice extends Component {

    constructor(props) {
        super(props);       
 
        const url = ''
        const { uniqid } = this.props.match.params.uniqid;
        this.api_url = 'http:/127.0.0.1:8000/'
       this.state= ({
            typeuniqid:'',
            unassignedTeam:[[]],
            assignedTeam:[[]],
            assignedDevices:[],
            deviceDetails:[],
            deviceSerialNumber:""
       })
        
       this.getDeviceDetails = this.getDeviceDetails.bind(this);
       this.getDeviceAllocation = this.getDeviceAllocation.bind(this);

    }

    componentDidMount() {
        const { uniqid } = (this.props.match.params);
    
        localStorage.removeItem('deviceTypeUniqid')
        localStorage.setItem('deviceTypeUniqid',uniqid.split(":")[1])
        this.setState({
            typeuniqid: uniqid.split(':')[1],
            unassignedTeam:[],
            assignedTeam:[]
        })
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
    
        var data = ({
            uniqid: uniqid.split(":")[1]
        })
     
       axios.post("http://127.0.0.1:8000/inventory/get/device/type/", data ,{ headers: headers })
            .then(res => {
                // console.log(res.data)
               
                const verified = res.data;
                // console.log(verified)
                this.setState({
                    typeuniqid: verified.uniqid,
                    deviceDetails:verified
                })
                
                $('.card-title').text(verified['name'])
                $('.card-text').text(verified['brand'])
          
            })
            .catch(error => {
            
                console.log(error)
            })
            var allThisType = [];
            axios.get("http://127.0.0.1:8000/inventory/admin/all/devices/", {headers: headers })
            .then(response => {
                console.log(response.data)
              
                for(var i=0;i<response.data.length;i++)
                {
                    const { typeuniqid } = (this.props.match.params);  
                    console.log(response.data[i]['deviceTypeUniqid'])             
                   
                        
                        console.log(response.data[i]['uniqid'])
                    
                    var data=({
                        device_uniqid: response.data[i]['uniqid'],
                                                index: i,
                                                deviceTypeUniqid:response.data[i]['deviceTypeUniqid']
                    })
                    // console.log(data)
                    this.getDeviceAllocation(data, this.state.typeuniqid)
                   
                    
                    var device = response.data[i]
                    // console.log(device)
                    var allDevices = [];
                    // console.log(data)
                  
        
                   
                }
        })        
            .catch(error => {
             
                console.log(error)
            });

            $('.assignDevice').click(function(e){
                e.preventDefault()
                var id = $(this).attr('id')
            window.location.href = "/assign/device"
            })    
    }

   

    getDeviceAllocation(data, deviceTypeUniqid){
        // console.log(data['deviceTypeUniqid'])

        if(deviceTypeUniqid == data['deviceTypeUniqid'])
        {
            console.log(data['index'])
        
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
                axios.post("http://127.0.0.1:8000/inventory/admin/single/device/allocation/", data ,{headers: headers })
                .then(response => {
                        console.log((response.data['teamAllocation']))
                        var deviceTypeUniqid = this.state.typeuniqid
                    
                        if(typeof(response.data['teamAllocation']) == "string")
                        {
                            var team_allocation = response.data['teamAllocation'].split("||")
                            var deviceUniqid = team_allocation[1]
                            var useParam = "not_allocated"
                            var deviceSerialNumber = team_allocation[2]

                            this.getDeviceDetails (deviceTypeUniqid, deviceUniqid, data['index'], useParam, deviceSerialNumber)
                      
                        }
                        else if(typeof(response.data['teamAllocation']) == "object")
                        {
                            var useParam = "allocated"
                            var deviceUniqid = response.data['teamAllocation']['device_uniqid']
                            var deviceSerialNumber = response.data['teamAllocation']['deviceSerialNumber']
                            console.log(deviceSerialNumber)
                            this.getDeviceDetails (deviceTypeUniqid, deviceUniqid, data['index'], useParam, deviceSerialNumber)
                       
                        }
                    
                    
                })        
                .catch(error => {
                
                    console.log(error)
                });
            }
    }


    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index, useParam, deviceSerialNumber){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        console.log(deviceSerialNumber)
        var assignedTeam = this.state.assignedTeam
        var unassignedTeam = this.state.unassignedTeam
        this.setState({
            deviceSerialNumber: "",
            // assignedTeam: [],
            // unassignedTeam: []
           
        })
       console.log(useParam)
       
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+deviceUniqid,  { headers: headers })
                .then(res => {  
                    // console.log(res.data)
                    localStorage.removeItem('deviceSerialNumber')
                    // localStorage.setItem('deviceSerialNumber', res.data['serial_number'])
                    // this.setState({
                    //     deviceSerialNumber: res.data['serial_number']
                    // })
                })  
                .catch(error => {

                    console.log(error)
                });
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid,  { headers: headers })
                .then(res => {                               
                var deviceArray = res.data;
                    
                if(useParam == "not_allocated")
                {
                       
                    deviceArray['device_uniqid'] =  deviceUniqid  
                    deviceArray['deviceSerialNumber'] =  deviceSerialNumber
                    unassignedTeam.push(deviceArray)
                
                        this.setState({
                        unassignedTeam:unassignedTeam
                    })
                    console.log(this.state.unassignedTeam)
                    
            
                }  
                else
                {
                    console.log(localStorage.getItem('deviceSerialNumber'))
                        
                    deviceArray['device_uniqid'] =  deviceUniqid  
                    deviceArray['deviceSerialNumber'] = deviceSerialNumber
                    // console.log(deviceArray)
                    assignedTeam.push(deviceArray)
                    // console.log(assignedTeam[0][0]['id'])
                    this.setState({
                        assignedTeam:assignedTeam
                    })
                    console.log(this.state.assignedTeam)
                
                }   
                
            
                
        
            })                        
            .catch(error => {
                console.log(error)
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

        const { verified,unassignedTeam, deviceDetails, assignedTeam } = this.state
        // console.log((assignedTeam[0][0]))
        console.log(this.state.unassignedTeam.length)
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
                                {/* <h6 className="text-uppercase">Size</h6> <label className="radio"> <input type="radio" name="size" value="S" checked> <span>S</span> </label> <label className="radio"> <input type="radio" name="size" value="M"> <span>M</span> </label> <label className="radio"> <input type="radio" name="size" value="L"> <span>L</span> </label> <label className="radio"> <input type="radio" name="size" value="XL"> <span>XL</span> </label> <label className="radio"> <input type="radio" name="size" value="XXL"> <span>XXL</span> </label> */}
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


                    <div className="container p-2">
                       
                           

                            <div className="card" style={width18rem}>
                            <div className="card-header">
                            Unassigned to any team
  </div>
  <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Brand</th>
      <th scope="col">Type</th>
      <th scope="col">Device Uniqid</th>
      <th scope="col">View Device</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {/* {} */}
  {Object.keys(unassignedTeam).map((item, index) => (
    <tr>
      <th scope="row">{index}</th>
      <td>{deviceDetails['name']}</td>
      <td>{deviceDetails['brand']}</td>
      <td>{deviceDetails['type']}</td>
      {unassignedTeam.length > 0 ? <div><td>{unassignedTeam[item]['deviceSerialNumber']}</td> 
      

      <td>{unassignedTeam[item]['uniqid']}</td>
     <td><a href={'/assign/device/:'+unassignedTeam[item]['device_uniqid']}  className="btn btn-primary">Assign Device</a></td> 
     </div>:<td></td>}
    </tr>

))}  
    
  </tbody>
</table>

<div className="card-header">
Assigned Devices 
  </div>
  <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Brand</th>
      <th scope="col">Type</th>
      <th scope="col">Serial Number</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {Object.keys(assignedTeam).map((item, index) => (
    <tr>
      <th scope="row">1</th>
      <td>{deviceDetails['name']}</td>
      <td>{deviceDetails['brand']}</td>
      <td>{deviceDetails['type']}</td>
      {assignedTeam.length > 0 ? <div>
      <td>{assignedTeam[item]['deviceSerialNumber']}</td>
      <td><a href={"/view/device/assignment/:"+assignedTeam[item]['device_uniqid']} className="btn btn-primary ">View Device Assignment Details</a></td>
      <td><a href={'/assign/device/:'+assignedTeam[item]['device_uniqid']}  className="btn btn-primary assignDevice">Re-Assign Device</a></td>
      </div>:<td></td>}
    </tr>

))}  
    
  </tbody>
</table>
  
</div>
<div className="modal assignmentDetails" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title staffName"> </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Name: <span className="Name"></span></p>
                                <p>Specialty: <span className="Specialty"></span></p>
                                <p>Email: <span className="Email"></span></p>
                                <button className='btn btn-success viewsdevices ' >View User Devices</button>

                                <span><button className='btn btn-danger removeUser ' >Remove User</button></span>
                                
                                <p className="staffId" style={displayHidden}></p>
                                <p className="staffUniqid" style={displayHidden}></p>

                                <div id='loginSuccess' className="alert alert-success" style={displayHidden} role="alert">
                                    <strong>Success! </strong>User Nullified Successfully
                                </div>
                            </div>

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

export default SIngleDevice
