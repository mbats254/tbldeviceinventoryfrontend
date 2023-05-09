import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import HeadersAuth from '../LayoutComponents/HeadersAuth';
// import { config } from '../_helpers/global';
// import { LoaderModal } from '../_helpers/LoaderModal';

export class ForgotPassword extends Component {
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
        $('.alert-success').hide()
        $('.loginSeriousError').hide()
        let self = this;
        event.preventDefault();
        // console.log(this.state)
        this.setState({ loading: true });
        console.log(this.url)
        localStorage.removeItem('username')
        localStorage.setItem('username',this.state.username)
               
                        axios.post('http://127.0.0.1:8000/inventory/get/user/ ', this.state , { headers: headers })
                        .then(response => {
                        // console.log(response.data)
                        if(response.status == 200)
                        {
                            axios.post('http://127.0.0.1:8000/inventory/forgot/password/ ', this.state , { headers: headers })
                        .then(res => {
                            console.log(res)
                            this.setState({
                                loading: false
                            })
                       
                            $('.alert-success').fadeIn()
                             $('#loginSeriousError').fadeOut();
                            //  setTimeout(function (props) {
                            //     $('.alert-success').fadeOut()
                            // },100)
                        });
                        }
                        else{
                            // this.setState({
                            //     loading: false
                            // })
                            console.log('dfg')
                        }
                      
                        // console.log( localStorage.getItem('rank'))
                       
                       
                        })
                        .catch(error => {
                            $('.alert-success').fadeOut()
                            $('#loginSeriousError').fadeIn();
                            this.setState({ loading: false });
                            console.log(error)
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
                                    <h2 className="center text-capitalize" >Forgot Password</h2>
                                    <div className="card  pt-5 pr-5 pl-5">
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Username</h6><input className="form-control" onChange={this.handleChange} value={username} name="username" type="username" required />
                                        </div>

                                      
                                     
                                        {/* <p className="loginSuccess lead" >Forgot Password Successful</p> */}
                                        <button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>
                                       
                                            {loading ? <span>Loading...</span> :
                                                 <span>Submit</span>}
                                        </button>

                                        <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                            <strong>Success! </strong>Please Check Your Email to reset your password
                                        </div>

                                        <div className="alert alert-danger" id='loginSeriousError' style={displayNone} role="alert">
                                            <strong>Sorry!! </strong>User Does not exist. Please enter correct credentials
                                        </div>


                                        
                                        
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

export default ForgotPassword
