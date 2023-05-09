import React, { Component } from 'react'
import '../SecAssets/assets/bootstrap/css/bootstrap.min.css'
import '../SecAssets/assets/fonts/font-awesome.min.css'
// import '../SecAssets/assets/bootstrap/css/styles.css'
import logo from '../assets/Images/tb_logo.png';
// import logo from '../SecAssets/assets/images/HGH-Logo.png';
import axios from 'axios'
import $ from 'jquery'
// import logo from '../SecAssets/assets/Images/HargeisaLogo.png';

export class HeadersAuth extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http://127.0.0.1:8000//'
        // const url = 'https://back.hgh-obs.com'  


        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        // this.url = "http://127.0.0.1:8000/";

        this.handleLogout = this.handleLogout.bind(this);                                                                                                                           
    }


    componentDidMount() {
        localStorage.removeItem('user_uniqid')
                      
        localStorage.removeItem('user_team')
     
        localStorage.removeItem('username')
     
        localStorage.removeItem('rank')
       

  
        $('.close').on('click', function () {
            $('.modal').hide();
        });
        if (localStorage.getItem('accessToken') !== null) {
            // $('#loginFirst').show()
            // window.location.href = '/medical/home'
        }

        $('.visitid').text(localStorage.getItem('currentVisitId'))

        var visitid = $('.visitid').text()
    }


    handleLogout = event => {
        const url = 'http://127.0.0.1:8000/'
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),
            'Access-Control-Allow-Origin': '*'
        }
        event.preventDefault();
        axios.get('http://127.0.0.1:8000/staff/logout', this.state, { headers: headers })
            .then(response => {
                console.log(response.data)
                if (response.data['success'] == 'logged out') {
                    setTimeout(function (props) {
                        // history.push('/reception/dashboard')
                        window.location.href = '/';
                    }, 2000);
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        const logoDimensions = { height: '50px', innerWidth: "180px" }
        
        return (
            <div>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <header>
                    <nav className="navbar navbari-light navbar-expand-md background-blue navbar-fixed-top">
                        <div className="container-fluid">
                            <a className="navbar-brand" href='/'>
                            <img src={logo} style={logoDimensions} className="logoImg btn" />
                            </a>
                            <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                                {/* <span className="sr-only">Toggle navigation</span> */}
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navcol-1">
                                <ul className="navbar-nav justify-content-center">
                                    {/* <li className="nav-item"><a className="nav-link active font-weight-bold text-capitalize" >Staff Registration</a></li> */}
                                </ul>
                            </div>

                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeadersAuth;
