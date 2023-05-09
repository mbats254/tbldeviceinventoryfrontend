import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import Headers from '../LayoutComponents/Headers';

export class UserProfile extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http://127.0.0.1:8000/'


        this.state = { username: '', email: '', password: '', full_name: '',user_photo: null, loading: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        // //this.PrintWindow = this.PrintWindow.bind(this);
    }

    handleChange = event => {
        // let fileName = event.target.files[0];
        
        if(event.target.name == 'user_photo')
        {
            // console.log(event.target.files[0])
            this.setState({ user_photo: event.target.files[0]});
        }
        else
        {
            this.setState({ [event.target.name]: event.target.value });
        }
       
        // console.log(this.state)
    }
  
 

    handleSubmit = event => {

        console.log(this.state)
        const url = 'http://127.0.0.1:8000/'
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
            // 'username': localStorage.getItem('username')
        }
        event.preventDefault();
        // console.log(this.state)
        if (this.state.password !== this.state.password2) {

        }
        else {
            // console.log(this.state)
            var emailsplit = (this.state.email).split("@")

            var dict = ({
                full_name : this.state.fullName,
                email: this.state.email,
                username: localStorage.getItem('username'),
                password: this.state.password,
                password2: this.state.password,
                user_photo: this.state.user_photo
            })
         
            this.setState({ loading: true , username: emailsplit[0]});
            console.log(dict)
            axios.post('http://127.0.0.1:8000/inventory/update/profile/', dict, { headers: headers })
                .then(response => {
                    // console.log(response)
                    this.setState({ loading: false });
                    console.log(response)

                    if (response.status) {
                          $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
                        // localStorage.setItem('accessToken', response.data['token']);
                        setTimeout(function (props) {
                            window.location.href = '/'
                            // this.props.history.push('/reception/dashboard')
                        }, 10);
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
        this.setState({
            specialty_description: 'Default'
        })

        // console.log(localStorage.getItem('username'))

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }

        var dict = ({
            username: localStorage.getItem('username')
        })

        axios.post("http://127.0.0.1:8000/inventory/get/user/", dict , { headers: headers })
        .then(res => {
            // const verified = res.data;
            // console.log(res.data)

           this.setState({
                full_name : res.data['full_name'],
                email: res.data['email'],
                username:res.data['username'],
              
            })
         
            // $('.card-title').text(verified['name'])
            // $('.card-text').text(verified['brand'])
      
        })

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
        const { email, full_name, password, password2, user_photo } = this.state;
        const loading = this.state.loading;
        return (
            <div>
            <Headers/>

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
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Full Name</h6><input name="full_name" onChange={this.handleChange} value={full_name} className="form-control" type="text" required />
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

                            <div className="py-1" style={displayHidden}>
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>User Photo</h6><input name="user_photo" className="form-control"  onChange={this.handleChange}   type="file" accept=".png,.jpg" />
                                    </div>
                              

                            <center>
                                <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                    <strong>Success! </strong>Profile Updated Successfully.
                                </div>
                                <div className="row" >
                                    {/* <div style={displayHidden} onChange={(event) => this.handleImageChange(event)} className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-4 font-weight-bold" type="button" style={floatRight}>Send To Triage</button></div> */}
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


export default UserProfile