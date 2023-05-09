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

export class SingleDeviceUser extends Component {
    constructor(props) {
        super(props);       
 
        const url = ''
        const { uniqid } = this.props.match.params.uniqid;
        this.api_url = 'http:/127.0.0.1:8000/'
        this.state = { verified: '', user_uniqid: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // //this.PrintWindow = this.PrintWindow.bind(this);
    }

    componentDidMount() {
        const { uniqid } = (this.props.match.params);
        // console.log(uniqid)
        localStorage.removeItem('deviceUnniqid')
        localStorage.setItem('deviceUniqid',uniqid.split(":")[1])
        
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
        // 
        // console.log(localStorage.getItem('accessToken'))
       axios.get("http://127.0.0.1:8000/inventory/user/single/device/"+uniqid.split(":")[1], { headers: headers })
            .then(res => {
                const verified = res.data;
                // console.log(verified)

                $('.card-title').text(verified['name'])
                $('.card-text').text(verified['brand'])
          
            })

            $('.reportDevice').click(function(e){
                e.preventDefault()
              
                
                window.location.href = "/report/damage"

            })

            
    }

    handleChange(event) {
        this.setState({

            'verified': event.target.value,
            'user_uniqid': event.target.value
        });
    }


    handleSubmit = event => {

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
        let self = this;
        
        event.preventDefault();
        console.log(this.state)
        axios.post('http://127.0.0.1:8000/inventory/admin/confirm/user/', this.state, { headers: headers })
            .then(response => {
                console.log(response.data['status'])
                if (response.data['status']) {
                      $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                    setTimeout(function (props) {
                        // alert('success')
                        // window.location.href = '/confirm/staff/member'
                        // this.props.history.push('/reception/dashboard')
                    }, 1000);
                    // this.props.history.push('/reception/dashboard')
                } else {
                    $('#loginError').fadeIn();
                }
            })
            .catch(error => {
                console.log(error)
            })


    }


    render() {
        const width400 = { width: '400px' };
        const width100 = { width: '100' };
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';

        const displayNone = { display: 'none' }

        const { verified } = this.state

        return (
            <div>
                    <Headers />
                    <Sidebar/>               
                <main>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row pt-4">
                                <div className="col-md-4 text-lg-center font-weight-bold p-1">
                                </div>

                                <div className="col-md-4 p-2">
                                <h2 className="card-title"></h2>
  <p className="brand"></p>
  <div className="card" style={width400}>
    <img className="card-img-top" src={logo} alt="Card image" style={width100}/>
    <div className="card-body">
      <h4 className="card-title"></h4>
      <p className="card-text">     </p>
      <a href="#" className="btn btn-primary stretched-link reportDevice">Report Damage</a>
      
    </div>
  </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </main>
            </div>
        )
    }
}
export default SingleDeviceUser