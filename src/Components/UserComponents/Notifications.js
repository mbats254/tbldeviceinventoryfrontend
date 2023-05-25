import React, { useState, Component } from 'react'
import QRCode from 'react-qr-code';
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
// import 'react-tooltip/dist/react-tooltip.css'
// import { Tooltip } from 'react-tooltip' 
import $ from 'jquery';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";
import logo from '../assets/Images/TEMP.PNG';

export class Notifications extends Component {
  constructor(props) {
    super(props);       

    const url = ''
   
    this.api_url = 'http:/127.0.0.1:8000/'
   this.state= ({
        typeuniqid:'',
        notifications:[]
   })
    
  

}

componentDidMount() {
  const headers = {
    'Content-Type': 'application/json',
    'token': localStorage.getItem('accessToken'),

}
    
    var data = ({
      user_uniqid: localStorage.getItem('user_uniqid')
    })
    axios.post("http://127.0.0.1:8000/inventory/user/notifications/", data, { headers: headers })
    .then(res => {
              this.setState({
                "notifications": res.data
              })

                  })
                  .catch(error => {
                      console.log(error)
                  })  

}


render() {
    const width400 = { width: '400px' };
    const width18rem = { width:  '18rem' };
    const width100 = { width: '100' };
    const font16 = { fontSize: '16px' };
    const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' }
    const floatRight = { float: 'right' }
    const floatLeft = { float: 'left' }
    const displayHidden = { display: 'none' }
    let forgotPasswordUrl = '/forgot/password';

    const displayNone = { display: 'none' }

    const { notifications } = this.state

    return (
        <div>
                <Headers />
                <Sidebar/>               
            <main>
            <div className="container p-2">
              <h2>Notifications</h2>
              {notifications.length > 0 ? 
              <div className="row d-flex justify-content-center">
              {Object.keys(notifications).map((item, index) => (
                  <div className="col-md-10">
                  <div className="card">
                  <div className="card-body">{notifications[item]['description']}</div>
                </div>
                     
                  </div>
                  ))} 
              </div>
              :<h4>No Notifications Found</h4>}

</div>


              
                {/* <QRCode
      title="GeeksForGeeks"
      value="https://www.google.com/search?client=firefox-b-d&q=if+today+was+your+last+day+song"
      bgColor="#FFFFFF"
      fgColor="#000000"
      size="512"
    /> */}
            </main>
        </div>
    )
}
}

export default Notifications