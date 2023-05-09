import React, { Component } from 'react'
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

export class AddNewMember extends Component {
    constructor(props) {
        super(props);       
 
        const url = ''
        this.api_url = 'http:/127.0.0.1:8000/'
        this.state = { verified: '', user_uniqid: '' , team:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // //this.PrintWindow = this.PrintWindow.bind(this);
    }

    componentDidMount() {
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
        // 
        console.log(localStorage.getItem('accessToken'))
       axios.get("http://127.0.0.1:8000/inventory/admin/all/unconfirmed/users/", { headers: headers })
            .then(res => {
                const verified = res.data;
                console.log(verified)
                for (const key in verified) {


                    var option = "<option value=" + verified[key]['uniqid'] + ">" + verified[key]['full_name'] + "</option>"
                    $('.confirm_card').append(option)

                }



                //   this.setState({ verified });
            })
       axios.get("http://127.0.0.1:8000/inventory/admin/all/teams/", { headers: headers })
            .then(res => {
                const team = res.data;
                console.log(team)
                for(var i =0;i<team.length;i++)
                {
                    // console.log(team[i]['name'])
                    var option = "<option value=" + team[i]['uniqid'] + ">" +team[i]['name'] + "</option>"
                    console.log(option)
                    $('.team_card').append(option)
                }
                // for (const key in team) {


                //     var option = "<option value=" + team[key]['uniqid'] + ">" + team[key]['name'] + "</option>"
                //     console.log(option)
                //     // $('.team_card').append(option)

                // }



                //   this.setState({ verified });
            })
    }

    handleChange(event) {
        // this.setState({

        //     'verified': event.target.value,
        //     'user_uniqid': event.target.value
        // });
        this.setState({ [event.target.name]: event.target.value });
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
                        $('.alert-success').hide()
                        // $("form").reset()
                        // $('.alert-success').hide()
                        // this.reset();
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
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';

        const displayNone = { display: 'none' }

        const { user_uniqid, team } = this.state

        return (
            <div>
                    <Headers />
                    <Sidebar/>                    
               
                <main>

                    <div className="container p-2">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-row pt-4">
                                <div className="col-md-4 text-lg-center font-weight-bold p-1">
                                </div>

                                <div className="col-md-4 p-2">
                                    <h2 className="center text-capitalize" >Confirm Staff Members</h2>
                                    <div className="card pt-5 pr-5 pl-5 ">

                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Staff Members</h6>
                                            <select className="form-control" onChange={this.handleChange} value={user_uniqid} name="user_uniqid" required>
                                                <optgroup label="Staff Members" className="confirm_card">
                                                    <option defaultValue="Default" disabled></option>


                                                </optgroup>
                                            </select>

                                        </div>
                                        <div className="py-1">
                                            <h6 className="text-capitalize" style={fontFamilyNunito}>Team</h6>
                                            <select className="form-control" onChange={this.handleChange} value={team} name="team" required>
                                                <optgroup label="Team" className="team_card">
                                                    <option defaultValue="Default" disabled></option>

                                                        
                                                </optgroup>
                                            </select>

                                        </div>


                                        <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                            <strong>Success! </strong>Approval Successful.
                                        </div>
                                        {/* <p className="loginSuccess lead" >Login Successful</p> */}
                                        <button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold" type="submit" style={floatLeft}>Approve</button>


                                        {/* <button type="submit" style={floatLeft}> */}

                                        {/* </button> */}



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

export default AddNewMember
