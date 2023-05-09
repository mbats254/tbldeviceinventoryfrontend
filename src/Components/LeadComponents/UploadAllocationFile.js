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

export class UploadAllocationFile extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:8000/'
        const url = ''


        this.state = {
            excel_file: ''

          
        };


        // const {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.handleImageChange = this.handleImageChange.bind(this);
        this.PrintWindow = this.PrintWindow.bind(this);
    }

    handleImageChange = (e) => {
        // console.log(e.target.files[0])
        this.setState({
            excel_file: e.target.files[0]
        })
      }

    componentDidMount() {


        

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
        console.log(localStorage.getItem('accessToken'))
        console.log( localStorage.getItem('deviceUniqid'))
       
        console.log(this.state)
      
       
            axios.post('http://127.0.0.1:8000/inventory/read/excel/', this.state, { headers: headers })
            .then(response => {
                console.log(response.data)

                // if (response['status']) {
                //       $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                //     setTimeout(function () {
                //         //
                //         $('.checkHistory').click()
                //     }, 1500);

                // }
                // else 
                // {
                //     $('.alert-success').hide()
                //     // this.handleSubmit()   
                // }

            


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
            device_uniqid,
            user_uniqid,
            user_team,
            use,
            location,
            loggeduser_rank

        } = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>              


                <main className='content-container'>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Upload Allocation File</p>
                            </div>




                            <div className="form-row pt-4">
                        <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}> File</h6>
                                        <input type="file" required className="form-control"  name="excel_file" onChange={this.handleImageChange}  accept=".xls, .xlsx, .csv" />
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

export default UploadAllocationFile