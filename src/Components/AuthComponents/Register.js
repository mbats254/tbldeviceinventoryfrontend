import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import HeadersAuth from '../LayoutComponents/HeadersAuth';

class Register extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http://127.0.0.1:8000//'
        this.state = { password2:'',fullName: '',  full_name: '',  username: '', email: '', password: '', password2: '',  loading: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

 

    handleSubmit = event => {
        const url = 'http://127.0.0.1:8000/'
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        event.preventDefault();
      
        if (this.state.password !== this.state.password2) {

        }
        else {
           
            var emailsplit = (this.state.email).split("@")

            var dict = ({
                "full_name" : this.state.fullName,
                "email": this.state.email,
                "username": emailsplit[0],
                "password": this.state.password,
                "password2": this.state.password2
            })
         
            this.setState({ loading: true , username: emailsplit[0]});
            console.log(dict)
            axios.post('http://127.0.0.1:8000/auth/register/', dict, { headers: headers })
                .then(response => {
                    this.setState({ loading: false });
                    console.log(response)
                    
                    if (response.status) {
                          $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                        this.setState({
                            loading:false
                        })
                        // localStorage.setItem('accessToken', response.data['token']);
                        setTimeout(function (props) {
                            window.location.href = '/'
                            // this.props.history.push('/reception/dashboard')
                        }, 100);
                        // this.props.history.push('/reception/dashboard')
                    } else {
                        $('#loginError').fadeIn();
                    }

                })
                .catch(error => {
                    $('#loginError').fadeIn();
                    this.setState({ loading: false });
                    console.log(error)
                })
        }
    }

    componentDidMount() {
       

        // document.getElementById("LoadingModal").style.display = "none";
        //     const article = { title: 'React POST Request Example' };   
        // axios.post('https://reqres.in/api/articles', article)
        // .then(response => this.setState({ articleId: response.data.id }));
    }



    render() {
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        const url = 'http://127.0.0.1:8000/'
        const displayNone = { display: 'none' }
        const { email, fullName, password, password2 } = this.state;
        const loading = this.state.loading;
        return (
            <div>
                <HeadersAuth />

                <main>

                    <div className="container p-5">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-row center">
                                <h4 className="text-capitalize" >Basic Details</h4>
                            </div>
                            {/* <div className="form-row pt-2">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>First Name</h6><input className="form-control" onChange={this.handleChange} value={first_name} name="first_name" type="text" required />
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Last Name</h6><input className="form-control" onChange={this.handleChange} value={last_name} name="last_name" type="text" required />
                                    </div>
                                </div>

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Username</h6><input className="form-control" onChange={this.handleChange} value={username} name="username" type="text" required />
                                    </div>
                                </div>

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Profession</h6>
                                        <select className="form-control" onChange={this.handleChange} value={specialty} name="specialty" required>
                                            <optgroup label="Profession">
                                                <option selected></option>
                                                <option value="doctor">Doctor</option>
                                                <option value="nurse">Nurse</option>
                                                <option value="receptionist">Receptionist</option>
                                                <option value="labtech">Lab Tech</option>

                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="form-row center mt-5">
                                <h4 className="text-capitalize" >Contact Information</h4>
                            </div> */}
                            <div className="form-row pb-4 pt-2">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Full Name</h6><input name="fullName" onChange={this.handleChange} value={fullName} className="form-control" type="text" required />
                                    </div>
                                </div>

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize">Email Address</h6><input name="email" className="form-control" onChange={this.handleChange} value={email} type="email" required />
                                    </div>
                                </div>
                                <div className="col-md-6 p-2">

                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Password</h6><input name="password" className="form-control" onChange={this.handleChange} value={password} type="password" />
                                    </div>
                                </div>

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Confirm Password</h6><input name="password2" className="form-control" onChange={this.handleChange} value={password2} type="password" />
                                    </div>
                                </div>
                            </div>

                            <center>
                                <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                    <strong>Success! </strong>Welcome to Device Inventory.
                                </div>
                                <div className="row" >
                                    {/* <div style={displayHidden} className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold" type="button" style={floatRight}>Send To Triage</button></div> */}
                                    {/* <div className="col col-12"> */}
                                    <button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit">
                                        {loading ? <span>Loading...</span> : <span>Submit</span>}

                                    </button>
                                    {/* </div> */}
                                </div>
                            </center>
                        </form>
                    </div>

                </main>
            </div>
        )
    }
}

export default Register
