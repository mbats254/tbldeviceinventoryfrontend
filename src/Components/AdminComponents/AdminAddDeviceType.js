import React, { Component, useState } from 'react'
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
import QRCode from 'react-qr-code';

export class AdminAddDeviceType extends Component {
    constructor(props) {
        super(props);       

        const url = ''


        this.state = {
            
             name:"",
             brand:"",
             uniqid:"",
             type:"",
             capacity:"",
             storage_type:"",
             RAM:"",
             processor:"",
             poster_link:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.PrintWindow = this.PrintWindow.bind(this);
    }

    componentDidMount() {
        var self = this;
      

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
        console.log(this.state)
        axios.post('http://127.0.0.1:8000/inventory/admin/add/new/device/type/', this.state, { headers: headers })
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
                        // location.reload();
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
            brand,
            serial_number,
            // poster,
            uniqid,
            type,
            capacity,
            storage_type,
            RAM,
            processor,
            poster_link
        } = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Admin Add New Device Type</p>
                            </div>




                            <div className="form-row pt-4">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Name</h6><input className="form-control" onChange={this.handleChange} value={name} name="name" required />
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> Brand</h6>
                                        <select className="form-control" onChange={this.handleChange} value={brand} name="brand" >
                                            <optgroup label="Choose Brand for device">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="dell">Dell</option>
                                                <option className="form-control" value="hp">HP</option>
                                                <option className="form-control" value="lenovo">LENOVO</option>
                                                <option className="form-control" value="logitech">Logitech</option>
                                                <option className="form-control" value="microsoft">Microsoft</option>
                                             

                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                    </div>



                                    <div className="form-row pb-4 pt-2">
                                {/* <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Serial Number</h6><input name="serial_number" onChange={this.handleChange} value={serial_number} className="form-control" type="text" required />
                                    </div>
                                </div> */}

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        {/* <h6 className="text-capitalize">Poster</h6><input name="poster" type="file" onChange={this.handleImageChange}  className="form-control"  value={poster}   /> */}
                                    </div>
                                </div>
                                <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Type</h6>
                                        <select className="form-control" onChange={this.handleChange} value={type} name="type" >
                                            <optgroup label="Choose type of storage">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="Monitor">Monitor</option>
                                                <option className="form-control" value="Laptop">Laptop</option>
                                                <option className="form-control" value="Surface PRO">Surface PRO</option>
                                                <option className="form-control" value="Desktop/Tower">Desktop/Tower</option>
                                                <option className="form-control" value="Mouse">Mouse</option>
                                                <option className="form-control" value="Keyboard">Keyboard</option>
                                                <option className="form-control" value="Headset">Headset</option>
                                                <option className="form-control" value="Camera">Camera</option>
                                                <option className="form-control" value="Headset">Headset</option>

                                            </optgroup>
                                        </select>
                                    </div>





                                </div>
                                
            

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>RAM</h6>
                                        <select name="RAM" className="form-control" onChange={this.handleChange} value={RAM} >
                                            <optgroup label="Choose Quantity of RAM">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="noType">No Type</option>
                                                <option className="form-control" value="2GB">2GB</option>
                                                <option className="form-control" value="4GB">4GB</option>
                                                <option className="form-control" value="8GB">8GB</option>
                                                <option className="form-control" value="12GB">12GB</option>
                                                <option className="form-control" value="16GB">16GB</option>
                                                <option className="form-control" value="32GB">32GB</option>
                                                <option className="form-control" value="64GB">64GB</option>
                                               

                                            </optgroup>
                                        </select>
                                        
                                      
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Processor</h6>
                                        <select name="processor" className="form-control" onChange={this.handleChange} value={processor}  >
                                            <optgroup label="Choose Quantity of Processor">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="noType">No Type</option>
                                                <option className="form-control" value="corei7">Core i7</option>
                                                <option className="form-control" value="corei5">Core i5</option>
                                               

                                            </optgroup>
                                        </select>
                                        
                                        
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Capacity</h6>

                                        <select name="capacity" className="form-control" onChange={this.handleChange} value={capacity}  >
                                            <optgroup label="Choose Quantity of Processor">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="noType">No Type</option>
                                                <option className="form-control" value="320GB">320GB</option>
                                                <option className="form-control" value="500GB">500GB</option>
                                                <option className="form-control" value="1TB">1TB</option>
                                               

                                            </optgroup>
                                        </select>

                                        
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Storage Type</h6><select className="form-control" onChange={this.handleChange} value={storage_type} name="storage_type" >
                                            <optgroup label="Choose the type of device being issued">
                                                <option defaultValue="Default" disabled></option>
                                                <option className="form-control" value="noType">No Type</option>
                                                <option className="form-control" value="HDD">HDD</option>
                                                <option className="form-control" value="SSD">SSD</option>


                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row pb-4 pt-2">
                            <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Image Link</h6>
                                        <input className="form-control" placeholder='i.e https://i.dell.com/is/image/DellContent/content/dam/ss2/products/desktops-and-all-in-ones/optiplex/7000-micro/media-gallery/optiplex-7000micro-gallery-4.psd?qlt=90,0&op_usm=1.75,0.3,2,0&resMode=sharp&pscan=auto&fmt=png-alpha&hei=500' onChange={this.handleChange} value={poster_link} name="poster_link" required />
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
                    <br />
        <br />
        <br />
      
                    
                </main>


            </div>
        )
    }
}

export default AdminAddDeviceType