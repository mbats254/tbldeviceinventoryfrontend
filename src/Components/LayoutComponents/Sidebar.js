import React, { Component } from 'react'
// import '../SecAssets/assets/bootstrap/css/style.css'
import logo from '../assets/Images/tb_logo.png';
import '../SecAssets/assets/bootstrap/css/bootstrap.min.css'
import '../SecAssets/assets/fonts/font-awesome.min.css'
import '../SecAssets/assets/bootstrap/css/styleSidebar.css'
import axios from 'axios'
import $ from 'jquery'


export class Sidebar extends Component {
    constructor(props) {

        super(props);       

        this.state = {         
            token:localStorage.getItem('accessToken'),
            userRank: ''  ,
            loading: false,  
            userTeam: localStorage.getItem('user_team')
         }


        ;
    }


    componentDidMount() {
        // $('#').show()
    //    console.log(localStorage.getItem('rank'))

    // 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
        if(!localStorage.getItem('accessToken'))
        {
            window.location.href = '/'
        }

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*'
        }
        console.log(localStorage.getItem('username'))
        var dict = ({
            username: localStorage.getItem('username'),
                                  })
        console.log((dict))           
        axios.post('http://127.0.0.1:8000/inventory/get/user/ ', dict , { headers: headers })
        .then(response => {
        // console.log(response.data)                 
        // console.log(response.data['rank'])
        this.setState({
            userRank: response.data['rank']
        })                      
        console.log(this.state.userRank)
       
        })
        .catch(error => {
            $('#loginSeriousError').fadeIn();
            // this.setState({ loading: false });
            console.log(error)
        })
        $('.logoImg').click(function (e) {
            e.preventDefault()
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':  '*'
            }
            console.log(localStorage.getItem('username'))
            var dict = ({
                username: localStorage.getItem('username'),
                                      })
            console.log((dict))           
            axios.post('http://127.0.0.1:8000/inventory/get/user/ ', dict , { headers: headers })
            .then(response => {
            // console.log(response.data)                 
            // console.log(response.data['rank'])
            this.setState({
                userRank: response.data['rank']
            })                      
            console.log(this.state.userRank)
           
            })
            .catch(error => {
                $('#loginSeriousError').fadeIn();
                // this.setState({ loading: false });
                console.log(error)
            })

            // setTimeout(function () {

            //     window.location.href = '/home'
            // }, 500);
            // href='/'

        });
        $('.checkHistory').click(function () {
            $('.HistoryModal').show()
        })

    

        if (localStorage.getItem('currentVisitName')) {
            $('.patientDetails').show()
        }
        $('.close').on('click', function () {
            $('.modal').hide();
        });

        if (localStorage.getItem('accessToken') == null) {
            $('.loginFirst').show()
            setTimeout(function () {
                window.location.href = '/'
            }, 1000);

        }

        $('.visitid').text(localStorage.getItem('currentVisitId'))

        var visitid = localStorage.getItem('currentVisitId')


        localStorage.setItem('visitId', visitid)
    } 
  render() {
    const logoDimensions = { height: '50px', innerWidth: "180px" }
    const {userRank, userTeam} = this.state
    // console.log(userRank)
    return (
      <div>
        
        <div className="sidenav">
        <a className="navbar-brand" >

<img src={logo} style={logoDimensions} className="logoImg btn" />
</a>
{userRank == 'admin' ? 
<div className="d-flex" id="wrapper">
<div className="list-group list-group-flush">
 <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/add/new/team">Add New Team</a>
 <a  className="list-group-item list-group-item-action list-group-item-light p-3" href="/confirm/staff/member">Confirm Member</a>
 <a  className="list-group-item list-group-item-action list-group-item-light p-3" href="/add/new/device">Add New Device</a>

 <a  className="list-group-item list-group-item-action list-group-item-light p-3" href="/admin/all/teams">All Teams</a>
 <a  className="list-group-item list-group-item-action list-group-item-light p-3" href="/admin/all/devices">All Devices</a>
 <a className="list-group-item list-group-item-action list-group-item-light p-3" href="/all/damaged/devices">All Damaged Devices</a>
 <div className="border-end bg-white" id="sidebar-wrapper">
 
                
            </div>
            </div>
 </div> 
  : userRank == 'tester' ? 

     <div className="d-flex" id="wrapper">
<div className="list-group list-group-flush">
<a className="list-group-item list-group-item-action list-group-item-light p-3" href="/my/devices">My Devices</a>


 </div>
 </div> 
 : 

 <div className="d-flex" id="wrapper">
<div className="list-group list-group-flush">
<a className="list-group-item list-group-item-action list-group-item-light p-3" href="/my/devices">My Devices</a>
<a className="list-group-item list-group-item-action list-group-item-light p-3" href="/all/team/members">All Team Members</a>
<a className="list-group-item list-group-item-action list-group-item-light p-3" href={"/all/team/devices/:"+userTeam}>All Team Devices</a>
<a className="list-group-item list-group-item-action list-group-item-light p-3" href="/team/damaged/devices">Team Damaged Devices</a>


 </div>
 </div>


 } 
     
    </div>
    </div>
    )
  }
}

export default Sidebar