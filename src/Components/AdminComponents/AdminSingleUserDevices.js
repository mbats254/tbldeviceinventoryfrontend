import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery';
import ReactDOM from 'react-dom';
import Headers from '../LayoutComponents/Headers';
import Sidebar from '../LayoutComponents/Sidebar';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { MDBDataTable } from '../_mdbcomponents/components/DataTable/DataTable'; 

export class AdminSingleUserDevices extends Component {
  constructor(props) {
    super(props);       
this.api_url = 'http:/127.0.0.1:5000/'
    const url = ''
    this.state = {
        visitid: "",
        verified: "",
        deviceDetails: [],
        name:"",
        brand:"",
        tabledata:[],
        allDetails:[[]],
        DataLoaded: false,
    };

    const headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken'),

    }

    this.handleChange = this.handleChange.bind(this);
    this.getDeviceDetails = this.getDeviceDetails.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    
}

handleRowClick(staff) {
  // this.setState({
  //   deviceDetails: []
  // })
  $('.deviceDetails').show()
  $('.staffName').attr('id', staff.name)       
  $('.staffName').text(staff.name)       
  $('.type').text(staff.type)
  $('.Name').text(staff.name)
  $('.brand').text(staff.brand)
  $('.serial_number').text(staff.serial_number)
  $('.staffId').text(staff.device_uniqid)
  var deviceDetails = this.state.deviceDetails
  deviceDetails['deviceUniqid'] = staff.device_uniqid
  console.log(staff.device_uniqid)
  this.setState({
    deviceDetails: deviceDetails
  })
  console.log(this.state.deviceDetails)
   const headers = {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('accessToken'),

  }

   var data = {
          device_uniqid : staff.device_uniqid
      }

     axios.post("http://127.0.0.1:8000/inventory/lead/view/devices/allocation/", data, { headers: headers })
      .then(res => {
          console.log(res.data)
         
          if(res.data == "device has not been allocated")
          {
              console.log('not allocated')
              $('.AssignDevice').show()
              
          }
          else{
              $('.AssignedTo').show()
              $('.AssignDevice2').show()
              $('.AssignedName').text(res.data['username'])
          }

      });


    


}

getDeviceDetails (deviceTypeUniqid, deviceUniqid, index,  deviceSerialNumber){
  const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':  '*'
  }
  console.log(deviceSerialNumber)
  var allDetails = this.state.allDetails
          axios.get("http://127.0.0.1:8000/inventory/user/single/device/type/"+deviceTypeUniqid, { headers: headers })
              .then(response => { 
                  console.log(response.data)                    
                 var deviceDetails = response.data
                            
                 deviceDetails['serial_number'] = deviceSerialNumber
                 deviceDetails['device_uniqid'] = deviceUniqid
                  allDetails.push(deviceDetails)
                   
                      let tableinit = allDetails;
                      
                      let object = {};
                      console.log(tableinit)
                      for (let i = 1; i < tableinit.length; i++) {                                                   
                          delete tableinit[i]._id;
                          delete tableinit[i].timeOfRegistration;
                          tableinit[i].clickEvent = () => this.handleRowClick(tableinit[i]);
                      }
                      this.TableData = tableinit;
                      console.log(this.TableData);
                      const tabledata = {
                          columns: [                                   
                              
                              {
                                  label: "Device Name",
                                  field: "name",
                                  sort: "asc",
                                  width: 50
                              },
                              {
                                  label: "Brand",
                                  field: "brand",
                                  sort: "asc",
                                  width: 50
                              },
                             
                              {
                                  label: "Type",
                                  field: "type",
                                  sort: "asc",
                                  width: 50
                              },
                              {
                                  label: "RAM",
                                  field: "RAM",
                                  sort: "asc",
                                  width: 50
                              },
                              {
                                  label: "Processor",
                                  field: "processor",
                                  sort: "asc",
                                  width: 50
                              },
                              {
                                  label: "Storage Type",
                                  field: "storage_type",
                                  sort: "asc",
                                  width: 50
                              },
                              {
                                  label: "Serial Number",
                                  field: "serial_number",
                                  sort: "asc",
                                  width: 50
                              },                                  
                                            
                         
                          ],
                          rows: this.TableData

                      }
                      this.setState({
                          tabledata: tabledata
                      })
             

              })
              .catch(error => {
                  console.log(error)

          })

}


componentDidMount() {
    // document.getElementById("LoadingModal").style.display = "flex";
    $('.ViewDeviceAssignment').on("click",function(e){
      e.preventDefault();      
      var deviceUniqid = $('.staffId').text()
      window.location.href = "/view/device/assignment/:"+$('.staffId').text()
    })
   
   
    $('.AssignDevice2').click(function(){
      $('.AssignDevice').click()
  })
  $('.AssignDevice').click(function()
  {
      localStorage.removeItem('deviceUniqid')
      localStorage.setItem('deviceUniqid',  $('.staffId').text())
      // console.log()
      window.location.href = "/assign/device/:"+$('.staffId').text()
  })
    const headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken'),

    }
    // $('.viewsdevices').on('click',function(){
        $('.viewDevice').click( function(){
            alert('dasfsdf')
        })
        var uniqid = localStorage.getItem('userDeviceChekced')
        console.log(uniqid)
        var data = {
            uniqid : uniqid
        }

        // console.log(data)

       

        axios.post("http://127.0.0.1:8000/inventory/admin/single/user/devices/", data, { headers: headers })
        .then(res => {
          console.log(res.data)
          for(var i=0;i<res.data.length;i++)
          {

            this.getDeviceDetails(res.data[i]['deviceTypeUniqid'], res.data[i]['uniqid'], i,  res.data[i]['serial_number'])
          }
          //  this.setState({
          //   deviceDetails: res.data,
            
          //  })

          //  if(this.state.deviceDetails.length > 0)
          //  {
          //     for(var i=0;i<this.state.deviceDetails.length;i++)
          //     {
          //     var div = ' <div className="card"> <div className="card-header">'+this.state.deviceDetails[i]['name']+'</div><div className="card-body">'+this.state.deviceDetails[i]['brand']+'</div> <div className="card-footer"><a href="/single/device/:'+this.state.deviceDetails[i]['uniqid']+'" className="btn btn-primary viewDevice">View Device</a></div></div><br/>'
          //     $('.allDevices').append(div)
          //     }
          //  }

          //  else{
          //   $('.noDevices').show()
          //  }
          
          
          // console.log(this.state.deviceDetails)
            // setTimeout(function (props) {
            //     window.location.href = '/admin/single/user/devices'
               
            // }, 1500);

        })
        .catch(error => {
          $('.noDevices').show()
            console.log(error)
        })

    // })

  
   
        console.log(localStorage.getItem('accessToken'))

}

handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });


}
render() {
    const {
        deviceDetails,
        tabledata
                } = this.state;
console.log(deviceDetails)
                const displayHidden = { display: 'none' }

return (
  <div>
        <Headers />
                    <Sidebar/>               
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
                             <h2>User`s Devices</h2>
                             <MDBDataTable striped bordered data={tabledata} />
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

          
          
<p className="lead noDevices" style={displayHidden}>No Devices Found</p>
<div className="modal deviceDetails" tabIndex="-1" role="dialog">
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
                                <p>Type: <span className="type"></span></p>
                                <p>Brand: <span className="brand"></span></p>
                                <p>Serial Number: <span className="serial_number"></span></p>
                            
                                <div>
                                <button className='btn btn-success AssignDevice' style={displayHidden}>Assign Device</button>
                                {/* <h4 className='AssignedTo' style={displayHidden}>Assigned to: <b className="AssignedName"></b></h4> */}
                                    
                                {/* <span><button className='btn btn-danger AssignDevice2' style={displayHidden}>Reassign Device</button></span> */}
                                </div>
                               
                            <button  className='btn btn-primary ViewDeviceAssignment' href={"/view/device/assignment/:"+deviceDetails['deviceUniqid']}>View Device Assignment Details</button> 
                                
                                {/* <a href className='btn btn-danger'>View Other  <span className="Name"></span> Devices  </a> */}
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
    </section>
    
  </div>
)
}
}

export default AdminSingleUserDevices