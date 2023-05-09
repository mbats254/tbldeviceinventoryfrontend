import React, { Component } from 'react'
import axios from 'axios'
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

export class AddNewDevice extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''


        this.state = {
            
             name:"",
             allDevices:"",
             serial_number:"",
             deviceTypeUniqid:"",
             type:'type',
             brand:'brand',
            //  poster:"",
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.PrintWindow = this.PrintWindow.bind(this);
    }

    componentDidMount() {
        var self = this;
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
        axios.get("http://127.0.0.1:8000/inventory/admin/all/devices/types/",  { headers: headers })
        .then(res => {
            console.log(res.data)
           this.setState({
            allDevices: res.data,
            // name
           })
           
          
        //   console.log(this.state.deviceDetails)
            // setTimeout(function (props) {
            //     window.location.href = '/admin/single/user/devices'
               
            // }, 1500);

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
            'Access-Control-Allow-Origin':  '*'
        }
        event.preventDefault();
        console.log(localStorage.getItem('accessToken'))
        const stateName = this.state.name
        console.log(stateName)
        this.setState({
            deviceTypeUniqid: stateName
        })
        console.log(this.state)
        axios.post('http://127.0.0.1:8000/inventory/admin/add/new/device/', this.state, { headers: headers })
            .then(response => {
                console.log(response)

                if (response.status == 200) {
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
            name,
            allDevices,
            serial_number,
           
       
        } = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Admin Add Device to Directory</p>
                            </div>

                            <h3><a className="btn btn-primary" href="/admin/add/device/type">Add New Device Type </a> </h3>


                            <div className="form-row pt-4">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Name</h6>
                                        <select className="form-control"  onChange={this.handleChange} value={name} name="name" >
                                        <optgroup label="Choose type of device">
                                        <option defaultValue="Default" disabled></option>
                                        {Object.keys(allDevices).map((item, index) => (
                                            // {myDevices[item]['name']}                                          
                                            
                                                <option className="form-control" value={allDevices[item]['uniqid']}   >{allDevices[item]['name']}   </option>
                                             
                                             ))}  
                                         </optgroup>
                                        </select>
                                        </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Serial Number</h6><input name="serial_number" onChange={this.handleChange} value={serial_number} className="form-control" type="text" required />
                                    </div>
                                </div>
                                    </div>



                                    <div className="form-row pb-4 pt-2">
                              

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

export default AddNewDevice