import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Button from '@mui/material/Button';
import Headers from '../LayoutComponents/Headers';
// import Footers from '../LayoutComponents/Footers';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export class LeadDashboard extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
            userteam: localStorage.getItem('user_team'),     

        };


        // const {}
      
    }
    componentDidMount() {
        if(!localStorage.getItem('accessToken'))
        {
            window.location.href = '/'
        }
        }
        render() {
            const {userteam} = this.state;
            const user_team = localStorage.getItem('user_team')
            return (
                <div>
                    <Headers/>
                    <div className='container homecontainer'>
                        <div className='row'>
                            <div className='center full-width'>
                                <Paper variant="" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                    <h1 className='color-blue'> Welcome To Techno Brain Device Manager Lead Dashboard</h1>
                                </Paper>
                            </div>
                            <div className="row">
                        
                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-user"></i>    All Team Members</h5>
                                <p className="card-text"></p>
                                <a href="/all/team/members" className="btn btn-primary">View Member Details</a>
                            </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="fa fa-laptop"></i> All Team Devices  </h5>
                                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                <a href={"/all/team/devices/:"+user_team} className="btn btn-primary">View Device Details</a>
                            </div>
                            </div>
                        </div>
                        </div>
                            <div className="row">
                        
                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="fas fa-toolbox"></i>  Damaged Devices and their Issues </h5>
                                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                <a href="/team/damaged/devices" className="btn btn-primary"> Team Damaged Devices</a>
                            </div>
                            </div>
                        </div>                        
                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><i className="fas fa-toolbox"></i> Return to Office</h5>
                                {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                <a href="/return/device/office" className="btn btn-primary"> Return To Office Form</a>
                            </div>
                            </div>
                        </div>                        
                        </div>                           
                        </div >
                    </div >
                    {/* <Footers></Footers> */}
                </div >
            )
        }
    }

export default LeadDashboard
