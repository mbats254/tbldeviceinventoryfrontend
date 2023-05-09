import React, { Component } from 'react';
import axios from 'axios'
import $ from 'jquery'
import Headers from '../LayoutComponents/Headers'
import Sidebar from '../LayoutComponents/Sidebar'
import { config } from '../_helpers/global'
import { MDBDataTable } from '../_mdbcomponents/components/DataTable/DataTable';

export class MakeTeamLead extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
  const url = ''
        this.api_url = 'http:/127.0.0.1:8000/'
        this.state = { username: '', email: '', password: '', full_name: '',  team: '', user_uniqid:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }


    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";
        console.log()
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
       var uniqid = localStorage.getItem('userMakeLead')
       console.log(uniqid)
       var data = ({
           uniqid : uniqid
       })

       axios.get('http://127.0.0.1:8000/inventory/lead/single/team/member/'+uniqid, { headers: headers })
            .then(res => {
                console.log(res.data['full_name'])

                axios.get('http://127.0.0.1:8000/inventory/admin/single/team/details/'+res.data['team'], { headers: headers })
                .then(response => {
                    this.setState({
                        team: response.data['name']
                    })
                });
                this.setState({
                    full_name : res.data['full_name'],
                    email: res.data['email'],
                    username:res.data['username'],
                  
                })
              
            })
            .catch(error => {
                console.log(error)
            })
       
       
    }

    handleSubmit = event => {

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken')
        }
        let self = this;
        
        event.preventDefault();
        console.log(this.state)
        var uniqid = localStorage.getItem('userMakeLead')
       console.log(uniqid)
       var data = ({
           user_uniqid : uniqid
       })
        axios.post('http://127.0.0.1:8000/inventory/admin/add/team/lead/', data, { headers: headers })
            .then(response => {
                console.log(response)
                  $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
            })
            .catch(error => {
                console.log(error)
            })


    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });


    }
    render() {
        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }
        let forgotPasswordUrl = '/forgot/password';

        const displayNone = { display: 'none' }

        const { email, full_name, team } = this.state;
        const loading = this.state.loading;
        return (
            <div>
            <Headers/>
            <Sidebar/>

                <main>

                    <div className="container p-5">
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-row center">
                                <h4 className="text-capitalize" >Make Team Lead</h4>
                            </div>
                        
                            <div className="form-row pb-4 pt-2">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Full Name</h6><input name="full_name" onChange={this.handleChange} value={full_name} className="form-control" type="text" readOnly />
                                    </div>
                                </div>

                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize">Email Address</h6><input name="email" className="form-control" onChange={this.handleChange} value={email} type="email" readOnly />
                                    </div>
                                </div>
                               

                             </div>   
                            <div className="form-row pb-4 pt-2">
                                <div className="col-md-6 p-2">
                                    <div className="py-1">
                                        <h6 className="text-capitalize" style={fontFamilyNunito}>Team</h6><input name="team" onChange={this.handleChange} value={team} className="form-control" type="text" readOnly />
                                    </div>
                                </div>

                               
                               

                             </div>   

                              

                            <center>
                                <div id='loginSuccess' className="alert alert-success" style={displayNone} role="alert">
                                    <strong>Success! </strong>Team Lead Add Successfully.
                                </div>
                                <div className="row" >
                                  
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


export default MakeTeamLead
