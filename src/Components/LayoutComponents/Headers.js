import React, { Component } from 'react'
import '../SecAssets/assets/bootstrap/css/bootstrap.min.css'
import '../SecAssets/assets/fonts/font-awesome.min.css'
import '../SecAssets/assets/bootstrap/css/style.css'
import logo from '../assets/Images/tb_logo.png';
import axios from 'axios'
import $ from 'jquery'
import Sidebar from './Sidebar'


export class Headers extends Component {
    constructor(props) {

        super(props);       
        this.state = {         
            token:localStorage.getItem('accessToken')
        }

        this.url = "http://127.0.0.1:5000/";
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = event => {
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
        event.preventDefault();
        localStorage.clear();
        setTimeout(function () {

            window.location.href = '/login'
        }, 500);

    }

    componentDidMount() {
        $('.btn-close','.button-close').on("click", function(){
            $('.modal').fadeOut()
       })
         if(!localStorage.getItem('user_uniqid'))
        {
            var currentLocation = window.location;
            localStorage.setItem('currentLocation', currentLocation)
            window.location.href = '/'
        }
        $('.logoImg').click(function (e) {
            e.preventDefault()
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':  '*'
            }
            console.log(localStorage.getItem('username'))
            var dict = ({
                username: localStorage.getItem('username'),
                                      })
            console.log((dict))           
            axios.post('http://127.0.0.1:8000/inventory/get/user/ ', dict , { headers: headers })
            .then(response => {
          
            if(response.data['rank'] == "tester")
            {
            window.location.href = '/home'
            }
            else if(response.data['rank'] == "admin")
            {
                window.location.href = '/admin/dashboard'
            }
            else
            {
                window.location.href = '/lead/dashboard'
            }                        
            
           
            })
        

        });
      
        $('.close').on('click', function () {
            $('.modal').hide();
        });

        if (localStorage.getItem('accessToken') == null) {
            $('.loginFirst').show()
            setTimeout(function () {
                window.location.href = '/'
            }, 5000);

        }

      
    }

    handleTableChange(event) {
        console.log(event);
        // this.setState({ myParentTrigger: this.state.myParentTrigger + 'a' });
    }

    getTableValues(event) {
        console.log('entns');
        console.log(event);
        var self = this;
        this.setState({ AnteNatalHistoryTableResult: event });
        setTimeout(function () {
            console.log(self.state);
        }, 500);
    }


    render() {

        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayNone = { display: 'none' }
        const logoDimensions = { height: '50px', innerWidth: "180px" }

        return (
            <div>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                <header>

                    <nav className="navbar navbari-light navbar-expand-md background-blue navbar-fixed-top">
                        <div className="container-fluid">
                            <a className="navbar-brand" >

                                <img src={logo} style={logoDimensions} className="logoImg btn" />
                            </a>
                            <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                             
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-center" id="navcol-1">
                                <ul className="navbar-nav justify-content-center">
                                   
                                </ul>
                            </div>
                            <p className="visitid" style={displayNone}></p>
                            <nav className="navbar navbar-light navbar-expand-md">
                            <div className="container-fluid">
                                
                                <ul className="navbar-nav">
                                    <li className="nav-item p-2"><a className="nav-link active" href="/user/notifications"><i className="fa fa-envelope-open-o fa-2x"></i></a></li>
                                    {/* <li className="nav-item p-2"><a className="nav-link" href="/#"><i className="fa fa-file-o fa-2x"></i></a></li> */}
                                    <li className="nav-item p-2"><a className="nav-link" onClick={this.handleLogout} href=""><i className="fa fa-sign-out fa-2x"></i></a></li>
                                </ul>
                                <a className="navbar-brand" href="/user/profile"><img className="rounded-circle" src="https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png" width="70px" alt="round_img" /></a>
                            </div>
                        </nav>
                           
                        </div>

                    </nav>

                </header>

                <div className="modal loginFirst" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title PatientName"></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <strong>Success! </strong>Please Login First to Access this Page

                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id='logoutSuccess' tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title PatientName"></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <strong>Success! </strong>Logout
                                Successful.

                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Headers;
