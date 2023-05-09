import React, { Component } from 'react';
import axios from 'axios'
import $ from 'jquery'
import Headers from '../LayoutComponents/Headers'
import Sidebar from '../LayoutComponents/Sidebar';
import { config } from '../_helpers/global'
import { MDBDataTable } from '../_mdbcomponents/components/DataTable/DataTable';

export class AllTeams extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
          allTeams:'',
          DataLoaded: false,
        };

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

        this.handleChange = this.handleChange.bind(this);
        
    }


    handleRowClick(team) {

        $('.patientDetails').show()
        $('.staffName').attr('id', team.name)
        var details = team.name
        $('.staffName').text(details)
        // var visitId = (patient.visitid).split('_')
        // var serialNumber = visitId[1]
        // var visitNumber = visitId[2]

      
        $('.Name').text(details)

   

        // {
        //     label: "Number of Visit",
        //     field: "EvolutionAndTreatment",
        //     sort: "asc",
        //     width: 50
        // },
        // {
        //     label: "Serial Number",
        //     field: "EvolutionAndTreatment",
        //     sort: "asc",
        //     width: 50
        // },

    }

    componentDidMount() {
        // document.getElementById("LoadingModal").style.display = "flex";

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }
        $('.viewmembers').on('click',function(e){
            e.preventDefault()
            var uniqid = $('.staffUniqid').text()
            console.log(uniqid);
            // var data = {
            //     uniqid : uniqid
            // }

            // console.log(data)

            // localStorage.removeItem('teamcCheckedUniqid')
            // localStorage.setItem('teamcCheckedUniqid', uniqid)

            // // axios.post("http://127.0.0.1:8000/inventory/admin/single/user/devices/", data, { headers: headers })
            // // .then(res => {

            
              
            //     setTimeout(function (props) {
            //         window.location.href = '/admin/single/team'
                   
            //     }, 1500);

            // })
            // .catch(error => {
            //     console.log(error)
            // })

        })

      
        $('.patientDetails').hide()
   
            console.log(localStorage.getItem('accessToken'))
           axios.get("http://127.0.0.1:8000/inventory/admin/all/teams/", { headers: headers })
                .then(res => {
                   console.log(res)
                   this.setState({
                    allTeams: res.data
                   })
                //    $('.staffUniqid').text(res.data['uniqid'])



            

                })
                .catch(error => {
                    console.log(error)
                })




     
       
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });


    }


 

    render() {
        // Complications = request.json["Complications"],
        // PregnancyDate = request.json["PregnancyDate"],
        // EvolutionAndTreatment = request.json["EvolutionAndTreatment"],

        const font16 = { fontSize: '16px' };
        const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
        const floatRight = { float: 'right' }
        const floatLeft = { float: 'left' }
        const displayHidden = { display: 'none' }

       
        const {allTeams} = this.state;
        return (
            <div>
                <Headers />
                    <Sidebar/>
                <main>

                    <div className="container p-2">
                        <form>

                        <section className="service-area more-top-padding" id="services">
					<div className="container more-top-padding allDevices">
                    <h2 className="text-capitalize" >All Teams</h2>
                    <div className="row">
                        <a className="btn btn-primary" href="/add/new/team">Add New Team</a><br/>
                    </div>
                    
						<div className="row">
							   
                               
                               
                                </div>
                                {Object.keys(allTeams).map((item, index) => (
                                <div className="card"> 
                                <div className="card-header">{allTeams[item]['name']}</div>
                                <div className="card-body">{allTeams[item]['']}</div>
                                <p className="staffUniqid" style={displayHidden} >{allTeams[item]['uniqid']}</p>
                                 <div className="card-footer">
                                    
                                    <a href={'/admin/single/team/:'+allTeams[item]['uniqid']} className='btn btn-success viewmembers' id={allTeams[item]['uniqid']}  >View Team Members</a>

                                   <a href={'/all/team/devices/:'+allTeams[item]['uniqid']} className='btn btn-success teamallocation ' >View Team Allocation</a>
                                    
                                   
                               
                                    </div></div>
                                //  <br/>
                                 ))} 
                                {/* <MDBDataTable striped bordered data={tabledata} /> */}

                            </div>

                                
                               
                                </section>

                         


                        </form>
                    </div>
                </main>
                

            </div>
       )
    }
}
export default AllTeams