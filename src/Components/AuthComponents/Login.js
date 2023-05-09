import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import HeadersAuth from '../LayoutComponents/HeadersAuth';
// import { config } from '../_helpers/global';
// import { LoaderModal } from '../_helpers/LoaderModal';

export class StaffLogin extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:8000/'
       
        // this.api_url = 'http://127.0.0.1:8000//'
        this.state = { pubkey: '', username: '', password: '', loading: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.setState({
            pubkey: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA4AYgJ7HmnMy7yqx4xPFOyshXFLzUzhqvE1L4e8qRnKII26BVjLrxEFE/yl4YOZq2VVRJ/9XaDhj1aXLLg+Z6jdSSiOiKGJwBjTtBqT5COuW8YJu6I9Av7Igtw8thryY47sZQAFx+PwO0t1fuW69D0NJlr00jav8FwtXJVKDrxZl4FklSMRcRE02WsXliFO9kG5MWP1SItepXPuooKJtygtKAx+HKd5qrS96Cc55Au5+UTScx88XaFKXjFgPEkcu6kpM0SZMi+hUg0/9b9Gfb dgYT1oNRiUl4FTrBqoBN9JB4CfqCR6X2mFXe3sfLir3aUYCOSvqyInD2sgDYKbl3utbeKk3IMc1NJrxINpEgcq0GCSm63e8yHZGQZNI5opskIwYEya9WrI7Xj8IbQdaoyzYhmsPmS8VXudjvpvEczU+30E/neVkz50yF2nx/4YO+RI1xTLMUpqmu3hTyBgZO5094rDqvVC3oldqhatF7QrQ0SJMMptuhcx4nIACJ8U8Asn07xBo/Br8Ggc+8bVgiicb5MUiMD0SOvt1/RtteC1inrDMkyfTOwI4gcg8AApp2OaNGU3IrMH9mvGuW0KrxKR/8t0/b5K/nTrcieB0KsScgx8+BWuUaNExsrVUNMAC1+kBazayOIxDKSyIe5y6UZ/hQbKb0qS+SHOIgIkwuKMCAwEAAQ==",
            loading: false
        });

        
        //remove loader
        // document.getElementById("LoadingModal").style.display = "none";
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        let self = this;
        event.preventDefault();
        // console.log(this.state)
        this.setState({ loading: true });
        console.log(this.url)
        localStorage.removeItem('username')
        localStorage.setItem('username',this.state.username)
        axios.post('http://127.0.0.1:8000/auth/login/ ', this.state, { headers: headers })
            .then(response => {
                console.log(response.data)
                this.setState({ loading: false });
                // console.log(response['data'])
                if (response.data['access']) {
                    localStorage.removeItem('accessToken');
                    localStorage.setItem('accessToken', response.data['access']);
                    // localStorage.setItem('Currentusername', this.state.username);
                    $('.contactAdmin').fadeOut();
                    $('#loginError').fadeOut();
                    $('#loginSeriousError').fadeOut();
                    
                    // setTimeout(function (props) {
                        var dict = ({
                            username: localStorage.getItem('username'),
                                                  })
                        // console.log(typeof(dict))           
                        axios.post('http://127.0.0.1:8000/inventory/get/user/ ', dict , { headers: headers })
                        .then(response => {
                        console.log(response.data)
                        if(response.data['status'] == 1)
                        {
                            localStorage.removeItem('user_uniqid')
                            localStorage.setItem('user_uniqid',response.data['uniqid'])
                            localStorage.removeItem('user_team')
                            localStorage.setItem('user_team',response.data['team'])
                            localStorage.removeItem('username')
                            localStorage.setItem('username',response.data['username'])
                            localStorage.removeItem('rank')
                            localStorage.setItem('rank',response.data['rank'])
                            console.log( localStorage.getItem('rank'))
                            setTimeout(function (props) {
                                $('#loginSuccess').fadeIn();
                            }, 50);
                            


                      
                        setTimeout(function (props) {
                        if(localStorage.getItem('currentLocation'))
                        {
                            window.location.href = localStorage.getItem('currentLocation') 
                        }
                        else if(response.data['rank'] == "tester")
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
                    }, 100);
                        }
                        
                        else
                        {
                            
                            $('.contactAdmin').show()
                        }
                        
                       
                        })
                        
                       
                      

                    // }, 50);
                    // 
        
                }
               
            })
            .catch(error => {
                $('#loginSeriousError').fadeIn();
                this.setState({ loading: false });
                console.log(error)
            })


    }


    render() {
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';

        const displayNone = { display: 'none' }

        const { username, password } = this.state
        const loading = this.state.loading;
        return (
            <div>
                <main>
                    <HeadersAuth></HeadersAuth>
                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row pt-4">
                                <div className="col-md-4 text-lg-center font-weight-bold p-1">
                                </div>

                                <div className="col-md-4 p-2">
                                    <h2 className="center text-capitalize" >Login</h2>
                                    <div className="card  pt-5 pr-5 pl-5">
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Username</h6><input className="form-control" onChange={this.handleChange} value={username} name="username" type="text" required />
                                        </div>

                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Password</h6><input className="form-control" onChange={this.handleChange} value={password} type="password" name="password" />
                                        </div>
                                        <a className="mt-2 mb-2" href={forgotPasswordUrl} >forgot password?</a>
                                        <br />
                                        <div className="alert alert-danger contactAdmin" style={displayNone} role="alert">
                                            <strong>Wait </strong>Correct Credentials. Contact Administrator to get account approval.
                                        </div>
                                        <div className="alert alert-danger" id='loginError' style={displayNone} role="alert">
                                            <strong>Wait </strong>Incorrect Login Details.
                                        </div>
                                        <div className="alert alert-danger" id='loginSeriousError' style={displayNone} role="alert">
                                            <strong>Sorry </strong>Something went wrong.  Please check your credentials then try again.
                                        </div>
                                        <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                            <strong>Success! </strong>Logging you in.
                                        </div>
                                        {/* <p className="loginSuccess lead" >Login Successful</p> */}
                                        <button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>
                                            {loading ? <span>Loading...</span> :
                                                 <span>Login</span>}
                                        </button>

                                        <a className="btn btn-primary btn-secondary mt-4 mb-5 rounded-pill px-5 font-weight-bold" href="/register/staff">
                                            {/* <button type="submit" style={floatLeft}> */}
                                            {/* {loading ? <span>Loading...</span> : */}
                                                 <span>Register</span>
                                                 {/* } */}
                                            
                                            {/* </button> */}
                                        </a>


                                        <div style={displayHidden} className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold" type="button" style={floatRight}>Send To Triage</button></div>
                                        {/* <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>Submit</button></div> */}
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

export default StaffLogin
