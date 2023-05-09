import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import HeadersAuth from '../LayoutComponents/HeadersAuth';



export class ResetPassword extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:8000/'
  const { uniqid } = this.props.match.params.uniqid;
       
        // this.api_url = 'http://127.0.0.1:8000//'
        this.state = {  username: '', password: '', confirmPassword: '', resetUniqid: ''  };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
       
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }

        const { uniqid } = (this.props.match.params);
        // console.log(uniqid)
        localStorage.removeItem('resetPassword', uniqid)
        localStorage.setItem('resetPassword', uniqid)
        var resetUniqid = uniqid.split(':')[1]



var dict = ({
            resetUniqid: resetUniqid,
                                  })
                                //   console.log(dict)
        axios.post('http://127.0.0.1:8000/inventory/reset/password/view ', dict , { headers: headers })
                        .then(response => {
                        console.log(response.data)

                        this.setState({
                            username: response.data['username'],
                            resetUniqid: response.data['resetUniqid']
                        })

                        if(response.data['status'] == 0)
                        {
                            $('.changePassword').show()
                        }
                        else
                        {
                            $('.changePassword').hide()
                            $('.passwordAlreadty').show()
                        }
                                          
                       
                        })
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
        
               
                        axios.post('http://127.0.0.1:8000/inventory/reset/password/post/ ', this.state , { headers: headers })
                        .then(response => {
                        console.log(response.data)
                          $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                        this.setState({ loading: false });
                        setTimeout(function (props) {
                            window.location.href = '/'
                        }, 100)
                       
                       
                        })
                        
                       
                      

                  
                    // 
        
                }
           


    


    render() {
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';

        const displayNone = { display: 'none' }

        const { username, password, confirmPassword } = this.state
        const loading = this.state.loading;
        return (
            <div>
                <main>
                    <HeadersAuth></HeadersAuth>
                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row pt-4 changePassword">
                                <div className="col-md-4 text-lg-center font-weight-bold p-1">
                                </div>

                                <div className="col-md-4 p-2">
                                    <h2 className="center text-capitalize" >Reset Password</h2>
                                    <div className="card  pt-5 pr-5 pl-5">
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Username</h6><input className="form-control" onChange={this.handleChange} value={username} name="username" type="text" readOnly />
                                        </div>
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Password</h6><input className="form-control" onChange={this.handleChange} value={password} name="password" type="password" required />
                                        </div>
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Confirm Password</h6><input className="form-control" onChange={this.handleChange} value={confirmPassword} name="confirmPassword" type="password" required />
                                        </div>

                                      
                                     
                                        {/* <p className="loginSuccess lead" >Forgot Password Successful</p> */}
                                        <button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>
                                            {loading ? <span>Loading...</span> :
                                                 <span>Submit</span>}
                                        </button>

                                        <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                            <strong>Success! </strong>Password Reset Successful
                                        </div>


                                        
                                        
                                        {/* <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>Submit</button></div> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <span className="passwordAlreadty" style={displayHidden}>Password Already Reset</span>
                    </div>

                </main>
            </div>
        )
    }
}

export default ResetPassword