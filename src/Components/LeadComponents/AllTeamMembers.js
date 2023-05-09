import React, { Component } from 'react'
import axios from 'axios'
// import Headers from 'LayoutComponents/Headers'; 
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
import { withRouter  } from "react-router-dom";
import logo from '../assets/Images/TEMP.PNG';

export class AllTeamMembers extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
            visitid: "",
            verified: "",
            UserList: "",
            name:"",
            brand:"",


            DataLoaded: false,
        };

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

        this.handleChange = this.handleChange.bind(this);
        
    }




    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";
 
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
        // $('.viewsdevices').on('click',function(){
            $('.viewUserDevices').click( function(e){
                e.preventDefault()
                // alert
                var uniqid  = this.value;
                console.log(uniqid)
                // window.location.href = /single/member/
            })
            // var uniqid = localStorage.getItem('userDeviceChekced')
            // console.log(uniqid)
            var data = {
                uniqid : localStorage.getItem('user_uniqid')
            }

            // console.log(localStorage.getItem('user_uniqid'))

        //    console.log(data)

            axios.post("http://127.0.0.1:8000/inventory/lead/all/team/members/", data, { headers: headers })
            .then(res => {
                console.log(res.data)
            //    this.setState({
            //     UserList: res.data,
            //     // name
            //    })
               for(var i=0;i<res.data.length;i++)
               {
                var div = ' <div className="card"> <div className="card-header">'+res.data[i]['username']+'</div><div className="card-body">'+res.data[i]['full_name']+'</div> <div className="card-footer"><a href="/single/member/:'+res.data[i]['uniqid']+'" id='+res.data[i]['uniqid']+' className="btn btn-primary viewUserDevices">View User Devices</a></div></div><br/>'
                $('.allDevices').append(div)
            }
              
            //   console.log(res.data)
                // setTimeout(function (props) {
                //     window.location.href = '/admin/single/user/devices'
                   
                // }, 1500);

            })
            .catch(error => {
                console.log(error)
            })

        // })

      
        $('.patientDetails').hide()
   
            console.log(localStorage.getItem('accessToken'))
 




     
       
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });


    }
	render() {
        const {
            deviceDetails
                    } = this.state;
                    const font16 = { fontSize: '16px' };
                    const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
                    const floatRight = { float: 'right' }
                    const floatLeft = { float: 'left' }
                    const displayHidden = { display: 'none' }
		return (
			<div>
				    <Headers />
                    <Sidebar/>                {/* */}
				<section className="service-area more-top-padding" id="services">
					<div className="container more-top-padding allDevices">
						<div className="row">
							<div className="col-xs-12">

							</div>
						</div><br /><br />
					
						
								{/* <div className="service-wrap text-center">
									<div className="service-icon">
										
									</div>
									<h3><a href="/input/patient/details"> New Patient Details </a> </h3>
									<p>
										Here, Enter all the required details for a new Patient
									</p>
								</div> */}
                                 <h2>All Team Members</h2>
  {/* <div className="card">
    <div className="card-header">{deviceDetails['name']}</div>
    {/* <div className="card-body">{deviceDetails}</div>  *
    <div className="card-footer">Footer</div>
  </div>
  <br/>
  <div className="card">
    <div className="card-header">Header</div>
    <div className="card-body">Content</div> 
    <div className="card-footer">Footer</div>
  </div>

<div className="card">
  <div className="card-body">Basic card</div>
</div>

<div className="card">
  <div className="card-body">Basic card</div>
</div> */}

							
							

						
					</div>
				</section>
				
			</div>
		)
	}
}

export default AllTeamMembers
