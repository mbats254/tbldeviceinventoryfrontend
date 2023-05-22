import React, { Component } from 'react';
import axios from 'axios'
import $ from 'jquery'
import Headers from '../LayoutComponents/Headers'
import Sidebar from '../LayoutComponents/Sidebar'
import { config } from '../_helpers/global'
import { MDBDataTable } from '../_mdbcomponents/components/DataTable/DataTable';

export class AllTeamMembers extends Component {
    constructor(props) {
        super(props);       
  this.api_url = 'http:/127.0.0.1:5000/'
        const url = ''
        this.state = {
            visitid: "",
            verified: "",
            DataLoaded: false,
        };

        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('accessToken'),

        }

        this.handleChange = this.handleChange.bind(this);
        
    }


    handleRowClick(staff) {

        $('.patientDetails').show()
        $('.staffName').attr('id', staff.full_name)
        var details = staff.first_name + ' '+staff.last_name + '(' + staff.username + ')'
        $('.staffName').text(details)
        // var visitId = (patient.visitid).split('_')
        // var serialNumber = visitId[1]
        // var visitNumber = visitId[2]

        $('.Specialty').text(staff.specialty)
        $('.Name').text(details)
        $('.Email').text(staff.email)
        $('.staffId').text(staff.username)
        $('.staffUniqid').text(staff.uniqid)

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
        $('.viewsdevices').on('click',function(){
            var uniqid = $('.staffUniqid').text()

            var data = {
                uniqid : uniqid
            }

            console.log(data)

            localStorage.removeItem('userDeviceChekced')
            localStorage.setItem('userDeviceChekced', uniqid)

            // axios.post("http://127.0.0.1:8000/inventory/admin/single/user/devices/", data, { headers: headers })
            // .then(res => {

            
              
                setTimeout(function (props) {
                    window.location.href = '/admin/single/user/devices'
                   
                }, 1500);

            // })
            // .catch(error => {
            //     console.log(error)
            // })

        })

        $('.removeUser').click(function(){
            var username = $('.staffId').text()
            
        var data = {
            nullified : username
        }
            axios.post(this.api_url+"chief/nullify", data, { headers: headers })
            .then(res => {

                  $('.alert-success').show()
                    setTimeout(function () {
                        //
                        $('.alert-success').hide()
                    }, 6000);
              
                setTimeout(function (props) {
                    $('.modal').hide()
                    // this.props.history.push('/reception/dashboard')
                }, 1500);

            })
            .catch(error => {
                console.log(error)
            })
        });
      console.log(localStorage.getItem('accessToken'))
           axios.get("http://127.0.0.1:8000/inventory/lead/all/team/users/"+localStorage.getItem('user_uniqid'), { headers: headers })
                .then(res => {
                   let tableinit = res.data;
                   console.log(tableinit)
                    // console.log(typeof(table))
                    let object = {};
                    for (let i = 0; i < tableinit.length; i++) {
                        delete tableinit[i]._id;
                        delete tableinit[i].timeOfRegistration;
                        tableinit[i].clickEvent = () => this.handleRowClick(tableinit[i]);
                    }
               


                    // alert(table)
                    this.TableData = tableinit;
                    // console.log(this.TableData);
                    this.setState({
                        DataLoaded: true
                    });

                    // var searchRow = '<tr><td>'+number+'</td> <td>'+res.data[i]['Name']+'</td><td>'+res.data[i]['Age']+'</td><td>'+res.data[i]['Profession']+'</td><td>'+res.data[i]['MaritalStatus']+'</td><td>'+res.data[i]['Address']+'</td><td>'+res.data[i]['Tel ']+'</td><td>'+res.data[i]['Nationality']+'</td><td>'+date+'</td><td>'+time+'</td><td>'+visitNumber+'</td><td>'+serialNumber+'</td><td></td><td></td><td><a className="btn btn-primary startTreatment" id="'+res.data[i]['visitid']+'">Start Treatment</a></td></tr>'
                    // $('.searchClass').append(searchRow)
                

            

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

        const { Complications,
            PregnancyDate,
            EvolutionAndTreatment
        } = this.state

        let { DataLoaded } = this.state;
        const tabledata = {


            columns: [
                {
                    label: "Full Name",
                    field: "full_name",
                    sort: "asc",
                    width: 50
                },
                {
                    label: "UserName",
                    field: "username",
                    sort: "asc",
                    width: 50
                },
                {
                    label: "Email",
                    field: "email",
                    sort: "asc",
                    width: 50
                },
                              
               

               


            ],
            rows: this.TableData
        };
        return (
            <div>
                <Headers />
                    <Sidebar/>
                <main>

                    <div className="container p-2">
                        <form>



                            <div className="form-row pt-4">
                                <div className="col-md-4 text-lg-center font-weight-bold p-1">
                                    <p className="text-capitalize" style={font16}></p>
                                </div>
                                <MDBDataTable striped bordered data={tabledata} />

                            </div>


                        </form>
                    </div>
                </main>
                <div className="modal patientDetails" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title staffName"> </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Name: <span className="Name"></span></p>
                                <p>Specialty: <span className="Specialty"></span></p>
                                <p>Email: <span className="Email"></span></p>
                                <button className='btn btn-success viewsdevices ' >View User Devices</button>

                                {/* <span><button className='btn btn-danger removeUser ' >Remove User</button></span> */}
                                
                                <p className="staffId" style={displayHidden}></p>
                                <p className="staffUniqid" style={displayHidden}></p>

                                <div id='loginSuccess' className="alert alert-success" style={displayHidden} role="alert">
                                    <strong>Success! </strong>User Nullified Successfully
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default AllTeamMembers
