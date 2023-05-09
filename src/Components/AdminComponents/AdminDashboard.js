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
import Sidebar from '../LayoutComponents/Sidebar'

class AdminDashboard extends Component {
    componentDidMount() {
        console.log(localStorage.getItem('rank'))
    if(!localStorage.getItem('accessToken'))
    {
        window.location.href = '/'
    }
    }
    render() {
        return (
            <div>
                <Headers/>
                {/*  */}
                <div className='container homecontainer'>
                    <div className='row'>
                        <div className='center full-width'>
                            <Paper variant="" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <h1 className='color-blue'> Welcome To Techno Brain Admin Portal</h1>
                            </Paper>
                        </div>
                        <div className="row">
                        
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fa fa-user"></i>   Confirm New Member</h5>
                                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="/confirm/staff/member" className="btn btn-primary">View Confirmation Status</a>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fa fa-list"></i> All Devices</h5>
                                    <p className="card-text">Admin can see all the devices and the teams it is assigned to</p>
                                    <a href="/admin/all/devices" className="btn btn-primary">View All Devices</a>
                                </div>
                                </div>
                            </div>
                            </div>
                                                    <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"> <i className="fa fa-laptop"></i>  Add New Device</h5>
                                    <p className="card-text">Admin can add both a new device plus its type.</p>
                                    <a href="/add/new/device" className="btn btn-primary">New Device Form</a>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fa fa-plus"></i>All Teams</h5>
                                    <p className="card-text">See all the teams in the organisation.</p>
                                    <a href="/admin/all/teams" className="btn btn-primary">Admin View Teams</a>
                                </div>
                                </div>
                            </div>
                            </div>
                                                    <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fa fa-plus"></i>Add New Team</h5>
                                    <p className="card-text">Admin can add another select team where new device` assignments can be done.</p>
                                    <a href="/add/new/team" className="btn btn-primary">Aceess New Team Form</a>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title"><i className="fa fa-plus"></i>Damaged Devices</h5>
                                    <p className="card-text">Admin view all devices with issues.</p>
                                    <a href="/team/damaged/devices" className="btn btn-primary">View Damaged Devices</a>
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

export default AdminDashboard
