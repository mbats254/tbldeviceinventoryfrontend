import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Headers from '../LayoutComponents/Headers';
import Sidebar from '../LayoutComponents/Sidebar';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";

export class SingleTeamMember extends Component {
    constructor(props) {
        super(props);       
 
    const  uniqid  = this.props.match.params.uniqid;
        const url = ''
        this.state = {
            deviceDetails: "",
            name:"",
            brand:"",
            uniqid: "",      
            DataLoaded: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    
    
    
    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";
        const { uniqid } = (this.props.match.params);
        // console.log(uniqid.split(':')[1])

        this.setState({
          uniqid: uniqid.split(':')[1]
        })
      //  console.log(this.state.uniqid)
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),
    
        }
        // $('.viewsdevices').on('click',function(){
            $('.viewDevice').click( function(){
                alert('dasfsdf')
            })
            // var uniqid = localStorage.getItem('userDeviceChekced')
            // console.log(uniqid)
            var data = {
                uniqid : uniqid.split(':')[1]
            }
    
            // console.log(data)
    
           
    
            axios.post("http://127.0.0.1:8000/inventory/admin/single/user/devices/", data, { headers: headers })
            .then(res => {
              console.log(res.data)
               this.setState({
                deviceDetails: res.data,
                
               })
               for(var i=0;i<this.state.deviceDetails.length;i++)
               {
                var div = ' <div className="card"> <div className="card-header">'+this.state.deviceDetails[i]['name']+'</div><div className="card-body">'+this.state.deviceDetails[i]['brand']+'</div> <div className="card-footer"><a href="/single/device/:'+this.state.deviceDetails[i]['uniqid']+'" className="btn btn-primary viewDevice">View Device</a></div></div><br/>'
                $('.allDevices').append(div)
            }
              
              // console.log(this.state.deviceDetails)
                // setTimeout(function (props) {
                //     window.location.href = '/admin/single/user/devices'
                   
                // }, 1500);
    
            })
            .catch(error => {
                console.log(error)
            })
    
        // })
    
      
        $('.patientDetails').hide()
    
            console.log(localStorage.getItem('accessToken'))
    
    
    
    
    
     
       
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    
    
    }
    render() {
        const {
            deviceDetails
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
          
            
                {/* <div className="service-wrap text-center">
                  <div className="service-icon">
                    
                  </div>
                  <h3><a href="/input/patient/details"> New Patient Details </a> </h3>
                  <p>
                    Here, Enter all the required details for a new Patient
                  </p>
                </div> */}
                                 <h2>User`s Devices</h2>
    {/* <div className="card">
    <div className="card-header">{deviceDetails['name']}</div>
    {/* <div className="card-body">{deviceDetails}</div>  *
    <div className="card-footer">Footer</div>
    </div>
    <br/>
    <div className="card">
    <div className="card-header">Header</div>
    <div className="card-body">Content</div> 
    <div className="card-footer">Footer</div>
    </div>
    
    <div className="card">
    <div className="card-body">Basic card</div>
    </div>
    
    <div className="card">
    <div className="card-body">Basic card</div>
    </div> */}
    
              
              
    
            
          </div>
        </section>
        
      </div>
    )
    }
}

export default SingleTeamMember
