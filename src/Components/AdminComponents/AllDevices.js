import React, { Component } from 'react';
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
import { config } from '../_helpers/global'
import { MDBDataTable } from '../_mdbcomponents/components/DataTable/DataTable';


export class AllDevices extends Component {
    constructor(props) {
        super(props);       
        
        const url = ''
        this.state = {
            allDevices:[],
          
            tabledata:{},
            allDetails:[[]],
            rank:localStorage.getItem('rank'),
            DataLoaded: false,
        };

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.getDeviceDetails = this.getDeviceDetails.bind(this);
        
    }
    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index,  deviceSerialNumber){
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        console.log(deviceSerialNumber)
        var allDetails = this.state.allDetails
                axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid, { headers: headers })
                    .then(response => { 
                        console.log(response.data)                    
                       var deviceDetails = response.data
                                  
                       deviceDetails['serial_number'] = deviceSerialNumber
                       deviceDetails['device_uniqid'] = deviceUniqid
                        allDetails.push(deviceDetails)
                         
                            let tableinit = allDetails;
                            
                            let object = {};
                            console.log(tableinit)
                            for (let i = 1; i < tableinit.length; i++) {                                                   
                                delete tableinit[i]._id;
                                delete tableinit[i].timeOfRegistration;
                                tableinit[i].clickEvent = () => this.handleRowClick(tableinit[i]);
                            }
                            this.TableData = tableinit;
                            console.log(this.TableData);
                            const tabledata = {
                                columns: [                                   
                                    
                                    {
                                        label: "Device Name",
                                        field: "name",
                                        sort: "asc",
                                        width: 50
                                    },
                                    {
                                        label: "Brand",
                                        field: "brand",
                                        sort: "asc",
                                        width: 50
                                    },
                                   
                                    {
                                        label: "Type",
                                        field: "type",
                                        sort: "asc",
                                        width: 50
                                    },
                                    {
                                        label: "RAM",
                                        field: "RAM",
                                        sort: "asc",
                                        width: 50
                                    },
                                    {
                                        label: "Processor",
                                        field: "processor",
                                        sort: "asc",
                                        width: 50
                                    },
                                    {
                                        label: "Storage Type",
                                        field: "storage_type",
                                        sort: "asc",
                                        width: 50
                                    },
                                    {
                                        label: "Serial Number",
                                        field: "serial_number",
                                        sort: "asc",
                                        width: 50
                                    },                                  
                                                  
                               
                                ],
                                rows: this.TableData

                            }
                            this.setState({
                                tabledata: tabledata
                            })
                   

                    })
                    .catch(error => {
                        console.log(error)

                })
   
    }

    handleRowClick(staff) {
        $('.deviceDetails').show()
        $('.staffName').attr('id', staff.name)       
        $('.staffName').text(staff.name)       
        $('.type').text(staff.type)
        $('.Name').text(staff.name)
        $('.brand').text(staff.brand)
        $('.serial_number').text(staff.serial_number)
        $('.staffId').text(staff.device_uniqid)
         const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

         var data = {
                device_uniqid : staff.device_uniqid
            }

           axios.post("http://127.0.0.1:8000/inventory/lead/view/devices/allocation/", data, { headers: headers })
            .then(res => {
                console.log(res.data)
               
                if(res.data == "device has not been allocated")
                {
                    console.log('not allocated')
                    $('.AssignDevice').show()
                    
                }
                else{
                    $('.AssignedTo').show()
                    $('.AssignDevice2').show()
                    $('.AssignedName').text(res.data['username'])
                }

            });


            $('.AssignDevice2').click(function(){
                $('.AssignDevice').click()
            })
            $('.AssignDevice').click(function()
            {
                localStorage.removeItem('deviceUniqid')
                localStorage.setItem('deviceUniqid', staff.uniqid)
                // console.log()
                window.location.href = "/assign/device/:"+staff.device_uniqid
            })
  

    }



    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";
 
        
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
        // $('.viewsdevices').on('click',function(){
            $('.viewDevice').click( function(){
                alert('dasfsdf')
            })
            $('.ViewDeviceAssignment').on('click', function(){
                var uniqid = $('.staffId').text()
                window.location.href = "/view/device/assignment/:"+uniqid
            })
          
            var uniqid = localStorage.getItem('user_uniqid')
            console.log(uniqid)
          
            axios.get("http://127.0.0.1:8000/inventory/admin/all/devices/", { headers: headers })
            .then(res => {
                console.log(res.data)
                var device = res.data;
                this.setState({
                    allDevices: device,
                
                })
                
                for(var i =0; i<device.length;i++)
                {
                    var deviceSerialNumber =  device[i]['serial_number']
                    // console.log(device[i]['deviceTypeUniqid'])    
                    var deviceUniqid = device[i]['uniqid']
                 
                    var deviceTypeUniqid = device[i]['deviceTypeUniqid']; 
                    this.getDeviceDetails(deviceTypeUniqid, deviceUniqid, i,  deviceSerialNumber)
                    // allDetails.push(serial_number)           
                  
                    // user/single/device/type
                }

               
         
           

            })
            .catch(error => {
                console.log(error)
            })

        // })

        $('.deviceDetails').hide()   
  
 
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });


    }
	render() {
        const {
            deviceDetails,
            
            rank
                    } = this.state;
                    const font16 = { fontSize: '16px' };
                    const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
                    const floatRight = { float: 'right' }
                    const floatLeft = { float: 'left' }
                    const displayHidden = { display: 'none' }
                    let { DataLoaded } = this.state;
        // const tabledata = {


        //     columns: [
        //         {
        //             label: "Device Name",
        //             field: "name",
        //             sort: "asc",
        //             width: 50
        //         },
        //         {
        //             label: "Brand",
        //             field: "brand",
        //             sort: "asc",
        //             width: 50
        //         },
        //         {
        //             label: "Type",
        //             field: "type",
        //             sort: "asc",
        //             width: 50
        //         },
        //         {
        //             label: "Serial Number",
        //             field: "serial_number",
        //             sort: "asc",
        //             width: 50
        //         },
                              
               

               


        //     ],
        //     rows: this.TableData
        // };

        const{
            tabledata,
            allDevices
        } = this.state;

		return (
			<div>
				    <Headers />
                    <Sidebar/>            
				<section className="service-area more-top-padding" id="services">
					<div className="container more-top-padding allDevices">
						<div className="row">
							<div className="col-xs-12">

							</div>
						</div><br /><br />
											
                                 <h2>All Devices</h2>

                                 {allDevices ?
                                 <MDBDataTable striped bordered data={tabledata} /> : <span><h6>No Devices Allocated thus far</h6></span> }


						
					</div>
				</section>
                <div className="modal deviceDetails" tabIndex="-1" role="dialog">
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
                                <p>Type: <span className="type"></span></p>
                                <p>Brand: <span className="brand"></span></p>
                                <p>Serial Number: <span className="serial_number"></span></p>
                            
                                <div>
                                <button className='btn btn-success AssignDevice' style={displayHidden}>Assign Device</button>
                                {/* <h4 className='AssignedTo' style={displayHidden}>Assigned to: <b className="AssignedName"></b></h4> */}
                                    
                                {/* <span><button className='btn btn-danger AssignDevice2' style={displayHidden}>Reassign Device</button></span> */}
                                </div>
                               
                            {/* <button  className='btn btn-primary ViewDeviceAssignment'>View Device Assignment Details</button>  */}
                                
                                {/* <a href className='btn btn-danger'>View Other  <span className="Name"></span> Devices  </a> */}
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
		)
	}
}

export default AllDevices