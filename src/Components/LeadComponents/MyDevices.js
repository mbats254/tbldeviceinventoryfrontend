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

export class MyDevices  extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
            visitid: "",
            verified: "",
            deviceDetails: "",
            myDevices:[],
            name:"",
            brand:"",
            DataLoaded: false,
        };
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),
        }
        this.handleChange = this.handleChange.bind(this);
        this.getDeviceDetails = this.getDeviceDetails.bind(this);
        
    }

    getDeviceDetails (deviceTypeUniqid, deviceUniqid, index, useParam){
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
        
      
        myDevices.push(res.data)
                        
        let deviceArray = myDevices;
        
        let object = {};
        console.log([index])
        deviceArray[index]['device_uniqid'] =  deviceUniqid  
            this.setState({
                myDevices: deviceArray
            })
            // console.log(this.state.myDevices)
        // console.log(deviceArray.length)
        
    
        
       
    })                        
    .catch(error => {
        console.log(error)
    })
   
    }


    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";
        // console.log(localStorage.getItem('username'))
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
        // $('.viewsdevices').on('click',function(){
            $('.viewDevice').click( function(){
                alert('dasfsdf')
            })
            var uniqid = localStorage.getItem('userDeviceChekced')
            console.log(uniqid)
            var data = {
                uniqid : uniqid
            }

            // console.log(data)

           

            axios.get("http://127.0.0.1:8000/inventory/user/my/devices/"+localStorage.getItem('user_uniqid'), data, { headers: headers })
            .then(res => {

               this.setState({
                deviceDetails: res.data['allDevices'],
                // name
               })
               console.log(res.data['allDevices'])
               for(var i=0;i<this.state.deviceDetails.length;i++)
               {
               
                this.getDeviceDetails(this.state.deviceDetails[i]['deviceTypeUniqid'], this.state.deviceDetails[i]['uniqid'], i, "myDevices")
            }
          
            })
            .catch(error => {
                console.log(error)
            })


 




     
       
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });


    }
	render() {
        const {
            deviceDetails, myDevices
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
					
                                 <h2>My Devices</h2>
                                 {myDevices.length > 0 ?
                                 <div>
                                 {Object.keys(myDevices).map((item, index) => (    
                                <div className="card">
                                    <div className="card-header">{myDevices[item]['name']}</div>
                                 <div className="card-body"><img src={deviceDetails[item]['poster_link']} alt="device poster"/><br/><br/>
                                 <span><a href={"/view/device/assignment/:"+deviceDetails[item]['uniqid']} className="btn btn-primary">View Details</a></span>
                                 </div>
                                 
                                     <div className="card-footer">{deviceDetails[item]['brand']}</div> 
                                </div>
                                        ))} 
                                        </div>  
                                        : <h5>No Devices at the time</h5>}

  
 				
					</div>
				</section>
				
			</div>
		)
	}
}

export default MyDevices 
