import React, { Component } from 'react'
import '././assets/bootstrap/css/bootstrap.min.css' 
import '././assets/fonts/font-awesome.min.css'
import '././assets/css/styles.css'
import '././assets/css/styles.min.css'
import '././assets/fonts/fontawesome-all.min.css'
import '././assets/fonts/fontawesome5-overrides.min.css'
import '././assets/bootstrap/css/bootstrap.min.css'  
import axios from 'axios'
import logo from '././assets/Images/tb_logo.png';
import $ from 'jquery';
import { template } from '@babel/core'
import capitalize from '@mui/utils/capitalize'
import { Modal } from '@mui/material'



class Home extends Component {
  
  
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          allTeamDevices:[],
          allDamagedDevices: [],
          myDevices:[],
          allAllocations: [],
          search_item: null,
          deviceDetails:"",
          modalDeviceDetails:[],
          fullName: localStorage.getItem('full_name'),
          userUniqid: localStorage.getItem('user_uniqid')

         
        };
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getDeviceDetails = this.getDeviceDetails.bind(this);
        this.handleDeviceDetails = this.handleDeviceDetails.bind(this);

      }


      handleDeviceDetails(event){
        console.log(event.target.id)
        var target_id = (event.target.id).split('||')
        this.setState({
            modalDeviceDetails: []
        })
        console.log(this.state.modalDeviceDetails)
        this.getDeviceDetails(target_id[0], target_id[1], 0, "handledeviceDetailsModal")

        $('.deviceDetails').show()
        
      }

      handleChange(event) {
        //   console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }
    handleLogout (event){
        event.preventDefault()
        console.log(localStorage.getItem('accessToken'))
        localStorage.removeItem('accessToken');
        window.location.href = '/'
    }
    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index, useParam, deviceSerialNumber){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        var myDevices = this.state.myDevices;
       
        axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid,  { headers: headers })
        .then(res => {                               
        var deviceDetails = res.data;
        // console.log(deviceDetails)
        // myDevices.push(deviceDetails)
        
      
       
        if(useParam !== "handledeviceDetailsModal")
        {
            myDevices.push(res.data)
                        
            let deviceArray = myDevices;
            
            let object = {};
            console.log([index])
            deviceArray[index]['device_uniqid'] =  deviceUniqid  
            deviceArray[index]['deviceSerialNumber'] =  deviceSerialNumber  
            this.setState({
                myDevices: deviceArray
            })
        }else
        {
          var modalDeviceDetails = []
          modalDeviceDetails.push(res.data)
          console.log(modalDeviceDetails)
          modalDeviceDetails[index]['device_uniqid'] =  deviceUniqid  
            this.setState({
                modalDeviceDetails: modalDeviceDetails[0]
            })
            // console.log(this.state.modalDeviceDetails)

        }
          
   
    })                        
    .catch(error => {
        console.log(error)
    })
   
    }

      handleSubmit = event => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }


        console.log(this.state.search_item)
        var dict = ({
            search_item: this.state.search_item,
                                  })
                                //   console.log(dict)
        axios.post('http://127.0.0.1:8000/inventory/user/search/device ', this.state, { headers: headers })
            .then(response => {
                console.log(response)
                this.setState({ isLoaded: false });
                // console.log(response['data'])
               
               
            })
            .catch(error => {
                $('#loginSeriousError').fadeIn();
                this.setState({ isLoaded: false });
                console.log(error)
            })

      }

    componentDidMount() {
        console.log(localStorage.getItem('accessToken'))
        console.log(localStorage.getItem('uniqid'))
        $('#tab-btn-1').click()
        $('#tab-1').show();
        // alert('jfjgjfjg')z
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

        $('.deviceDetails').click(function(e){
            e.preventDefault()
            console.log('djjdjd')
            var device = $(this).attr('id');
            // alert(device)

            window.location.href = "/single/device/user/:"+device
        })

      
        axios.get("http://127.0.0.1:8000/inventory/user/my/devices/"+localStorage.getItem('user_uniqid'),  { headers: headers })
        .then(response => {
           var devices = response.data['allDevices']
           console.log(response.data)
           for(var i=0; i<devices.length; i++)
           {
            var allDevices = []
            allDevices.push(devices[i]['deviceTypeUniqid']);   
           this.getDeviceDetails(devices[i]['deviceTypeUniqid'], devices[i]['uniqid'], i, "myDevices", devices[i]['serial_number'])
        //    console.log(this.getDeviceDetails(devices[i]['deviceTypeUniqid']))
               
                          
                    
            }
             
        })
     
        .catch(error => {
            console.log(error)
        })

       
       
       var data = ({
           user_uniqid: localStorage.getItem('user_uniqid')
       })
        console.log(data)
       
       
        console.log(this.state.allDamagedDevices)

        $('.tabClass').on('click', function(){
            $('.tabClass').removeClass('active');
            var new_active = $(this).attr('id');
            $('#'+new_active).addClass('active');

            // 
        })
        $('#tab-btn-1').on( "click", function(){
            //
            $('#tab-1').show();
            $('#tab-2').hide();
            
            $('#tab-3').hide();
        })
       

   

      }
    
    render() {
        // console.log(this.state.allDamagedDevices)  
        const { error, isLoaded, allDamagedDevices, allAllocations, allTeamDevices, myDevices, search_item, modalDeviceDetails} = this.state;
        const {capitalize} = { textTransform: 'capitalize'}
        const logoDimensions = { height: '50px', innerWidth: "180px" }
//  console.log(this.state.modalDeviceDetails)
        // var  = this.state.myDevices['allDamagedDevices']
        return (
        
                <div>     
           <main>
        <div>
            <div className="container justify-content-center">
                <div>
                    <header>
                    <img src={logo} style={logoDimensions} className="logoImg btn" />
                        <nav className="navbar navbar-light navbar-expand-md">
                            <div className="container-fluid"><a className="navbar-brand" href="/user/profile"><img className="rounded-circle" src="https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png" width="70px" alt="round_img" /></a><b>{this.state.fullName}</b>
                                <ul className="navbar-nav">
                                    <li className="nav-item p-2"><a className="nav-link active" href="/user/notifications"><i className="fa fa-envelope-open-o fa-2x"></i></a></li>
                                    {/* <li className="nav-item p-2"><a className="nav-link" href="/#"><i className="fa fa-file-o fa-2x"></i></a></li> */}
                                    <li className="nav-item p-2"><a className="nav-link" onClick={this.handleLogout} href=""><i className="fa fa-sign-out fa-2x"></i></a></li>
                                </ul>
                            </div>
                        </nav>
                        <div className="p-2">
                            <h1 className="fw-bold ">My Devices</h1>
                            {/* <h6 className="fw-bold text-muted">5 Devices</h6> */}
                        </div>
                    </header>
                    <div></div>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="input-group"><span className="input-group-text"><i className="fa fa-filter fa-2x text-muted"></i></span><input className="form-control" type="search" name="search_item" value={search_item} onChange={this.handleChange} placeholder="Seach For Devices..."/><button className="btn btn-primary btn-warning" type="submit"><i className="fa fa-search fa-2x"></i></button></div>
                    </form>
                </div>
            </div>
        </div>
        <div>

            <div className="container justify-content-center">
            <div className="py-3">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation"><a className="nav-link tabClass active" role="tab" data-bs-toggle="tab" id="tab-btn-1" href="#">My Devices</a></li>
                        {/* <li className="nav-item" role="presentation"><a className="nav-link tabClass active" role="tab" data-bs-toggle="tab" href="#" id="tab-btn-2">Team's Devices</a></li> */}
                        {/* <li className="nav-item" role="presentation"><a className="nav-link tabClass" role="tab" data-bs-toggle="tab" href="#" id="tab-btn-2">My Damaged Devices</a></li> */}
                    </ul>
                    <div className="tab-content ">
                        <div className="tab-pane " role="tabpanel" id="tab-1">
                            <div className="row bg-light rounded-2 py-1">
                                <div className="col col-4">
                                    <h6>Devices</h6>
                                </div>
                                <div className="col align-items-end"><i className="fas fa-plus-circle fa-2x text-success btn" data-bs-toggle="modal" data-bs-target="#modal-3" style={{float:'right', cursor:'pointer'}} title="Add Device"></i></div>
                            </div>
                            {myDevices.length > 0 ? <div>
                                {Object.keys(myDevices).map((item, index) => (
                           <div className="row bg-light rounded-2 flex-row pt-3 border-bottom " style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#modal-1"> 
                           
                               
                                <div className="col ">
                                    <div className="row flex-row" style={{flexDirection:'row'}}>
                                        <div className="col col-2"><i className="fas fa-laptop border p-3 rounded-pill bg-light singleDeviceView" id={myDevices[item]['uniqid']}></i></div>
                                        <div className="col align-items-start py-2">
                                            <h6>{myDevices[item]['name']} </h6>
                                           
                                            <h6 style={capitalize}>{myDevices[item]['brand']}</h6>
                                        </div>
                                        <div className="col col-3 align-items-start py-2 justify-content-end">
                                        <h6 className="fw-bold text-muted">Serial Number: {myDevices[item]['deviceSerialNumber']}</h6>
                                        </div>
                                        <div className="col col-3 align-items-start py-2 justify-content-end">
                                        
                                            {/* <h6 className="fw-bold text-success">Active</h6> */}
                                            {/* href={"/view/device/assignment/:"+myDevices[item]['device_uniqid']} */}
                                            <button  className="btn btn-success deviceDetails" id={myDevices[item]['uniqid']+"||"+myDevices[item]['device_uniqid']} onClick={this.handleDeviceDetails}>Device Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                                ))} 
                            </div> :  <div className="row bg-light rounded-2 flex-row pt-3 border-bottom " style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#modal-1"> No Devices Found</div>}
                           

    
                               
                        </div>
                     
                     
                    </div>
                </div>
                <div className="modal deviceDetails" role="dialog" tabindex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header"><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div className="modal-body">
                                <div className="card row flex-row pb-4 border rounded-2 shadow-sm">
                                    <div className="card-header py-3">
                                        <header className="text-center text-capitalize">
                                            <h1>Device Information</h1>
                                        </header>
                                    </div>
                                    <div className="card-body" style={{display:'inline'}}>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5>Name: {modalDeviceDetails['name']}</h5>
                                            </div>
                                            <div className="col justify-content-end">
                                                <h6>Brand:{modalDeviceDetails['brand']}</h6>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5><strong>Device Specifications</strong></h5>
                                            </div>
                                        </div>
                                        <div className="row p-0">
                                            <div className="col">
                                                <h6>CPU:{modalDeviceDetails['processor']}</h6>
                                            </div>
                                            <div className="col justify-content-end">
                                                <h6>RAM : {modalDeviceDetails['RAM']}</h6>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5><strong>Memory Specifications</strong></h5>
                                            </div>
                                        </div>
                                        <div className="row p-0">
                                            <div className="col">
                                                <h6>Storage:{modalDeviceDetails['storage_type']}</h6>
                                            </div>
                                            <div className="col justify-content-end">
                                                <h6>Capacity: {modalDeviceDetails['capacity']}</h6>
                                            </div>
                                        </div>
                                        <div className="text-center py-1"><a className="btn btn-warning btn-lg text-white px-5 rounded-pill" href={"/view/device/assignment/"+modalDeviceDetails['device_uniqid']}>View Assignemnt Details</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer p-3 justify-content-center row"><a className="btn btn-outline-dark btn-lg text-dark px-5 rounded-pill close-btn">Close</a></div>
                        </div>
                    </div>
                </div>
                
                
               
            </div>
        </div>
    </main>
 
            </div> 
          )
    
}
}

export default Home
